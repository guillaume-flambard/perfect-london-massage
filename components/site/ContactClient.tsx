"use client";

import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { SectionHeading } from "@/ds/components/core/SectionHeading.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { PLM_DATA, CONTACT, TREATMENTS } from "@/lib/data";
import { useBooking } from "@/components/site/BookingProvider";

export function ContactClient() {
  const { openBooking, navigate } = useBooking();

  const channels = [
    { icon: "phone", title: "Call or text", value: CONTACT.phone, href: CONTACT.phoneHref, note: "Fastest — we confirm by text within a few minutes" },
    { icon: "messageCircle", title: "WhatsApp", value: CONTACT.whatsapp, href: CONTACT.whatsappHref, note: "Message us anytime, 7 days a week" },
    { icon: "mail", title: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, note: "For corporate, group and office bookings" },
    { icon: "navigation", title: "Telegram", value: CONTACT.telegram, href: CONTACT.telegramHref, note: "Prefer Telegram? We're there too" },
  ];

  return (
    <div>
      <AnnouncementBar items={PLM_DATA.announcements} />
      <SiteHeader links={PLM_DATA.nav} active="contact" onBook={() => openBooking()} onNavigate={navigate} />

      <section style={{ background: "var(--surface-page)", padding: "var(--space-12) 0 var(--space-20)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading eyebrow="Contact" title="Book your Perfect London Massage" align="center" style={{ margin: "0 auto var(--space-4)" }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--text-muted)", textAlign: "center", maxWidth: 620, margin: "0 auto var(--space-12)" }}>
            We&apos;re available 09:00–21:30, 7 days a week (last appointment 23:00). Therapists reach Zones 1–2 in 30–45 minutes; outside Zone 3 allow at least 1 hour.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)" }}>
            {channels.map((c) => (
              <Card key={c.title} padding="lg" interactive style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--surface-accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={c.icon} size={21} color="var(--emerald-700)" />
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-xs)", fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 }}>{c.note}</div>
                <Button variant="primary" size="sm" fullWidth iconRight="arrowRight" onClick={() => window.open(c.href, "_self")} style={{ marginTop: "auto" }}>
                  {c.value}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface-page-alt)", padding: "var(--section-padding-y-compact) 0" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading eyebrow="Service area" title="Where we visit" size="sm" style={{ marginBottom: "var(--space-6)" }} />
          <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: 1.7, color: "var(--text-muted)" }}>
              We are a mobile massage service operating in London and surrounding areas — including Kent and Hertfordshire. Our therapists visit you at your home, hotel or office. They are based in Central London W1, North, East, West and South London, so most locations are within easy reach.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: 1.7, color: "var(--text-muted)" }}>
              Outside Zone 3 there may be a surcharge to cover travel expenses. If you live near a station or bus stop, we&apos;ll do our best to get a therapist to you promptly.
            </p>
          </Card>
          <Notice tone="brand" title="Strictly professional" style={{ marginTop: "var(--space-6)" }}>
            Every appointment is a qualified therapeutic treatment. Any other request ends the booking.
          </Notice>
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
