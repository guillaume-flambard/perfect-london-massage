"use client";

import * as React from "react";
import Image from "next/image";
import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { SectionHeading } from "@/ds/components/core/SectionHeading.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { PriceCard } from "@/ds/components/marketing/PriceCard.tsx";
import { Accordion } from "@/ds/components/marketing/Accordion.tsx";
import { Chip } from "@/ds/components/core/Chip.tsx";
import { TherapistCard } from "@/ds/components/marketing/TherapistCard.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { PLM_DATA, THERAPISTS, CONTACT, type Treatment, type Therapist } from "@/lib/data";

interface TreatmentDetailProps {
  treatment: Treatment;
  onBack: () => void;
  onBook: () => void;
  onOpenTherapist: (t: Therapist) => void;
  onNavigate: (id: string) => void;
}

export function TreatmentDetail({ treatment, onBack, onBook, onOpenTherapist, onNavigate }: TreatmentDetailProps) {
  const D = PLM_DATA;
  const tr = treatment;

  return (
    <div>
      <AnnouncementBar items={D.announcements} />
      <SiteHeader links={D.nav} active="treatments" onBook={() => onBook()} onNavigate={onNavigate} />

      <section style={{ background: "var(--surface-page)", padding: "var(--space-10) 0 var(--space-20)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", padding: 0, marginBottom: "var(--space-8)" }}>
            <Icon name="chevronLeft" size={16} /> All treatments
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "var(--space-16)", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-700)" }}>Treatment</span>
              <h1 style={{ fontSize: "var(--text-display-lg)", margin: 0 }}>{tr.name} Massage</h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xl)", lineHeight: 1.55, color: "var(--text-muted)", maxWidth: 560 }}>{tr.intro}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Chip icon="timer">{tr.duration}</Chip>
                <Chip icon="wallet">{tr.price}</Chip>
                <Chip icon="droplet">Premium oils included</Chip>
              </div>
              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                <Button variant="gold" size="lg" iconRight="arrowRight" onClick={() => onBook()}>Book this treatment</Button>
                <Button variant="secondary" size="lg" iconLeft="messageCircle" onClick={() => window.open(CONTACT.whatsappHref, "_blank")}>Ask about it</Button>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-arch)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              {tr.image ? (
                <Image src={tr.image} alt={`${tr.name} massage`} width={800} height={1000} priority style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {tr.benefits.length > 0 && (
        <section style={{ background: "var(--surface-page-alt)", padding: "var(--section-padding-y-compact) 0" }}>
          <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
            <SectionHeading eyebrow="Benefits" title={`Why book a ${tr.name.toLowerCase()} massage`} style={{ marginBottom: "var(--space-8)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-4)" }}>
              {tr.benefits.map((b) => (
                <Card key={b.title} padding="md" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon name="sparkles" size={18} color="var(--gold-500)" />
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-xs)", fontWeight: 600 }}>{b.title}</div>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--text-muted)" }}>{b.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--section-padding-y-compact) 0" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <SectionHeading eyebrow="Pricing" title="What it costs" size="sm" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {D.prices.map((p) => <PriceCard key={p.title} {...p} cta="Book now" onSelect={() => onBook()} />)}
            </div>
            <Notice tone="info" title="Payment">You pay the therapist directly after the treatment — cash, PayPal or bank transfer. No deposit, and no cancellation fee. Travel supplement £15 in Zones 1–3, £20 in Zones 4–6 & Heathrow.</Notice>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <SectionHeading eyebrow="Therapists" title="Available for this treatment" size="sm" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {THERAPISTS.slice(0, 4).map((t) => (
                <TherapistCard key={t.slug} name={t.name} photo={t.photo} availability="Available" specialisms={t.services.slice(0, 2)} onView={() => onOpenTherapist(t)} onBook={() => onBook()} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface-page)", padding: "var(--section-padding-y-compact) 0" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading eyebrow="Questions" title="Before you book" style={{ marginBottom: "var(--space-6)" }} />
          <Accordion items={D.faq.slice(0, 5)} />
        </div>
      </section>

      <SiteFooter columns={[
        { title: "Treatments", links: THERAPISTS.length ? THERAPISTS.slice(0, 6).map((x) => x.name) : [] },
        { title: "Company", links: ["Our therapists", "Reviews", "Rates", "FAQ"] },
        { title: "Legal", links: ["Privacy policy", "Terms of service", "Professional conduct policy"] },
      ]} contact={[
        { icon: "phone", label: CONTACT.phone, href: CONTACT.phoneHref },
        { icon: "messageCircle", label: "WhatsApp", href: CONTACT.whatsappHref },
        { icon: "mail", label: CONTACT.email, href: `mailto:${CONTACT.email}` },
      ]}
        legal={`© 2026 Perfect London Massage · Strictly professional therapeutic service · ${CONTACT.phone}`} />
    </div>
  );
}
