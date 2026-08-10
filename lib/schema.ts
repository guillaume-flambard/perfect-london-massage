import type { Therapist, Treatment, FaqItem } from "@/lib/data";
import { CONTACT, REVIEWS } from "@/lib/data";

const BASE = "https://perfectlondonmassage.co.uk";

export interface OrgSchema {
  "@context": "https://schema.org";
  "@type": "HealthAndBeautyBusiness";
  "@id": string;
  name: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  email: string;
  priceRange: string;
  aggregateRating: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: number;
    bestRating: string;
  };
  description: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  geo: { "@type": "GeoCoordinates"; latitude: number; longitude: number };
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  sameAs: string[];
}

export function organizationSchema(): OrgSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${BASE}/#organization`,
    name: "Perfect London Massage",
    url: BASE,
    logo: `${BASE}/favicon.png`,
    image: `${BASE}/favicon.png`,
    telephone: CONTACT.phoneHref,
    email: CONTACT.email,
    priceRange: "££",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: REVIEWS.length,
      bestRating: "5",
    },
    description:
      "Professional mobile massage service in London. Qualified therapists deliver deep tissue, Thai, sports, Swedish and more to your home, hotel or office.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "23:00",
      },
    ],
    sameAs: [CONTACT.instagram, CONTACT.telegramHref],
  };
}

export interface FaqSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
}

export function faqSchema(faq: FaqItem[]): FaqSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  "@id": string;
  name: string;
  description: string;
  url: string;
  image: string;
  provider: { "@id": string };
  areaServed: { "@type": "City"; name: string };
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: "GBP";
    availability: "https://schema.org/InStock";
  };
}

export function treatmentServiceSchema(t: Treatment): ServiceSchema {
  const price = t.price.replace("from £", "").replace("£", "") || "65";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/treatments/${t.slug}`,
    name: `${t.name} Massage`,
    description: t.intro.slice(0, 180),
    url: `${BASE}/treatments/${t.slug}`,
    image: t.image ? `${BASE}${t.image}` : `${BASE}/favicon.png`,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: { "@type": "City", name: "London" },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };
}

export interface TherapistSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  "@id": string;
  name: string;
  image: string;
  jobTitle: string;
  worksFor: { "@id": string };
  knowsAbout: string[];
  description: string;
}

export function therapistSchema(t: Therapist): TherapistSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/therapists/${t.slug}`,
    name: t.name,
    image: t.photo ? `${BASE}${t.photo}` : `${BASE}/favicon.png`,
    jobTitle: "Massage Therapist",
    worksFor: { "@id": `${BASE}/#organization` },
    knowsAbout: t.services.slice(0, 8),
    description: t.bio.slice(0, 180),
  };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export function breadcrumbSchema(items: { name: string; path: string }[]): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}

export interface AggregateRatingSchema {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: number;
  bestRating: string;
}

export function aggregateRatingSchema(reviewCount: number, ratingValue = "5.0"): AggregateRatingSchema {
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: "5",
  };
}
