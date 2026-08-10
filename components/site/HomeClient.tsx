"use client";

import { useRouter } from "next/navigation";
import { Home } from "@/components/site/Home";
import { useBooking } from "@/components/site/BookingProvider";

export function HomeClient() {
  const router = useRouter();
  const { openBooking, navigate } = useBooking();

  return (
    <Home
      onBook={openBooking}
      onNavigate={navigate}
      onOpenTherapist={(t) => router.push(`/therapists/${t.slug}`)}
      onOpenTreatment={(t) => router.push(`/treatments/${t.slug}`)}
    />
  );
}
