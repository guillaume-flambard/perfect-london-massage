"use client";

import { useRouter } from "next/navigation";
import { TherapistProfile } from "@/components/site/TherapistProfile";
import { useBooking } from "@/components/site/BookingProvider";
import { type Therapist } from "@/lib/data";

export function TherapistClient({ therapist }: { therapist: Therapist }) {
  const router = useRouter();
  const { openBooking, navigate } = useBooking();

  return (
    <TherapistProfile
      therapist={therapist}
      onBack={() => router.push("/")}
      onBook={openBooking}
      onNavigate={navigate}
    />
  );
}
