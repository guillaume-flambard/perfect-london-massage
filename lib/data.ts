import therapistsRaw from "@/live-site/data/therapists.json";
import treatmentsRaw from "@/live-site/data/treatments.json";

export interface Therapist {
  slug: string;
  name: string;
  photo: string;
  flag?: string;
  flagFile?: string;
  bio: string;
  services: string[];
  availability: string;
  inCallOnly?: boolean;
  gender: string;
}

export interface TreatmentBenefit {
  title: string;
  body: string;
}

export interface Treatment {
  slug: string;
  name: string;
  icon: string;
  duration: string;
  price: string;
  description: string;
  intro: string;
  benefits: TreatmentBenefit[];
  image: string;
  images: { filename: string }[];
}

export interface PricePlan {
  title: string;
  price: string;
  unit: string;
  note: string;
  features: string[];
  featured?: boolean;
}

export interface Review {
  quote: string;
  author: string;
  borough: string;
  treatment: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  telegram: string;
  telegramHref: string;
  email: string;
  instagram: string;
}

const raw = therapistsRaw as unknown as {
  slug: string;
  name: string;
  bio: string;
  services: string[];
  availability: string;
  flag: string | null;
  flagFile?: string | null;
  inCallOnly?: boolean;
  portrait: { filename: string } | null;
  gender: string;
}[];
const rawTreatments = treatmentsRaw as unknown as {
  slug: string;
  name: string;
  icon: string;
  duration: string;
  price: string;
  intro: string;
  benefits: TreatmentBenefit[];
  images: { filename: string }[];
}[];

export const CONTACT: ContactInfo = {
  phone: "07904 648403",
  phoneHref: "tel:+447904648403",
  whatsapp: "+44 7386 738553",
  whatsappHref: "https://wa.me/447386738553",
  telegram: "t.me/perfectlondonmassage",
  telegramHref: "https://t.me/perfectlondonmassage",
  email: "info@perfectlondonmassage.co.uk",
  instagram: "https://www.instagram.com/perfectlondonmassage/",
};

const PORTRAIT_BY_SLUG: Record<string, string> = {
  djeni: "djeni.jpeg",
  mayara: "maya.png",
  patricia: "patricia.jpeg",
  tanya: "tanya.png",
  niki: "niki.png",
  isabella: "isabella.png",
  carol: "carol.jpeg",
  "julia-p": "julia-p.png",
  yara: "yara.jpeg",
  nataly: "nataly.png",
  alexia: "alexia.jpeg",
  morgana: "morgana.jpeg",
  ana: "ana.jpeg",
  anna: "anna.png",
  "bella-2": "bella.png",
  jessy: "jessy.png",
  alana: "alana.png",
  katalina: "katalina.jpeg",
  lola: "lola.png",
  bella: "mary.png",
  adina: "adina.jpg",
  luna: "luna.png",
  melissa: "melissa.jpeg",
  julia: "julia.png",
  gabrielle: "gabrielle.webp",
  barbara: "barbara.webp",
  lara: "lara.png",
  adeany: "adeany.jpeg",
};

const portraitFile = (slug: string, portrait: { filename: string } | null): string => {
  const f = PORTRAIT_BY_SLUG[slug];
  if (f) return `/assets/therapists/${f}`;
  if (portrait) return `/assets/therapists/${portrait.filename}`;
  return "";
};

const cleanServices = (s: string[]): string[] =>
  s
    .map((x) => x.replace(/^l-being\s*/i, "").trim())
    .filter((x) => x && !/top priority/i.test(x) && !/^and$/i.test(x))
    .slice(0, 8);

export const THERAPISTS: Therapist[] = raw.map((t) => ({
  slug: t.slug,
  name: t.name,
  photo: portraitFile(t.slug, t.portrait),
  flag: t.flag ?? undefined,
  flagFile: t.flagFile ?? undefined,
  bio: t.bio,
  services: cleanServices(t.services ?? []),
  availability: t.availability ?? "",
  inCallOnly: t.inCallOnly,
  gender: "female",
}));

export const TREATMENTS: Treatment[] = rawTreatments.map((t) => ({
  slug: t.slug,
  name: t.name,
  icon: t.icon,
  duration: t.duration ?? "60 / 90 min",
  price: t.price ?? "from £65",
  description: t.intro,
  intro: t.intro,
  benefits: t.benefits ?? [],
  image: t.images?.[0] ? `/assets/treatments/${t.images[0].filename}` : "",
  images: t.images ?? [],
}));

export const PRICING: PricePlan[] = [
  {
    title: "Luxury Massage",
    price: "£65",
    unit: "/ 60 min",
    note: "The standard booking — any treatment",
    features: [
      "Natural almond or grapeseed oils included",
      "Travel supplement £15 in Zones 1–3",
      "No deposit, no cancellation fee",
    ],
  },
  {
    title: "Massage Bliss",
    price: "£80",
    unit: "/ 90 min",
    note: "Best value — longer session",
    features: [
      "Travel supplement £15 in Zones 1–3",
      "Any treatment",
      "Free rescheduling with notice",
    ],
    featured: true,
  },
  {
    title: "Massage Overload",
    price: "£100",
    unit: "/ 120 min",
    note: "For full-body attention",
    features: [
      "Travel supplement £15 in Zones 1–3",
      "Any treatment",
      "Free rescheduling with notice",
    ],
  },
  {
    title: "Heaven Massage",
    price: "£140",
    unit: "/ 180 min",
    note: "The ultimate session",
    features: [
      "Travel supplement £15 in Zones 1–3",
      "Any treatment",
      "Free rescheduling with notice",
    ],
  },
];

export const TRAVEL_SUPPLEMENTS = [
  { zone: "Zones 1–3", fee: "£15" },
  { zone: "Zones 4–6", fee: "£20" },
  { zone: "Heathrow", fee: "£20" },
];

export const REVIEWS: Review[] = [
  { quote: "Iris did 2 hrs but the first time was more than enough. She made me realise it's not the length of the massage but the quality — brilliant, the best I've ever had.", author: "Eddie", borough: "Finchley", treatment: "With Iris", rating: 5 },
  { quote: "Rasha is a very caring and chatty young lady. I enjoyed the massage as usual. Best regards Tim", author: "Tim", borough: "Tower Hill", treatment: "With Rasha", rating: 5 },
  { quote: "Shar was really great, soft hands — was dropping off to sleep. Had a nice and friendly personality too. Great therapist, lovely lady", author: "George", borough: "Brixton", treatment: "With Shar", rating: 5 },
  { quote: "Nazila was fantastic. Nice girl. I will book again soon. One of your best therapists! Thanks again!", author: "Rick", borough: "Streatham", treatment: "With Nazila", rating: 5 },
  { quote: "Iris was excellent with her skill and stamina. Wonderful personality. Thank u.", author: "Ahmad", borough: "Chelsea", treatment: "With Iris", rating: 5 },
  { quote: "Vivien was perfect. What a star. Absolutely beautiful and the massage was amazing too. Can't wait for my next visit to London.", author: "Robert", borough: "Piccadilly", treatment: "With Vivien", rating: 5 },
  { quote: "Vivien was really good, I enjoyed her massage — she made me fall asleep for a bit. She looks stunning as well.", author: "Adela", borough: "Battersea", treatment: "With Vivien", rating: 5 },
  { quote: "Iris gave a very excellent massage after I had a stressful day at work. Thank you for her being on time and professional.", author: "Kin", borough: "Stockwell", treatment: "With Iris", rating: 5 },
  { quote: "Monica was really good, very nice lady! Thank you, David. She is brilliant. Much needed that. I will recommend to friends", author: "Oleg", borough: "Camberwell", treatment: "With Monica", rating: 5 },
];

export const FAQ: FaqItem[] = [
  { question: "What are the policies regarding cleanliness?", answer: "We only hire well-trained therapists with a professional and clean personal appearance. In return, we would like you to take a shower before receiving your massage. The room must be tidy and smelling fresh, with clean towels — one to lie on and one to cover parts of your body where you are not being massaged." },
  { question: "Can I have the therapist work on just one area?", answer: "Yes. If you'd like the massage therapist to focus on one specific area, just let them know at the start. This excludes the genital area. Keep in mind that the more time spent on a specific area, the less time spent on other areas." },
  { question: "What areas of London do you visit?", answer: "We are a mobile massage service operating in London and some surrounding areas. Our therapists visit you at your home, hotel or office." },
  { question: "What if I want more or less pressure?", answer: "You only have to ask. Perfect London Massage therapists are trained to adapt to a wide range of body types and sensitivities to pressure. The therapist will enquire during the massage, but feel free to ask." },
  { question: "May I request a particular therapist?", answer: "Yes. Massage is a very personal treatment and you have to be 'connected' to receive the full benefit. You may request a particular therapist; if they are not available we will notify you with as much notice as possible and send a replacement." },
  { question: "How much notice do you need? How soon could a therapist visit?", answer: "Depending on the time of day we can normally have a therapist with you within an hour. We reach you in 30–45 minutes if you are in central London or zones 1–2. Outside zone 3, allow at least 1 hour. Therapists are based in Central London W1, North, East, West and South London." },
  { question: "What is your cancellation policy?", answer: "We don't charge a cancellation fee. The only thing we ask, if you have to cancel, is that you value the time of our therapists and give us as much notice as possible." },
  { question: "Are your therapists qualified and experienced?", answer: "Yes. All therapists hired to work for Perfect London Massage have a certificate in their specialisation plus an anatomy and physiology certificate. Most have accumulated years of experience in luxury salons, spas and clinics." },
  { question: "Do I need to supply anything?", answer: "The therapists bring massage oils with them; you only have to provide clean towels. The massage can be done on the bed or on the floor. Our therapists do not bring a massage table." },
  { question: "What types of oils do your therapists use?", answer: "Our therapists use only natural massage oils — almond or grape seed. They are either base (without fragrance) or blended with various aromas. Please let your therapist know if you have any allergies or preferences." },
  { question: "How do I pay for the service?", answer: "You pay directly to the therapist after the treatment. You can also pay via PayPal transfer or online bank transfer." },
  { question: "Can I be naked during the massage?", answer: "Yes, you may be naked during the massage. Your intimate parts would be covered with the towel at all times. Some clients prefer to wear underwear. It is up to you." },
];

export const NAV = [
  { id: "treatments", label: "Treatments" },
  { id: "therapists", label: "Therapists" },
  { id: "rates", label: "Rates" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export const ANNOUNCEMENTS = [
  { icon: "navigation", label: "Central London in 30–45 minutes" },
  { icon: "house", label: "Available at home, hotel & office" },
  { icon: "wallet", label: "Rates from £65/hr" },
];

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function therapistSlug(t: Therapist): string {
  return t.slug;
}

export function findTherapist(slug: string): Therapist | undefined {
  return THERAPISTS.find((t) => t.slug === slug);
}

export function findTreatment(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

/* Legacy shape used by the Stitch-ported components. */
export const PLM_DATA = {
  nav: NAV,
  announcements: ANNOUNCEMENTS,
  therapists: THERAPISTS,
  treatments: {
    all: TREATMENTS,
  },
  prices: PRICING,
  reviews: REVIEWS,
  faq: FAQ,
  contact: CONTACT,
  footer: [
    { title: "Treatments", links: TREATMENTS.slice(0, 6).map((t) => t.name) },
    { title: "Company", links: ["Our therapists", "Reviews", "Rates", "FAQ"] },
    { title: "Legal", links: ["Privacy policy", "Terms of service", "Professional conduct policy"] },
  ],
};
