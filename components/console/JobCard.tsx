"use client";

import * as React from "react";
import { Card } from "@/ds/components/core/Card.tsx";
import { Badge } from "@/ds/components/core/Badge.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Icon } from "@/ds/components/core/Icon.tsx";
import type { Job } from "@/lib/console-data";

interface JobCardProps {
  job: Job;
  onOpen: (job: Job) => void;
  onAccept?: (job: Job) => void;
  onDecline?: (job: Job) => void;
  compact?: boolean;
}

export function JobCard({ job, onOpen, onAccept, onDecline, compact }: JobCardProps) {
  const pending = job.status === "pending";
  return (
    <Card padding="md" interactive onClick={() => onOpen(job)} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <Icon name={job.type} size={20} color="var(--emerald-700)" />
          </span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-xs)", fontWeight: 600 }}>{job.time} · {job.client}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{job.treatment}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge tone={pending ? "warning" : "success"} icon={pending ? "clock" : "circleCheckBig"}>
            {pending ? "Awaiting reply" : "Confirmed"}
          </Badge>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", fontWeight: 700, color: "var(--emerald-700)" }}>{job.fee}</span>
        </div>
      </div>
      {!compact && (
        <div style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-soft)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            <Icon name="mapPin" size={14} />{job.place}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            <Icon name="car" size={14} />{job.eta}
          </span>
        </div>
      )}
      {pending && (onAccept || onDecline) && (
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          {onAccept && (
            <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); onAccept(job); }}>Accept</Button>
          )}
          {onDecline && (
            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onDecline(job); }}>Decline</Button>
          )}
        </div>
      )}
    </Card>
  );
}
