import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TREATMENTS, findTreatment } from "@/lib/data";
import { BookingProvider } from "@/components/site/BookingProvider";
import { TreatmentClient } from "@/components/site/TreatmentClient";
import { JsonLd } from "@/components/JsonLd";
import { treatmentServiceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = findTreatment(slug);
  if (!t) return { title: "Treatment not found" };
  const description = t.intro.slice(0, 155);
  return {
    title: `${t.name} Massage London — Mobile Massage at Home`,
    description,
    alternates: { canonical: `/treatments/${t.slug}` },
    openGraph: {
      title: `${t.name} Massage London — Perfect London Massage`,
      description,
      url: `/treatments/${t.slug}`,
      images: [{ url: "/og-default.webp", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function TreatmentPage({ params }: PageProps<"/treatments/[slug]">) {
  const { slug } = await params;
  const treatment = findTreatment(slug);
  if (!treatment) notFound();

  return (
    <>
      <BookingProvider>
        <TreatmentClient treatment={treatment} />
      </BookingProvider>
      <JsonLd data={treatmentServiceSchema(treatment)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Treatments", path: "/#treatments" },
        { name: `${treatment.name} Massage`, path: `/treatments/${treatment.slug}` },
      ])} />
    </>
  );
}
