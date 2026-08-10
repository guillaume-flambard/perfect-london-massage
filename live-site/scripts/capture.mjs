#!/usr/bin/env node
/* Scrape Perfect London Massage (perfectlondonmassage.co.uk) into live-site/data/*.json
   + download treatment page images. Run: node live-site/scripts/capture.mjs */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data");
const BASE = "https://perfectlondonmassage.co.uk";

const TREATMENTS = [
  "thai-massage", "lomi-lomi-massage", "sports-massage", "deep-tissue-massage",
  "lymphatic-massage", "indian-head-massage", "reflexology-massage", "reiki-massage",
  "holistic-massage", "swedish-massage", "healing-pressure-massage",
  "aromatherapy-massage", "balinese-massage",
];

const THERAPIST_SLUGS = [
  "djeni", "mayara", "patricia", "tanya", "niki", "isabella", "carol", "julia-p",
  "yara", "nathaly-c", "nataly", "alexia", "morgana", "ana", "anna", "bella-2",
  "jessy", "alana", "katalina", "lola", "bella", "adina", "luna", "melissa",
  "julia", "gabrielle", "barbara", "lara", "adeany",
];

const THERAPIST_NAMES = {
  djeni: "Djeni", mayara: "Maya (Mayara)", patricia: "Patricia", tanya: "Tanya",
  niki: "Niki", isabella: "Isabella", carol: "Carol", "julia-p": "Julia P",
  yara: "Yara", "nathaly-c": "Nathaly C", nataly: "Nataly", alexia: "Alexia",
  morgana: "Morgana", ana: "Ana", anna: "Anna", "bella-2": "Bella",
  jessy: "Jessy", alana: "Alana", katalina: "Katalina", lola: "Lola",
  bella: "Mary", adina: "Adina", luna: "Luna", melissa: "Melissa",
  julia: "Julia", gabrielle: "Gabrielle", barbara: "Barbara", lara: "Lara",
  adeany: "Adeany",
};

const FLAG_FILE = {
  "brazilFlag.svg": "brazil.svg",
  "hungaryflag.svg": "hungary.svg",
  "kazakhstanflag.svg": "kazakhstan.svg",
  "romaniaFlag.svg": "romania.svg",
  "italianFlag.svg": "italy.svg",
  "france-Flag.svg": "france.svg",
  "Bandera_de_Espana.svg-e1761178418142.webp": "spain.webp",
  "european-union-flag-official-colors-vector-26861580-e1779224939720.png": "eu.png",
};

const GRID_FLAGS = {
  djeni: "brazilFlag.svg", mayara: "brazilFlag.svg", patricia: "brazilFlag.svg",
  tanya: "kazakhstanflag.svg", niki: "hungaryflag.svg", isabella: "brazilFlag.svg",
  carol: "brazilFlag.svg", "julia-p": "brazilFlag.svg",
  yara: "Bandera_de_Espana.svg-e1761178418142.webp", "nathaly-c": "brazilFlag.svg",
  nataly: "brazilFlag.svg", alexia: "brazilFlag.svg", morgana: "brazilFlag.svg",
  ana: "brazilFlag.svg", anna: "brazilFlag.svg", "bella-2": "hungaryflag.svg",
  jessy: "brazilFlag.svg", alana: "brazilFlag.svg",
  katalina: "european-union-flag-official-colors-vector-26861580-e1779224939720.png",
  lola: "european-union-flag-official-colors-vector-26861580-e1779224939720.png",
  bella: "brazilFlag.svg", adina: "romaniaFlag.svg",
  luna: "european-union-flag-official-colors-vector-26861580-e1779224939720.png",
  melissa: "italianFlag.svg", julia: "brazilFlag.svg", gabrielle: "france-Flag.svg",
  barbara: "brazilFlag.svg", lara: "brazilFlag.svg", adeany: "brazilFlag.svg",
};

function stripTags(html) {
  let t = html.replace(/<script[\s\S]*?<\/script>/gi, " ");
  t = t.replace(/<style[\s\S]*?<\/style>/gi, " ");
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, "\u2013").replace(/&#038;/g, "&").replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&ndash;/g, "\u2013");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

async function fetchHtml(url) {
  const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return await r.text();
}

function extractImages(html, base, opts = {}) {
  const { onlyMassage = false } = opts;
  const out = [];
  for (const m of html.matchAll(/<img[^>]+src="(https:\/\/perfectlondonmassage[^"]+)"[^>]*>/gi)) {
    const url = m[1].split(" ")[0];
    const filename = url.split("/").pop().split("?")[0];
    const lower = filename.toLowerCase();
    if (/flag|logo|favicon|kesz|specialoffer|f7c878|\.min\.js/i.test(lower)) continue;
    if (onlyMassage && !/massage/.test(lower)) continue;
    if (out.some((o) => o.filename === filename)) continue;
    out.push({ url, filename });
  }
  return out.slice(0, 6);
}

// ---- Therapists ----
async function captureTherapists() {
  const therapists = [];
  for (const slug of THERAPIST_SLUGS) {
    try {
      const html = await fetchHtml(`${BASE}/therapist/${slug}/`);
      const text = stripTags(html);
      const imgs = extractImages(html);
      const portrait = imgs.find((i) => !/sports-massage|swedish|thai_massage/i.test(i.filename));

      // bio: between "Book Me Now" and "Availability" (or "Our Therapists")
      let bio = "";
      const bi = text.indexOf("Book Me Now");
      if (bi >= 0) {
        let cut = text.indexOf("Availability", bi);
        if (cut < 0 || cut - bi > 4000) cut = text.indexOf("Our Therapists", bi);
        if (cut < 0) cut = bi + 2500;
        bio = text.slice(bi + "Book Me Now".length, cut).trim().replace(/\s+/g, " ");
        bio = bio.split(/Relaxing |Services|Service:/)[0].trim();
      }

      // services + availability — the comma list sits just before "Availability"
      const avIdx = text.indexOf("Availability");
      let services = [];
      if (avIdx >= 0) {
        const before = text.slice(Math.max(0, avIdx - 180), avIdx);
        const listStart = before.lastIndexOf(".");
        const raw = (listStart >= 0 ? before.slice(listStart + 1) : before).trim();
        services = raw.split(",").map((s) => s.trim().replace(/^and\s+/i, "")).filter((s) => s && s.length < 40);
      }
      const avMatch = text.match(/Availability\s*:?\s*(.*?)(?:Our Therapists|$)/);
      const availability = avMatch
        ? avMatch[1].replace(/[*]+/g, "").trim().replace(/\s+/g, " ").slice(0, 260)
        : "";

      const flagName = GRID_FLAGS[slug];
      const flag = flagName ? `https://perfectlondonmassage.co.uk/wp-content/uploads/2023/12/${flagName}` : undefined;

      therapists.push({ slug, name: THERAPIST_NAMES[slug] || slug, bio, services, availability, flag, flagFile: flagName ? FLAG_FILE[flagName] : undefined, portrait, gender: "female", inCallOnly: slug === "barbara" });
      console.log("therapist", slug, "| bio", (bio || "?").slice(0, 40), "| svc", services.length);
    } catch (e) {
      console.log("ERR therapist", slug, e.message);
      therapists.push({ slug, error: e.message });
    }
  }
  await writeFile(join(OUT, "therapists.json"), JSON.stringify(therapists, null, 2));
  console.log("therapists.json written:", therapists.length);
}

const TREATMENT_NAMES = {
  "thai-massage": "Thai",
  "lomi-lomi-massage": "Lomi Lomi",
  "sports-massage": "Sports",
  "deep-tissue-massage": "Deep Tissue",
  "lymphatic-massage": "Lymphatic",
  "indian-head-massage": "Indian Head",
  "reflexology-massage": "Reflexology",
  "reiki-massage": "Reiki",
  "holistic-massage": "Holistic",
  "swedish-massage": "Swedish",
  "healing-pressure-massage": "Healing Pressure",
  "aromatherapy-massage": "Aromatherapy",
  "balinese-massage": "Balinese",
};

const TREATMENT_ICONS = {
  "thai-massage": "leaf",
  "lomi-lomi-massage": "droplet",
  "sports-massage": "timer",
  "deep-tissue-massage": "activity",
  "lymphatic-massage": "droplet",
  "indian-head-massage": "sparkles",
  "reflexology-massage": "heart",
  "reiki-massage": "sparkles",
  "holistic-massage": "leaf",
  "swedish-massage": "leaf",
  "healing-pressure-massage": "handHeart",
  "aromatherapy-massage": "droplet",
  "balinese-massage": "sparkles",
};

// ---- Treatments ----
async function captureTreatments() {
  const treatments = [];
  for (const slug of TREATMENTS) {
    try {
      const html = await fetchHtml(`${BASE}/${slug}/`);
      const text = stripTags(html);
      const imgs = extractImages(html, BASE, { onlyMassage: true });

      // intro: first real <p> after the page <h1> (skip nav)
      let intro = "";
      const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      if (h1Match) {
        const h1End = html.indexOf(h1Match[0]) + h1Match[0].length;
        const bodyHtml = html.slice(h1End);
        const firstP = bodyHtml.match(/<p[^>]*>([^<]{120,})<\/p>/i);
        if (firstP) intro = stripTags(firstP[1]).trim();
      }

      // benefits: h2 + following <p> blocks in main content
      const benefits = [];
      const bodyStart = h1Match ? html.indexOf(h1Match[0]) + h1Match[0].length : 0;
      const bodyHtml = html.slice(bodyStart);
      const blocks = bodyHtml.matchAll(/<(?:h2|h3)[^>]*>([^<]+)<\/(?:h2|h3)>\s*(?:<[^>]*>\s*)*<p[^>]*>([^<]{120,})<\/p>/gi);
      const seenBenefit = new Set();
      for (const b of blocks) {
        const title = stripTags(b[1]).trim();
        const body = stripTags(b[2]).trim().replace(/\s+/g, " ").slice(0, 350);
        if (!seenBenefit.has(title) && title.length > 3 && title.length < 60 && body.length > 60) {
          seenBenefit.add(title);
          benefits.push({ title, body });
        }
        if (benefits.length >= 5) break;
      }

      treatments.push({ slug, name: TREATMENT_NAMES[slug] || null, icon: TREATMENT_ICONS[slug] || "leaf", duration: "60 / 90 min", price: "from £65", intro, benefits, images: imgs });
      console.log("treatment", slug, "| intro", (intro || "?").slice(0, 40), "| benefits", benefits.length, "| imgs", imgs.length);
    } catch (e) {
      console.log("ERR treatment", slug, e.message);
      treatments.push({ slug, error: e.message });
    }
  }
  await writeFile(join(OUT, "treatments.json"), JSON.stringify(treatments, null, 2));
  console.log("treatments.json written:", treatments.length);
}

await mkdir(OUT, { recursive: true });
await captureTherapists();
await captureTreatments();
console.log("DONE");
