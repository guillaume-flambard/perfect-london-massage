"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/ds/components/core/Icon.tsx";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value?: string;
  defaultValue?: string;
  options?: (string | DropdownOption)[];
  placeholder?: string;
  iconLeft?: string;
  onChange?: (value: string) => void;
  id?: string;
  label?: string;
}

export function Dropdown({ value, defaultValue, options = [], placeholder = "Select", iconLeft, onChange, id, label }: DropdownProps) {
  const norm: DropdownOption[] = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? null);
  const current = value !== undefined ? value : internal;
  const selected = norm.find((o) => o.value === current);
  const [active, setActive] = React.useState(Math.max(0, norm.findIndex((o) => o.value === current)));
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [pos, setPos] = React.useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);

  const place = React.useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const up = below < 200 && above > below;
    setPos({ left: r.left, width: r.width, top: up ? undefined : r.bottom + 6, bottom: up ? window.innerHeight - r.top + 6 : undefined, maxHeight: Math.min(264, Math.max(140, up ? above : below)) });
  }, []);

  React.useLayoutEffect(() => { if (open) place(); }, [open, place]);

  React.useEffect(() => {
    if (!open) return;
    const h = () => place();
    window.addEventListener("resize", h);
    window.addEventListener("scroll", h, true);
    return () => { window.removeEventListener("resize", h); window.removeEventListener("scroll", h, true); };
  }, [open, place]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (listRef.current && listRef.current.contains(e.target as Node)) return;
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  React.useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[active] as HTMLElement | undefined;
      if (el) listRef.current.scrollTop = Math.max(0, el.offsetTop - listRef.current.clientHeight / 2 + el.offsetHeight / 2);
    }
  }, [open, active]);

  const pick = (o: DropdownOption) => { setInternal(o.value); setOpen(false); if (onChange) onChange(o.value); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive((i) => (e.key === "ArrowDown" ? Math.min(norm.length - 1, i + 1) : Math.max(0, i - 1)));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && norm[active]) pick(norm[active]); else setOpen(true);
    } else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); }
  };

  const ring = focused || open ? "0 0 0 4px rgba(197,160,89,.42)" : "none";

  const listboxId = `${id ?? "dropdown"}-listbox`;

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      <button type="button" id={id} role="combobox" aria-expanded={open} aria-controls={listboxId} aria-haspopup="listbox" aria-label={label}
        onClick={() => setOpen((o) => !o)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onKeyDown={onKeyDown}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%", minHeight: 48, textAlign: "left",
          background: "var(--surface-card)", cursor: "pointer",
          border: `1px solid ${open || focused ? "var(--emerald-500)" : "var(--border-hairline)"}`,
          borderRadius: "var(--radius-md)", padding: "12px 16px", boxShadow: ring,
          transition: "var(--transition-control)", outline: "none",
          fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
          color: selected ? "var(--text-body)" : "var(--text-subtle)",
        }}>
        {iconLeft && <Icon name={iconLeft} size={17} color="var(--ink-500)" />}
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected ? selected.label : placeholder}</span>
        <Icon name="chevronDown" size={17} color="var(--ink-500)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-out)" }} />
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <ul ref={listRef} id={listboxId} role="listbox" tabIndex={-1} style={{
          position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, zIndex: 200, margin: 0, padding: 6,
          listStyle: "none", maxHeight: pos.maxHeight, overflowY: "auto",
          background: "var(--surface-card)", border: "1px solid var(--border-soft)",
          borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)",
        }}>
          {norm.map((o, i) => {
            const isSel = o.value === current;
            return (
              <li key={o.value} role="option" aria-selected={isSel}
                onMouseEnter={() => setActive(i)} onClick={() => pick(o)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: "10px 12px", cursor: "pointer",
                  borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
                  color: isSel ? "var(--emerald-700)" : "var(--text-body)", fontWeight: isSel ? "var(--weight-semibold)" : 400,
                  background: active === i ? "var(--cream-200)" : "transparent",
                  transition: "background var(--duration-fast) var(--ease-out)",
                }}>
                <span style={{ flex: 1 }}>{o.label}</span>
                {isSel && <Icon name="check" size={16} color="var(--emerald-600)" />}
              </li>
            );
          })}
        </ul>, document.body
      )}
    </div>
  );
}
