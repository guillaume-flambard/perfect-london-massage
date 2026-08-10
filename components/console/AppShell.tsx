"use client";

import * as React from "react";
import { Logo } from "@/ds/components/core/Logo.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { Badge } from "@/ds/components/core/Badge.tsx";
import { Switch } from "@/ds/components/forms/Switch.tsx";
import { IconButton } from "@/ds/components/core/IconButton.tsx";

export type ConsoleView = "today" | "schedule" | "earnings" | "profile";

const NAV: { id: ConsoleView; label: string; icon: string }[] = [
  { id: "today", label: "Today", icon: "layoutDashboard" },
  { id: "schedule", label: "Schedule", icon: "calendarDays" },
  { id: "earnings", label: "Earnings", icon: "wallet" },
  { id: "profile", label: "Profile", icon: "user" },
];

interface SidebarProps {
  view: ConsoleView;
  onChange: (v: ConsoleView) => void;
  online: boolean;
  setOnline: (v: boolean) => void;
}

export function Sidebar({ view, onChange, online, setOnline }: SidebarProps) {
  return (
    <aside style={{ width: 248, flex: "none", background: "var(--surface-inverse-deep)", display: "flex", flexDirection: "column", padding: "var(--space-6) var(--space-4)", gap: "var(--space-8)" }}>
      <div style={{ padding: "0 var(--space-2)" }}>
        <Logo tone="inverse" stacked size="sm" />
      </div>
      <div style={{ padding: "var(--space-4)", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,.06)", display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-400)", fontWeight: 600 }}>
          Dispatch status
        </span>
        <Switch
          checked={online}
          onChange={() => setOnline(!online)}
          label={<span style={{ color: "var(--cream-100)" }}>{online ? "Accepting jobs" : "Off duty"}</span>}
        />
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              style={{
                display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", borderRadius: "var(--radius-sm)",
                background: active ? "rgba(255,255,255,.10)" : "transparent", border: "none", cursor: "pointer", textAlign: "left",
                color: active ? "var(--cream-100)" : "var(--emerald-300)",
                fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: active ? 600 : 500,
                transition: "var(--transition-control)",
              }}
            >
              <Icon name={it.icon} size={18} color={active ? "var(--gold-400)" : "var(--emerald-300)"} />
              {it.label}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "var(--space-3)", color: "var(--emerald-300)", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>
        <Icon name="logOut" size={16} /> Sign out
      </div>
    </aside>
  );
}

export function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)", padding: "var(--space-6) var(--space-8)", borderBottom: "1px solid var(--border-soft)", background: "var(--surface-page)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-display-sm)", margin: 0 }}>{title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 4 }}>{subtitle}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <IconButton icon="bell" label="Notifications" variant="outline" />
        <IconButton icon="settings" label="Settings" variant="outline" />
        <Badge tone="brand" icon="badgeCheck">Verified</Badge>
      </div>
    </header>
  );
}
