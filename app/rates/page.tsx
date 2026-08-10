import type { Metadata } from "next";
import { BookingProvider } from "@/components/site/BookingProvider";
import { RatesClient } from "@/components/site/RatesClient";

export const metadata: Metadata = {
  title: "Rates — Perfect London Massage",
  description: "Mobile massage rates in London: Luxury £65/60min, Massage Bliss £80/90min, Massage Overload £100/120min, Heaven £140/180min. Travel supplement by zone.",
  alternates: { canonical: "/rates" },
};

export default function RatesPage() {
  return (
    <BookingProvider>
      <RatesClient />
    </BookingProvider>
  );
}
