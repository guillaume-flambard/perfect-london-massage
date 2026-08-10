"use client";

export const CONSOLE_DEMO_PIN = "2026";
const STORAGE_KEY = "plm-console-auth";

export function isConsoleAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function setConsoleAuthed(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, "1");
}

export function clearConsoleAuth(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
