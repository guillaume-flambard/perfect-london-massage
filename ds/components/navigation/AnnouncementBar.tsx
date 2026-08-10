import * as React from 'react';
import { Icon } from '../core/Icon.tsx';

export interface AnnouncementItem { label: string; icon?: string }

/** The thin strip above the header: coverage, availability, entry price. */
export interface AnnouncementBarProps {
  items?: Array<string | AnnouncementItem>;
  tone?: 'emerald' | 'gold';
  style?: React.CSSProperties;
}


export function AnnouncementBar({ items = [], tone = 'emerald', style }: AnnouncementBarProps) {
  const skins = {
    emerald: { background: 'var(--surface-inverse-deep)', color: 'var(--text-inverse-muted)', dot: 'var(--gold-500)' },
    gold: { background: 'var(--surface-gold-soft)', color: 'var(--gold-700)', dot: 'var(--gold-600)' },
  };
  const s = skins[tone] || skins.emerald;
  return (
    <div style={{ background: s.background, color: s.color, animation: 'plm-drop var(--duration-slow) var(--ease-entrance)', ...style }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '10px var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)',
        flexWrap: 'wrap', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', lineHeight: 1.4,
      }}>
        {items.map((it, i) => {
          const item = typeof it === 'string' ? { label: it } : it;
          return (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              {i > 0 && <span aria-hidden style={{ width: 4, height: 4, borderRadius: '50%', background: s.dot, marginRight: 'var(--space-4)' }} />}
              {item.icon && <Icon name={item.icon} size={14} color={s.dot} />}
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
