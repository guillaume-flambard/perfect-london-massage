import * as React from 'react';
import { Icon } from '../core/Icon.tsx';

export interface StepCardProps {
  /** 1-based; rendered zero-padded ("01"). */
  step: number | string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: string;
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}


export function StepCard({ step, title, description, icon, tone = 'default', style }: StepCardProps) {
  const inverse = tone === 'inverse';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-sm)', lineHeight: 1,
          fontWeight: 'var(--weight-display)', color: inverse ? 'var(--gold-400)' : 'var(--gold-600)',
        }}>{String(step).padStart(2, '0')}</span>
        <span style={{ flex: 1, height: 1, background: inverse ? 'rgba(255,255,255,.16)' : 'var(--border-soft)' }} />
        {icon && <Icon name={icon} size={20} color={inverse ? 'var(--emerald-300)' : 'var(--emerald-500)'} />}
      </div>
      <h4 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-xs)', margin: 0,
        fontWeight: 'var(--weight-display-strong)', color: inverse ? 'var(--text-inverse)' : 'var(--text-body)',
      }}>{title}</h4>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)',
        color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
      }}>{description}</p>
    </div>
  );
}
