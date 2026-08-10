"use client";

import * as React from "react";
import { Card } from "@/ds/components/core/Card.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Badge } from "@/ds/components/core/Badge.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { Drawer } from "@/ds/components/overlay/Drawer.tsx";
import { Field } from "@/ds/components/forms/Field.tsx";
import { Select } from "@/ds/components/forms/Select.tsx";
import { Textarea } from "@/ds/components/forms/Textarea.tsx";
import { Switch } from "@/ds/components/forms/Switch.tsx";
import { Rating } from "@/ds/components/core/Rating.tsx";
import { ImagePlaceholder } from "@/ds/components/core/ImagePlaceholder.tsx";
import { Tabs } from "@/ds/components/navigation/Tabs.tsx";
import { Sidebar, Topbar, type ConsoleView } from "@/components/console/AppShell";
import { JobCard } from "@/components/console/JobCard";
import { Stat } from "@/components/console/Stat";
import { CONSOLE_DATA, WEEK, type Job } from "@/lib/console-data";

const TITLES: Record<ConsoleView, [string, string]> = {
  today: ["Today", "You are accepting jobs. Two sessions booked today."],
  schedule: ["Schedule", "Everything booked over the next seven days."],
  earnings: ["Earnings", "Payouts run every Friday for the week just finished."],
  profile: ["Profile", "What clients see before they book you."],
};

export function TherapistConsole() {
  const D = CONSOLE_DATA;
  const [view, setView] = React.useState<ConsoleView>("today");
  const [online, setOnline] = React.useState(true);
  const [job, setJob] = React.useState<Job | null>(null);
  const [tab, setTab] = React.useState("upcoming");
  const [jobs, setJobs] = React.useState<Job[]>(D.jobs);

  const acceptJob = (j: Job) => {
    setJobs((prev) => prev.map((x) => (x.id === j.id ? { ...x, status: "confirmed", eta: "On the way · 25 min away" } : x)));
  };
  const declineJob = (j: Job) => {
    setJobs((prev) => prev.filter((x) => x.id !== j.id));
  };

  const [title, subtitle] = TITLES[view];

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative", background: "var(--surface-page-alt)" }}>
      <Sidebar view={view} onChange={setView} online={online} setOnline={setOnline} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar title={title} subtitle={subtitle} />
        <main style={{ flex: 1, padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {view === "today" && (
            <>
              {!online && <Notice tone="warning" title="Off duty">Turn dispatch back on to receive new bookings.</Notice>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
                {D.earnings.map((e) => <Stat key={e.label} {...e} />)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr .6fr", gap: "var(--space-6)", alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {jobs.map((j) => (
                    <JobCard key={j.id} job={j} onOpen={setJob} onAccept={acceptJob} onDecline={declineJob} />
                  ))}
                </div>
                <Card padding="lg" tone="inverse" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-400)", fontWeight: 600 }}>Next session</span>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-md)", color: "var(--text-inverse)", lineHeight: 1.1 }}>18:30 · Chelsea</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-inverse-muted)", lineHeight: 1.6 }}>
                    Deep tissue, 60 minutes. Leave in about 25 minutes to arrive ten minutes early.
                  </p>
                  <Button variant="gold" fullWidth iconRight="arrowRight">Start navigation</Button>
                  <Button variant="inverse-outline" fullWidth iconLeft="messageCircle">Message Helena</Button>
                </Card>
              </div>
            </>
          )}

          {view === "schedule" && (
            <>
              <Tabs value={tab} onChange={setTab} items={[{ id: "upcoming", label: "Upcoming" }, { id: "past", label: "Past" }]} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "var(--space-3)" }}>
                {WEEK.map((d, i) => (
                  <Card key={d} padding="sm" style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 190 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600, color: i === 0 ? "var(--emerald-700)" : "var(--text-subtle)" }}>{d}</span>
                    {jobs.slice(0, (i % 3) + 1).map((j) => (
                      <button key={j.id} onClick={() => setJob(j)} style={{ textAlign: "left", border: "none", cursor: "pointer", background: j.status === "pending" ? "var(--warning-100)" : "var(--surface-accent-soft)", borderRadius: "var(--radius-sm)", padding: "8px 9px" }}>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 700, color: "var(--emerald-700)" }}>{j.time.slice(0, 5)}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{j.treatment.split(" · ")[0]}</div>
                      </button>
                    ))}
                  </Card>
                ))}
              </div>
            </>
          )}

          {view === "earnings" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
                {D.earnings.map((e) => <Stat key={e.label} {...e} />)}
              </div>
              <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-xs)", fontWeight: 600 }}>Recent sessions</span>
                {jobs.map((j) => (
                  <div key={j.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-3) 0", borderTop: "1px solid var(--border-soft)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>{j.client} · {j.treatment}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>{j.place.split(",")[0]}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--emerald-700)" }}>{j.fee}</span>
                  </div>
                ))}
              </Card>
              <Notice tone="info" title="Payouts">Sessions completed before Thursday midnight are paid the following Friday by bank transfer.</Notice>
            </>
          )}

          {view === "profile" && (
            <div style={{ display: "grid", gridTemplateColumns: ".7fr 1.3fr", gap: "var(--space-6)", alignItems: "start" }}>
              <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <ImagePlaceholder label="Your portrait — warm light, plain background" ratio="4 / 5" />
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)" }}>{D.therapist.name}</div>
                <Rating value={D.therapist.rating} count={D.therapist.reviews} />
                <Button variant="secondary" fullWidth>Replace photo</Button>
              </Card>
              <Card padding="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                <Field label="Specialisms">
                  <Select defaultValue="Deep tissue" iconLeft="leaf" options={["Deep tissue", "Sports", "Swedish", "Thai"]} />
                </Field>
                <Field label="About you" hint="Two or three sentences. Clients read this before booking.">
                  <Textarea rows={4} defaultValue="Trained in sports and deep tissue work, with nine years treating desk-bound shoulders and marathon legs across central London." />
                </Field>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Badge tone="brand" icon="badgeCheck">Level 4 Diploma</Badge>
                  <Badge tone="brand" icon="shieldCheck">Insured to £5m</Badge>
                  <Badge tone="brand" icon="badgeCheck">DBS checked 2025</Badge>
                </div>
                <Switch checked label="Show me in the featured therapists grid" onChange={() => {}} />
                <div><Button variant="gold">Save profile</Button></div>
              </Card>
            </div>
          )}
        </main>
      </div>

      <Drawer
        open={!!job}
        onClose={() => setJob(null)}
        eyebrow="Booking"
        title={job ? `${job.time} · ${job.client}` : ""}
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Button variant="gold" fullWidth iconRight="arrowRight">Start navigation</Button>
            <Button variant="secondary" fullWidth iconLeft="messageCircle">Message client</Button>
          </div>
        }
      >
        {job && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge tone={job.status === "pending" ? "warning" : "success"}>{job.status === "pending" ? "Awaiting reply" : "Confirmed"}</Badge>
              <Badge tone="gold">{job.fee}</Badge>
            </div>
            <Card padding="md" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([["Treatment", job.treatment], ["Address", job.place], ["Travel", job.eta]] as [string, string][]).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--text-subtle)" }}>{k}</span><span style={{ fontWeight: 600, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </Card>
            <Notice tone="brand" title="Client notes">{job.notes}</Notice>
            <Notice tone="info">Bring your own table and linen. Payment is collected at the end of the session.</Notice>
          </>
        )}
      </Drawer>
    </div>
  );
}
