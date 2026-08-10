import type { Metadata } from "next";
import { BookingProvider } from "@/components/site/BookingProvider";
import { HomeClient } from "@/components/site/HomeClient";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, faqSchema } from "@/lib/schema";
import { FAQ } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <BookingProvider>
        <HomeClient />
      </BookingProvider>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(FAQ)} />
    </>
  );
}
