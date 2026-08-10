import type { Metadata } from "next";
import { BookingProvider } from "@/components/site/BookingProvider";
import { ContactClient } from "@/components/site/ContactClient";

export const metadata: Metadata = {
  title: "Contact — Perfect London Massage",
  description: "Book your mobile massage in London. Call or text 07904 648403, WhatsApp +44 7386 738553, or email info@perfectlondonmassage.co.uk. Open 09:00–21:30, 7 days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <BookingProvider>
      <ContactClient />
    </BookingProvider>
  );
}
