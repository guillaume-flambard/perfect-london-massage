"use client";

import * as React from "react";
import { Logo } from "@/ds/components/core/Logo.tsx";
import { Button } from "@/ds/components/core/Button.tsx";
import { Input } from "@/ds/components/forms/Input.tsx";
import { Field } from "@/ds/components/forms/Field.tsx";
import { Notice } from "@/ds/components/overlay/Notice.tsx";
import { TherapistConsole } from "@/components/console/TherapistConsole";
import { CONSOLE_DEMO_PIN, isConsoleAuthed, setConsoleAuthed, clearConsoleAuth } from "@/lib/console-auth";

export function ConsoleGate() {
  const [authed, setAuthed] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!isConsoleAuthed()) return;
    const id = window.setTimeout(() => setAuthed(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === CONSOLE_DEMO_PIN) {
      setConsoleAuthed();
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authed) {
    return (
      <>
        <TherapistConsole />
        <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 90 }}>
          <Button variant="secondary" size="sm" onClick={() => { clearConsoleAuth(); setAuthed(false); }} iconLeft="logOut">
            Exit demo
          </Button>
        </div>
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--surface-page-alt)", padding: "var(--space-6)" }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 380, background: "var(--surface-card)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Logo size="md" />
        </div>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 style={{ fontSize: "var(--text-display-sm)", margin: 0 }}>Therapist Console</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)", margin: 0 }}>
            Restricted area — invitation only.
          </p>
        </div>
        <Field label="Access code" error={error ? "Incorrect code." : undefined}>
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="••••" type="text" iconLeft="lock" />
        </Field>
        {error && (
          <Notice tone="warning" title="Access denied">
            This code is not valid. Please contact the administrator.
          </Notice>
        )}
        <Button type="submit" variant="gold" fullWidth iconRight="arrowRight">Enter the console</Button>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-subtle)", textAlign: "center", margin: 0 }}>
          Demo — sample data, no real payments.
        </p>
      </form>
    </div>
  );
}
