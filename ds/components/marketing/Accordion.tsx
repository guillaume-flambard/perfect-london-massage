import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../core/Icon.tsx';

export interface AccordionItem { question: string; answer: React.ReactNode }

/** The FAQ list — hygiene, towels, conduct policy, payment. */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Index open on mount; -1 for all closed. Default 0. */
  defaultOpen?: number;
  style?: React.CSSProperties;
}


export function Accordion({ items = [], defaultOpen = 0, style }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} style={{ borderBottom: '1px solid var(--border-soft)' }}>
            <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-6)',
                padding: 'var(--space-5) 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-xs)', fontWeight: 'var(--weight-display-strong)',
                color: isOpen ? 'var(--emerald-700)' : 'var(--text-body)', lineHeight: 1.3,
              }}>{item.question}</span>
              <span style={{
                width: 32, height: 32, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isOpen ? 'var(--emerald-700)' : 'var(--cream-200)',
                transition: 'var(--transition-control)',
              }}>
                <Icon name={isOpen ? 'minus' : 'plus'} size={16} color={isOpen ? 'var(--cream-100)' : 'var(--emerald-700)'} />
              </span>
            </button>
            <div style={{
              maxHeight: isOpen ? 400 : 0, overflow: 'hidden',
              transition: `max-height var(--duration-slow) var(--ease-out), opacity var(--duration-base) var(--ease-out)`,
              opacity: isOpen ? 1 : 0,
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)', padding: '0 var(--space-16) var(--space-6) 0', maxWidth: 640,
              }}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
