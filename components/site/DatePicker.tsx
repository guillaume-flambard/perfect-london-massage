"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/ds/components/core/Icon.tsx";
import { Button } from "@/ds/components/core/Button.tsx";

const PLM_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PLM_DOW = ["M", "T", "W", "T", "F", "S", "S"];
const PLM_SLOTS = ["As soon as possible", "18:00", "19:00", "20:00", "21:00", "22:00"];

interface DatePickerProps {
  iconLeft?: string;
  placeholder?: string;
  onChange?: (value: { date: Date; slot: string }) => void;
}

export function DatePicker({ iconLeft = "calendar", placeholder = "Today, as soon as possible", onChange }: DatePickerProps) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [cursor, setCursor] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = React.useState(today);
  const [slot, setSlot] = React.useState(PLM_SLOTS[0]);
  const [applied, setApplied] = React.useState<{ date: Date; slot: string } | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);

  const place = React.useCallback(() => {
    const el = rootRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const w = Math.min(340, window.innerWidth - 24);
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const up = above > below;
    setPos({ left: Math.max(12, Math.min(r.left, window.innerWidth - w - 12)), width: w, top: up ? undefined : r.bottom + 8, bottom: up ? window.innerHeight - r.top + 8 : undefined, maxHeight: Math.max(220, (up ? above : below) - 8) });
  }, []);

  React.useLayoutEffect(() => { if (open) place(); }, [open, place]);
  React.useEffect(() => {
    if (!open) return;
    const h = () => place();
    const onDoc = (e: MouseEvent) => {
      if (popRef.current && popRef.current.contains(e.target as Node)) return;
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("resize", h); window.addEventListener("scroll", h, true);
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("resize", h); window.removeEventListener("scroll", h, true); document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, place]);

  const isToday = (d: Date) => d.getTime() === today.getTime();
  const fmt = () => {
    if (!applied) return null;
    const d = applied.date;
    const day = isToday(d) ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    return applied.slot === PLM_SLOTS[0] ? `${day}, as soon as possible` : `${day}, ${applied.slot}`;
  };

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array<null>(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1))];
  const monthBack = new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1) >= new Date(today.getFullYear(), today.getMonth(), 1);

  const apply = () => { const v = { date, slot }; setApplied(v); setOpen(false); if (onChange) onChange(v); };

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%", minHeight: 48, textAlign: "left", cursor: "pointer",
          background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)",
          padding: "12px 16px", outline: "none", transition: "var(--transition-control)",
          boxShadow: open || focused ? "0 0 0 4px rgba(197,160,89,.28)" : "none",
          fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: applied ? "var(--text-body)" : "var(--text-subtle)",
        }}>
        <Icon name={iconLeft} size={17} color="var(--ink-500)" />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fmt() || placeholder}</span>
        <Icon name="chevronDown" size={17} color="var(--ink-500)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-out)" }} />
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <div ref={popRef} role="dialog" aria-label="Choose a date and time" style={{
          position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, zIndex: 200, maxHeight: pos.maxHeight,
          background: "var(--surface-card)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)", padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)", overflow: "hidden",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", overflowY: "auto", minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button type="button" aria-label="Previous month" disabled={!monthBack} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: "var(--radius-pill)", border: "1px solid var(--border-hairline)", background: "transparent", cursor: monthBack ? "pointer" : "not-allowed", opacity: monthBack ? 1 : 0.42 }}>
              <Icon name="chevronLeft" size={16} color="var(--ink-700)" />
            </button>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600 }}>{PLM_MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</span>
            <button type="button" aria-label="Next month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: "var(--radius-pill)", border: "1px solid var(--border-hairline)", background: "transparent", cursor: "pointer" }}>
              <Icon name="chevronRight" size={16} color="var(--ink-700)" />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {PLM_DOW.map((d, i) => (
              <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: ".08em", color: "var(--text-subtle)", padding: "4px 0" }}>{d}</span>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const past = d < today;
              const sel = d.getTime() === date.getTime();
              return (
                <button key={i} type="button" disabled={past} onClick={() => setDate(d)} aria-pressed={sel}
                  style={{
                    height: 38, borderRadius: "var(--radius-pill)", border: "none", cursor: past ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
                    fontWeight: sel || isToday(d) ? 600 : 400,
                    background: sel ? "var(--emerald-700)" : "transparent",
                    color: sel ? "var(--text-inverse)" : past ? "var(--text-subtle)" : "var(--text-body)",
                    opacity: past ? 0.42 : 1, transition: "background var(--duration-fast) var(--ease-out)",
                    boxShadow: !sel && isToday(d) ? "inset 0 0 0 1px var(--gold-500)" : "none",
                  }}>{d.getDate()}</button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-4)" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-700)" }}>Preferred time</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PLM_SLOTS.map((s) => {
                const on = s === slot;
                return (
                  <button key={s} type="button" onClick={() => setSlot(s)}
                    style={{
                      minHeight: 34, padding: "6px 14px", borderRadius: "var(--radius-pill)", cursor: "pointer",
                      border: `1px solid ${on ? "var(--emerald-700)" : "var(--border-hairline)"}`,
                      background: on ? "var(--emerald-700)" : "transparent", color: on ? "var(--text-inverse)" : "var(--text-body)",
                      fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: on ? 600 : 400,
                      transition: "var(--transition-control)",
                    }}>{s}</button>
                );
              })}
            </div>
          </div>
          </div>
          <Button variant="primary" fullWidth onClick={apply}>Apply</Button>
        </div>, document.body
      )}
    </div>
  );
}
