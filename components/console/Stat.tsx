"use client";

import { Card } from "@/ds/components/core/Card.tsx";
import type { EarningsStat } from "@/lib/console-data";

export function Stat({ label, value, meta }: EarningsStat) {
  return (
    <Card padding="md" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--gold-700)", fontWeight: 600 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)", lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>{meta}</span>
    </Card>
  );
}
