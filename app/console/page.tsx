import type { Metadata } from "next";
import { ConsoleGate } from "@/components/console/ConsoleGate";

export const metadata: Metadata = {
  title: "Therapist Console — Perfect London Massage",
  description: "Internal therapist console — operational surface for therapists.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function ConsolePage() {
  return <ConsoleGate />;
}
