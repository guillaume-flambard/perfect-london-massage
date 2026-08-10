import * as React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../core/Icon.tsx';

export interface TabItem { id: string; label: string; icon?: string }

/** Switches between treatment categories or profile sections. */
export interface TabsProps {
  items?: Array<string | TabItem>;
  value?: string;
  onChange?: (id: string) => void;
  /** pill = sunken track with a white active pill · underline = gold rule under the active tab */
  variant?: 'pill' | 'underline';
  style?: React.CSSProperties;
}


interface Indicator { x: number; y: number; w: number; h: number }

export function Tabs({ items = [], value, onChange, variant = 'pill', style }: TabsProps) {
  const pill = variant === 'pill';
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = useState<Indicator | null>(null);

  useLayoutEffect(() => {
    if (!pill) return;
    const list = listRef.current;
    const activeEl = value ? btnRefs.current[value] : null;
    if (!list || !activeEl) return;
    setInd({ x: activeEl.offsetLeft, y: activeEl.offsetTop, w: activeEl.offsetWidth, h: activeEl.offsetHeight });
  }, [value, pill, items]);

  return (
    <div ref={listRef} role="tablist" style={{
      position: 'relative', display: 'inline-flex', gap: pill ? 6 : 'var(--space-8)', flexWrap: 'wrap',
      padding: pill ? 5 : 0, borderRadius: 'var(--radius-pill)',
      background: pill ? 'var(--surface-sunken)' : 'transparent',
      borderBottom: pill ? 'none' : '1px solid var(--border-soft)', ...style,
    }}>
      {pill && ind && (
        <span aria-hidden style={{
          position: 'absolute', left: 0, top: 0, width: ind.w, height: ind.h,
          transform: `translate(${ind.x}px, ${ind.y}px)`,
          background: 'var(--surface-card)', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-xs)',
          transition: 'transform var(--duration-base) var(--ease-out), width var(--duration-base) var(--ease-out), height var(--duration-base) var(--ease-out)',
        }} />
      )}
      {items.map((it) => {
        const item = typeof it === 'string' ? { id: it, label: it } : it;
        const selected = value === item.id;
        return (
          <button key={item.id} ref={(el) => { btnRefs.current[item.id] = el; }} role="tab" aria-selected={selected} onClick={() => onChange && onChange(item.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer',
              padding: pill ? '10px 20px' : '0 0 14px',
              borderRadius: pill ? 'var(--radius-pill)' : 0,
              position: 'relative', zIndex: 1,
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              borderBottom: pill ? 'none' : `2px solid ${selected ? 'var(--gold-500)' : 'transparent'}`,
              marginBottom: pill ? 0 : -1,
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: selected ? 'var(--weight-semibold)' : 'var(--weight-medium)',
              color: selected ? 'var(--emerald-700)' : 'var(--text-muted)',
              transition: 'var(--transition-control)',
            }}>
            {item.icon && <Icon name={item.icon} size={16} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
