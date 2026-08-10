"use client";

import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { SectionHeading } from "@/ds/components/core/SectionHeading.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { PriceCard } from "@/ds/components/marketing/PriceCard.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { PLM_DATA, PRICING, TRAVEL_SUPPLEMENTS, CONTACT, TREATMENTS } from "@/lib/data";
import { useBooking } from "@/components/site/BookingProvider";

export function RatesClient() {
  const { openBooking, navigate } = useBooking();

  return (
    <div>
      <AnnouncementBar items={PLM_DATA.announcements} />
      <SiteHeader links={PLM_DATA.nav} active="rates" onBook={() => openBooking()} onNavigate={navigate} />

      <section style={{ background: "var(--surface-page)", padding: "var(--space-12) 0 var(--space-20)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading eyebrow="Rates" title="Massage rates" align="center" style={{ margin: "0 auto var(--space-4)" }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--text-muted)", textAlign: "center", maxWidth: 640, margin: "0 auto var(--space-12)" }}>
            Normal hours 09:00–21:30, 7 days a week. From 21:30 we charge a £20 late-night fee which goes to the therapist. Our last appointment is at 23:00 daily, subject to availability.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)", alignItems: "stretch" }}>
            {PRICING.map((p) => <PriceCard key={p.title} {...p} cta="Book now" onSelect={() => openBooking()} />)}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--section-padding-y-compact) 0" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading eyebrow="Travel supplement" title="Travel supplement by zone" size="sm" style={{ marginBottom: "var(--space-6)" }} />
          <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {TRAVEL_SUPPLEMENTS.map((s) => (
              <div key={s.zone} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "var(--text-md)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="mapPin" size={16} color="var(--emerald-700)" />{s.zone}</span>
                <span style={{ fontWeight: 600 }}>{s.fee}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "var(--text-md)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="clock" size={16} color="var(--emerald-700)" />Late-night fee (after 21:30)</span>
              <span style={{ fontWeight: 600 }}>£20</span>
            </div>
          </Card>
          <Notice tone="info" title="Payment" style={{ marginTop: "var(--space-6)" }}>
            You pay the therapist directly after the treatment — cash, PayPal or online bank transfer. No deposit is taken online, and there is no cancellation fee. Tipping (10–20%) is optional and always appreciated.
          </Notice>
        </div>
      </section>

      <section style={{ background: "var(--surface-inverse-deep)", padding: "var(--space-20) 0" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center", display: "flex", flexDirection: "column", gap: "var(--space-6)", alignItems: "center" }}>
          <h2 style={{ color: "var(--text-inverse)", fontSize: "var(--text-display-md)", margin: 0 }}>Ready to book?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--text-inverse-muted)", maxWidth: 480 }}>
            Call or text {CONTACT.phone}, or message us on WhatsApp. We confirm by text within a few minutes.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="gold" size="lg" iconLeft="messageCircle" onClick={() => window.open(CONTACT.whatsappHref, "_blank")}>Book on WhatsApp</Button>
            <Button variant="inverse-outline" size="lg" iconLeft="phone" onClick={() => window.open(CONTACT.phoneHref, "_self")}>Call {CONTACT.phone}</Button>
          </div>
        </div>
      </section>

      <SiteFooter columns={[
        { title: "Treatments", links: TREATMENTS.slice(0, 6).map((t) => t.name) },
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
