"use client";

import * as React from "react";
import Image from "next/image";
import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { SectionHeading } from "@/ds/components/core/SectionHeading.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Chip } from "@/ds/components/core/Chip.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { StepCard } from "@/ds/components/marketing/StepCard.tsx";
import { TherapistCard } from "@/ds/components/marketing/TherapistCard.tsx";
import { TreatmentCard } from "@/ds/components/marketing/TreatmentCard.tsx";
import { PriceCard } from "@/ds/components/marketing/PriceCard.tsx";
import { Testimonial } from "@/ds/components/marketing/Testimonial.tsx";
import { Accordion } from "@/ds/components/marketing/Accordion.tsx";
import { PostcodeChecker } from "@/ds/components/marketing/PostcodeChecker.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Field } from "@/ds/components/forms/Field.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { PLM_DATA, TREATMENTS, TRAVEL_SUPPLEMENTS, CONTACT, type Therapist, type Treatment } from "@/lib/data";
import { Dropdown } from "@/components/site/Dropdown";
import { DatePicker } from "@/components/site/DatePicker";

interface HomeProps {
  onBook: (t?: Therapist) => void;
  onOpenTherapist: (t: Therapist) => void;
  onOpenTreatment: (t: Treatment) => void;
  onNavigate: (id: string) => void;
}

function Section({ children, tone = "page", id, style }: { children: React.ReactNode; tone?: "page" | "alt" | "inverse"; id?: string; style?: React.CSSProperties }) {
  const bg = { page: "var(--surface-page)", alt: "var(--surface-page-alt)", inverse: "var(--surface-inverse)" }[tone];
  return (
    <section id={id} style={{ background: bg, padding: "var(--section-padding-y) 0", ...style }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>{children}</div>
    </section>
  );
}

export function Home({ onBook, onOpenTherapist, onOpenTreatment, onNavigate }: HomeProps) {
  const D = PLM_DATA;
  const [eta, setEta] = React.useState<{ covered: boolean; message: string } | undefined>(undefined);
  const [etaTime, setEtaTime] = React.useState("soon");
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setEtaTime(new Date(Date.now() + 45 * 60000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div>
      <AnnouncementBar items={D.announcements} />
      <SiteHeader links={D.nav} active="home" onBook={() => onBook()} onNavigate={onNavigate} />

      {/* Hero */}
      <section style={{ background: "var(--surface-page)", paddingTop: "var(--space-20)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "var(--space-16)", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-700)" }}>
                Mobile massage · London
              </span>
              <h1 style={{ fontSize: "var(--text-display-xl)", margin: 0 }}>Luxury mobile massage delivered to your doorstep</h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xl)", lineHeight: 1.55, color: "var(--text-muted)", maxWidth: 520 }}>
                Qualified therapists at your home, hotel or office. Central London in 30 to 45 minutes, the rest of the city within the hour.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Chip icon="badgeCheck">Verified therapists</Chip>
                <Chip icon="droplet">Natural oils</Chip>
                <Chip icon="shieldCheck">No cancellation fee</Chip>
              </div>
              <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <Button variant="gold" size="lg" iconRight="arrowRight" onClick={() => onBook()}>Book a Session</Button>
                <Button variant="secondary" size="lg" iconLeft="messageCircle" onClick={() => window.open(CONTACT.whatsappHref, "_blank")}>WhatsApp us</Button>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-arch)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              {TREATMENTS[0]?.image ? (
                <Image src={TREATMENTS[0].image} alt="Massage treatment in progress" width={800} height={1000} priority style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
              ) : null}
            </div>
          </div>
          <div style={{ marginTop: "calc(var(--space-12) * -1)", position: "relative", zIndex: 2, paddingBottom: "var(--space-20)" }}>
            <Card padding="lg" style={{ marginTop: "var(--space-16)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "var(--space-4)", alignItems: "end" }}>
              <Field label="Where">
                <Dropdown label="Where" placeholder="Home, hotel or office" iconLeft="house" options={["My home", "Hotel", "Office"]} />
              </Field>
              <Field label="Treatment">
                <Dropdown label="Treatment" defaultValue="Any treatment" iconLeft="leaf" options={["Any treatment", ...TREATMENTS.map((t) => t.name)]} />
              </Field>
              <Field label="When">
                <DatePicker />
              </Field>
              <Button variant="gold" size="lg" onClick={() => onBook()} iconRight="arrowRight" style={{ minHeight: 48, gridColumn: "auto/-1" }}>Find a therapist</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section tone="alt" id="how">
        <SectionHeading eyebrow="How it works" title="Three steps to a therapist at your door"
          lede="No account, no deposit. Your booking is confirmed by text within twenty minutes." align="center" style={{ margin: "0 auto var(--space-16)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-12)" }}>
          <StepCard step={1} icon="leaf" title="Choose treatment & location" description="Pick a treatment and tell us whether you are at home, in a hotel or at the office." />
          <StepCard step={2} icon="user" title="Pick or get matched" description="Browse verified therapists by availability and specialism, or let us assign the nearest one." />
          <StepCard step={3} icon="sparkles" title="Relax in comfort" description="Your therapist arrives with natural almond or grapeseed oils. You lay out two clean towels; the rest is theirs." />
        </div>
      </Section>

      {/* Therapists */}
      <Section id="therapists">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)", marginBottom: "var(--space-10)", flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Our therapists" title="Qualified hands, forty-five minutes away" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)", alignItems: "stretch" }}>
          {D.therapists.slice(0, 8).map((t) => (
            <TherapistCard key={t.slug} name={t.name} photo={t.photo} availability="Available" specialisms={t.services.slice(0, 2)} onView={() => onOpenTherapist(t)} onBook={() => onBook(t)} />
          ))}
        </div>
      </Section>

      {/* Treatments */}
      <Section tone="alt" id="treatments">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)", marginBottom: "var(--space-10)", flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Treatments" title="All massage types, at home" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.slug} {...t} layout="image" onClick={() => onOpenTreatment(t)} />
          ))}
        </div>
      </Section>

      {/* Coverage & pricing */}
      <Section id="pricing" tone="inverse">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "end" }}>
            <SectionHeading tone="inverse" eyebrow="Coverage & pricing" title="Transparent rates, travel supplement stated up front"
              lede="Enter your postcode and we will tell you how soon a therapist can be with you." />
            <PostcodeChecker tone="inverse" result={eta}
              onCheck={(pc: string) => setEta({ covered: true, message: `${(pc || "SW3").slice(0, 3).toUpperCase()} — Zone 1. Therapists available from 30–45 minutes.` })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)", alignItems: "stretch" }}>
            {D.prices.map((p) => <PriceCard key={p.title} {...p} cta="Book now" onSelect={() => onBook()} />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center" }}>
            {TRAVEL_SUPPLEMENTS.map((s) => (
              <span key={s.zone} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-inverse-muted)" }}>
                <Icon name="mapPin" size={15} /> {s.zone} — {s.fee}
              </span>
            ))}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-inverse-muted)" }}>
              <Icon name="clock" size={15} /> After 21:30 — £20 late-night fee
            </span>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section id="reviews">
        <SectionHeading eyebrow="Reviews" title="What London says" align="center" style={{ margin: "0 auto var(--space-12)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)", alignItems: "stretch" }}>
          {D.reviews.slice(0, 6).map((r) => <Testimonial key={r.author} {...r} />)}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="alt" id="faq">
        <div style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-16)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <SectionHeading eyebrow="Questions" title="Everything, before you book" />
            <Notice tone="brand" title="Strictly professional">
              Perfect London Massage is a therapeutic wellness service. Every therapist is qualified and every appointment is professional without exception.
            </Notice>
          </div>
          <Accordion items={D.faq} />
        </div>
      </Section>

      {/* Closing CTA */}
      <section style={{ background: "var(--surface-inverse-deep)", padding: "var(--space-24) 0" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center", display: "flex", flexDirection: "column", gap: "var(--space-6)", alignItems: "center" }}>
          <h2 style={{ color: "var(--text-inverse)", fontSize: "var(--text-display-md)", margin: 0 }}>A therapist can be with you by {etaTime}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--text-inverse-muted)", maxWidth: 480 }}>
            Tell us where you are and what you need. You pay the therapist directly at the end of the session.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="gold" size="lg" onClick={() => onBook()} iconRight="arrowRight">Book a Session</Button>
            <Button variant="inverse-outline" size="lg" iconLeft="phone" onClick={() => window.open(CONTACT.phoneHref, "_self")}>Call {CONTACT.phone}</Button>
          </div>
        </div>
      </section>

      <SiteFooter columns={[
        { title: "Treatments", links: TREATMENTS.slice(0, 6).map((t) => t.name) },
        { title: "Company", links: ["Our therapists", "Reviews", "Rates", "FAQ"] },
        { title: "Legal", links: ["Privacy policy", "Terms of service", "Professional conduct policy"] },
      ]}
        contact={[
          { icon: "phone", label: CONTACT.phone, href: CONTACT.phoneHref },
          { icon: "messageCircle", label: "WhatsApp", href: CONTACT.whatsappHref },
          { icon: "mail", label: CONTACT.email, href: `mailto:${CONTACT.email}` },
        ]}
        legal={`© 2026 Perfect London Massage · Strictly professional therapeutic service · ${CONTACT.phone}`} />
    </div>
  );
}
