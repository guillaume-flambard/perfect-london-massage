"use client";

import * as React from "react";
import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { SectionHeading } from "@/ds/components/core/SectionHeading.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Chip } from "@/ds/components/core/Chip.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { ImagePlaceholder } from "@/ds/components/core/ImagePlaceholder.tsx";
import { StepCard } from "@/ds/components/marketing/StepCard.tsx";
import { TherapistCard } from "@/ds/components/marketing/TherapistCard.tsx";
import { TreatmentCard } from "@/ds/components/marketing/TreatmentCard.tsx";
import { Testimonial } from "@/ds/components/marketing/Testimonial.tsx";
import { Accordion } from "@/ds/components/marketing/Accordion.tsx";
import { PostcodeChecker } from "@/ds/components/marketing/PostcodeChecker.tsx";
import { Field } from "@/ds/components/forms/Field.tsx";
import { Select } from "@/ds/components/forms/Select.tsx";
import { Input } from "@/ds/components/forms/Input.tsx";
import { PLM_DATA, TREATMENTS, CONTACT, type Therapist } from "@/lib/data";

interface MobileHomeProps {
  onBook: () => void;
  onOpenTherapist: (t: Therapist) => void;
  onNavigate: (id: string) => void;
}

export function MobileHome({ onBook, onOpenTherapist, onNavigate }: MobileHomeProps) {
  const D = PLM_DATA;

  return (
    <div style={{ width: 390, margin: "0 auto", background: "var(--surface-page)", minHeight: "100%", position: "relative", overflow: "hidden" }}>
      <AnnouncementBar items={[D.announcements[0]]} />
      <SiteHeader compact links={D.nav} onBook={() => onBook()} onNavigate={onNavigate} />

      <section style={{ padding: "var(--space-10) var(--space-5) var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-700)" }}>Mobile massage · London</span>
        <h1 style={{ fontSize: "var(--text-display-md)", margin: 0 }}>Luxury mobile massage delivered to your doorstep</h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: 1.6, color: "var(--text-muted)" }}>
          Qualified therapists at your home, hotel or office. Central London in 30 to 45 minutes.
        </p>
        <ImagePlaceholder label="Hero — oil, linen, warm light" ratio="5 / 4" shape="arch" />
        <Card padding="md" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Field label="Where"><Select placeholder="Home, hotel or office" iconLeft="house" options={["My home", "Hotel", "Office"]} /></Field>
          <Field label="Treatment"><Select placeholder="Any treatment" iconLeft="leaf" options={TREATMENTS.map((t) => t.name)} /></Field>
          <Field label="Postcode"><Input placeholder="SW3 4RY" iconLeft="mapPin" /></Field>
          <Button variant="gold" size="lg" fullWidth iconRight="arrowRight" onClick={() => onBook()}>Find a therapist</Button>
        </Card>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip size="sm" icon="badgeCheck">Verified</Chip>
          <Chip size="sm" icon="droplet">Natural oils</Chip>
          <Chip size="sm" icon="shieldCheck">No cancellation fee</Chip>
        </div>
      </section>

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--space-12) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <SectionHeading eyebrow="How it works" title="Three steps to a therapist at your door" size="sm" />
        <StepCard step={1} icon="leaf" title="Choose treatment & location" description="Home, hotel or office, anywhere in Zones 1–3." />
        <StepCard step={2} icon="user" title="Pick or get matched" description="Browse verified therapists, or let us assign the nearest." />
        <StepCard step={3} icon="sparkles" title="Relax in comfort" description="Your therapist brings natural oils; you lay out two clean towels." />
      </section>

      <section style={{ padding: "var(--space-12) 0", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <SectionHeading eyebrow="Featured therapists" title="Qualified hands nearby" size="sm" style={{ padding: "0 var(--space-5)" }} />
        <div style={{ display: "flex", gap: "var(--space-4)", overflowX: "auto", padding: "0 var(--space-5) var(--space-2)" }}>
          {D.therapists.slice(0, 6).map((t) => (
            <TherapistCard key={t.slug} name={t.name} photo={t.photo} specialisms={t.services.slice(0, 2)} onView={() => onOpenTherapist(t)} onBook={() => onBook()} style={{ minWidth: 250 }} />
          ))}
        </div>
      </section>

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--space-12) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <SectionHeading eyebrow="Treatments" title="All massage types" size="sm" />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {TREATMENTS.slice(0, 6).map((t) => <TreatmentCard key={t.slug} {...t} layout="image" />)}
        </div>
      </section>

      <section style={{ background: "var(--surface-inverse)", padding: "var(--space-12) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <SectionHeading tone="inverse" eyebrow="Coverage" title="Check your postcode" size="sm" />
        <PostcodeChecker tone="inverse" />
      </section>

      <section style={{ padding: "var(--space-12) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <SectionHeading eyebrow="Reviews" title="What London says" size="sm" />
        {D.reviews.slice(0, 2).map((r) => <Testimonial key={r.author} {...r} />)}
      </section>

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--space-12) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <SectionHeading eyebrow="Questions" title="Before you book" size="sm" />
        <Accordion items={D.faq.slice(0, 4)} />
      </section>

      <SiteFooter columns={D.footer.slice(0, 2)} contact={[{ icon: "messageCircle", label: "WhatsApp us", href: CONTACT.whatsappHref }, { icon: "phone", label: CONTACT.phone, href: CONTACT.phoneHref }]}
        legal="© 2026 Perfect London Massage" />

      <div style={{ position: "sticky", bottom: 0, padding: "var(--space-4) var(--space-5)", background: "rgba(253,251,247,.92)", backdropFilter: "var(--blur-veil)", borderTop: "1px solid var(--border-soft)", display: "flex", gap: "var(--space-3)" }}>
        <Button variant="gold" size="lg" fullWidth onClick={() => onBook()}>Book a Session</Button>
        <Button variant="secondary" size="lg" iconLeft="messageCircle" onClick={() => window.open(CONTACT.whatsappHref, "_blank")} style={{ padding: "17px 20px" }} />
      </div>
    </div>
  );
}
