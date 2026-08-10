"use client";

import * as React from "react";
import { Drawer } from "@/ds/components/overlay/Drawer.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { CONTACT, type Therapist } from "@/lib/data";

interface BookingDrawerProps {
  open: boolean;
  onClose: () => void;
  therapist?: Therapist | null;
  treatment?: string | null;
}

export function BookingDrawer({ open, onClose, therapist, treatment }: BookingDrawerProps) {
  const title = therapist ? `Book with ${therapist.name.split(" ")[0]}` : "Book a session";
  const subject = therapist ? `Booking with ${therapist.name}${treatment ? ` — ${treatment}` : ""}` : `Booking request${treatment ? ` — ${treatment}` : ""}`;
  const waText = encodeURIComponent(subject);

  return (
    <Drawer open={open} onClose={onClose} width={460}
      eyebrow="Booking"
      title={title}
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="gold" fullWidth iconLeft="messageCircle" onClick={() => window.open(`${CONTACT.whatsappHref}?text=${waText}`, "_blank")}>
            Book on WhatsApp
          </Button>
          <Button variant="secondary" fullWidth iconLeft="phone" onClick={() => window.open(CONTACT.phoneHref, "_self")}>
            Call or text {CONTACT.phone}
          </Button>
          <Button variant="secondary" fullWidth iconLeft="mail" onClick={() => window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`, "_self")}>
            Email us
          </Button>
        </div>
      }>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {therapist && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "var(--space-4)", background: "var(--surface-accent-soft)", borderRadius: "var(--radius-md)" }}>
            {therapist.photo && (
              <img src={therapist.photo} alt={therapist.name} style={{ width: 44, height: 56, borderRadius: 10, objectFit: "cover" }} />
            )}
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600 }}>{therapist.name}</div>
              {therapist.services.length > 0 && (
                <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{therapist.services.slice(0, 4).join(" · ")}</div>
              )}
            </div>
          </div>
        )}
        <Notice tone="brand" title="Book by WhatsApp, text or call">
          We confirm by text within a few minutes. Nothing is charged until the session ends. Allow at least 1 hour for your therapist to arrive.
        </Notice>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "var(--space-5)", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)" }}>
          {[["Phone / SMS", CONTACT.phone], ["WhatsApp", CONTACT.whatsapp], ["Email", CONTACT.email]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
              <span style={{ color: "var(--text-subtle)" }}>{k}</span>
              <span style={{ fontWeight: "var(--weight-semibold)" }}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-subtle)", lineHeight: 1.6 }}>
          Opening hours 09:00–21:30, 7 days. After 21:30 a £20 late-night fee applies. Travel supplement £15 in Zones 1–3, £20 in Zones 4–6 & Heathrow.
        </p>
      </div>
    </Drawer>
  );
}
