import * as React from 'react';
import { Icon } from '../core/Icon.tsx';

export interface NoticeProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  tone?: 'info' | 'success' | 'warning' | 'brand';
  /** Overrides the tone's default icon. */
  icon?: string;
  style?: React.CSSProperties;
}


const TONES = {
  info: { bg: 'var(--info-100)', fg: 'var(--info-600)', icon: 'info' },
  success: { bg: 'var(--success-100)', fg: 'var(--success-600)', icon: 'circleCheckBig' },
  warning: { bg: 'var(--warning-100)', fg: 'var(--warning-600)', icon: 'info' },
  brand: { bg: 'var(--surface-accent-soft)', fg: 'var(--emerald-700)', icon: 'shieldCheck' },
};

export function Notice({ children, title, tone = 'brand', icon, style }: NoticeProps) {
  const t = TONES[tone] || TONES.brand;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
      background: t.bg, color: t.fg, padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', ...style,
    }}>
      <Icon name={icon || t.icon} size={20} style={{ marginTop: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {title && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)' }}>{title}</span>}
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)' }}>{children}</span>
      </div>
    </div>
  );
}
