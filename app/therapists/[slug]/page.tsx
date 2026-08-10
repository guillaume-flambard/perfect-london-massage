import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { THERAPISTS, findTherapist } from "@/lib/data";
import { BookingProvider } from "@/components/site/BookingProvider";
import { TherapistClient } from "@/components/site/TherapistClient";
import { JsonLd } from "@/components/JsonLd";
import { therapistSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return THERAPISTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/therapists/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = findTherapist(slug);
  if (!t) return { title: "Therapist not found" };
  const description = `Book ${t.name}, a qualified mobile massage therapist in London. ${t.services.slice(0, 4).join(", ")}.`;
  return {
    title: `${t.name} — Mobile Massage Therapist London`,
    description,
    alternates: { canonical: `/therapists/${t.slug}` },
    openGraph: {
      title: `${t.name} — Mobile Massage Therapist London`,
      description,
      url: `/therapists/${t.slug}`,
      images: t.photo ? [{ url: t.photo }] : undefined,
      type: "profile",
    },
  };
}

export default async function TherapistPage({ params }: PageProps<"/therapists/[slug]">) {
  const { slug } = await params;
  const therapist = findTherapist(slug);
  if (!therapist) notFound();

  return (
    <>
      <BookingProvider>
        <TherapistClient therapist={therapist} />
      </BookingProvider>
      <JsonLd data={therapistSchema(therapist)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Therapists", path: "/#therapists" },
        { name: therapist.name, path: `/therapists/${therapist.slug}` },
      ])} />
    </>
  );
}
