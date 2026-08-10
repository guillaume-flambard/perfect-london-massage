"use client";

import { useRouter } from "next/navigation";
import { TreatmentDetail } from "@/components/site/TreatmentDetail";
import { useBooking } from "@/components/site/BookingProvider";
import { type Treatment } from "@/lib/data";

export function TreatmentClient({ treatment }: { treatment: Treatment }) {
  const router = useRouter();
  const { openBooking, navigate } = useBooking();

  return (
    <TreatmentDetail
      treatment={treatment}
      onBack={() => router.push("/")}
      onBook={() => openBooking()}
      onNavigate={navigate}
      onOpenTherapist={(t) => router.push(`/therapists/${t.slug}`)}
    />
  );
}
