import * as React from 'react';
import { Icon } from './Icon.tsx';

export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'brand' | 'gold' | 'success' | 'warning' | 'danger' | 'inverse';
  /** Optional leading icon name. */
  icon?: string;
  /** Uppercase + wide tracking, for eyebrow-style labels. */
  uppercase?: boolean;
  style?: React.CSSProperties;
}


const TONES = {
  neutral: { background: 'var(--cream-200)', color: 'var(--text-muted)', border: 'var(--border-soft)' },
  brand: { background: 'var(--surface-accent-soft)', color: 'var(--emerald-700)', border: 'var(--emerald-200)' },
  gold: { background: 'var(--surface-gold-soft)', color: 'var(--gold-700)', border: 'var(--gold-300)' },
  success: { background: 'var(--success-100)', color: 'var(--success-600)', border: 'transparent' },
  warning: { background: 'var(--warning-100)', color: 'var(--warning-600)', border: 'transparent' },
  danger: { background: 'var(--danger-100)', color: 'var(--danger-600)', border: 'transparent' },
  inverse: { background: 'rgba(255,255,255,.12)', color: 'var(--text-inverse)', border: 'var(--border-inverse)' },
};

export function Badge({ children, tone = 'neutral', icon, uppercase = false, style }: BadgeProps) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: uppercase ? '5px 11px' : '5px 12px',
      borderRadius: 'var(--radius-pill)', background: t.background, color: t.color,
      border: `1px solid ${t.border}`,
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-semibold)', lineHeight: 1.4,
      letterSpacing: uppercase ? 'var(--tracking-eyebrow)' : '0.02em',
      textTransform: uppercase ? 'uppercase' : 'none', whiteSpace: 'nowrap', ...style,
    }}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
