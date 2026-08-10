"use client";

import * as React from "react";
import Image from "next/image";
import { AnnouncementBar } from "@/ds/components/navigation/AnnouncementBar.tsx";
import { SiteHeader } from "@/ds/components/navigation/SiteHeader.tsx";
import { SiteFooter } from "@/ds/components/navigation/SiteFooter.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Badge } from "@/ds/components/core/Badge.tsx";
import { Card } from "@/ds/components/core/Card.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Tabs } from "@/ds/components/navigation/Tabs.tsx";
import { PLM_DATA, TREATMENTS, CONTACT, type Therapist } from "@/lib/data";

interface TherapistProfileProps {
  therapist: Therapist;
  onBack: () => void;
  onBook: (t: Therapist) => void;
  onNavigate: (id: string) => void;
}

export function TherapistProfile({ therapist, onBack, onBook, onNavigate }: TherapistProfileProps) {
  const D = PLM_DATA;
  const t = therapist;
  const [tab, setTab] = React.useState("about");

  return (
    <div>
      <AnnouncementBar items={D.announcements} />
      <SiteHeader links={D.nav} active="therapists" onBook={() => onBook(t)} onNavigate={onNavigate} />
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-8) var(--gutter) var(--space-24)" }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", padding: 0, marginBottom: "var(--space-8)" }}>
          <Icon name="chevronLeft" size={16} /> All therapists
        </button>

        <div style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: "var(--space-16)", alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <div style={{ borderRadius: "var(--radius-arch)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <Image src={t.photo} alt={`${t.name} — portrait`} width={640} height={800} priority style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
            </div>
            <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                <span style={{ color: "var(--text-subtle)" }}>From</span><span style={{ fontWeight: 600 }}>£65 / 60 min</span>
              </div>
              {t.availability && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--text-subtle)" }}>Availability</span><span style={{ fontWeight: 600 }}>{t.availability.split("Monday")[0].trim() || "Daily"}</span>
                </div>
              )}
              <Button variant="gold" fullWidth iconRight="arrowRight" onClick={() => onBook(t)}>Book with {t.name.split(" ")[0]}</Button>
              <Button variant="secondary" fullWidth iconLeft="messageCircle" onClick={() => window.open(CONTACT.whatsappHref, "_blank")}>Ask a question</Button>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <Badge tone="brand" icon="badgeCheck">Qualified therapist</Badge>
                {t.inCallOnly && <Badge tone="gold" uppercase>In-call only</Badge>}
                {t.flagFile && <img src={`/assets/flags/${t.flagFile}`} alt="" style={{ width: 22, height: 14, objectFit: "cover", borderRadius: 2 }} />}
              </div>
              <h1 style={{ fontSize: "var(--text-display-lg)", margin: 0 }}>{t.name}</h1>
              {t.services.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {t.services.slice(0, 8).map((s) => (
                    <Badge key={s} tone="brand">{s}</Badge>
                  ))}
                </div>
              )}
            </div>

            <Tabs variant="underline" value={tab} onChange={setTab} items={[
              { id: "about", label: "About" }, { id: "treatments", label: "Treatments" },
            ]} />

            {tab === "about" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-body)", color: "var(--text-muted)", maxWidth: 620, whiteSpace: "pre-line" }}>
                  {t.bio}
                </p>
                <Notice tone="brand" title="Strictly professional">
                  Every appointment is a qualified therapeutic treatment. Any other request ends the booking.
                </Notice>
              </div>
            )}

            {tab === "treatments" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {TREATMENTS.map((tr) => (
                  <Card key={tr.slug} padding="md" style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                    <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--surface-accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                      <Icon name={tr.icon} size={19} color="var(--emerald-700)" />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-xs)", fontWeight: 600 }}>{tr.name} Massage</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>{tr.duration}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--emerald-700)" }}>{tr.price}</span>
                    <Button size="sm" variant="secondary" onClick={() => onBook(t)}>Book</Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter columns={D.footer} contact={[
        { icon: "phone", label: CONTACT.phone, href: CONTACT.phoneHref },
        { icon: "messageCircle", label: "WhatsApp", href: CONTACT.whatsappHref },
        { icon: "mail", label: CONTACT.email, href: `mailto:${CONTACT.email}` },
      ]}
        legal={`© 2026 Perfect London Massage · Strictly professional therapeutic service · ${CONTACT.phone}`} />
    </div>
  );
}
