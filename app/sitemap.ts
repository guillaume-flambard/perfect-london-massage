import type { MetadataRoute } from "next";
import { TREATMENTS, THERAPISTS } from "@/lib/data";

export const dynamic = "force-static";

const BASE = "https://perfectlondonmassage.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/rates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = TREATMENTS.map((t) => ({
    url: `${BASE}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const therapistRoutes: MetadataRoute.Sitemap = THERAPISTS.map((t) => ({
    url: `${BASE}/therapists/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...therapistRoutes];
}
