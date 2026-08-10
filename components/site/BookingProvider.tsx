"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Therapist } from "@/lib/data";
import { BookingDrawer } from "@/components/site/BookingDrawer";

interface BookingContextValue {
  openBooking: (t?: Therapist) => void;
  closeBooking: () => void;
  navigate: (id: string) => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [drawer, setDrawer] = React.useState(false);
  const [drawerTherapist, setDrawerTherapist] = React.useState<Therapist | null>(null);

  const openBooking = React.useCallback((t?: Therapist) => {
    setDrawerTherapist(t || null);
    setDrawer(true);
  }, []);

  const closeBooking = React.useCallback(() => setDrawer(false), []);

  const navigate = React.useCallback(
    (id: string) => {
      if (id === "rates" || id === "contact") {
        router.push(`/${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else router.push("/");
    },
    [router]
  );

  React.useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, navigate }}>
      {children}
      <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: drawer ? "auto" : "none" }}>
        <BookingDrawer open={drawer} onClose={closeBooking} therapist={drawerTherapist} />
      </div>
    </BookingContext.Provider>
  );
}
