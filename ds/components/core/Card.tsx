import * as React from 'react';
import { useState } from 'react';

export interface CardProps {
  children?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  tone?: 'default' | 'sunken' | 'inverse' | 'outline';
  /** Adds the hover lift + deeper shadow. Use for whole-card links. */
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}


export function Card({ children, padding = 'md', tone = 'default', interactive = false, onClick, style, ...rest }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--card-padding)', lg: 'var(--card-padding-lg)' };
  const tones = {
    default: { background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-soft)' },
    sunken: { background: 'var(--surface-sunken)', color: 'var(--text-body)', border: '1px solid var(--border-soft)' },
    inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)', border: '1px solid rgba(255,255,255,.08)' },
    outline: { background: 'transparent', color: 'var(--text-body)', border: '1px solid var(--border-hairline)' },
  };
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)', padding: pads[padding], overflow: 'hidden',
        boxShadow: interactive && hovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transform: interactive && hovered ? 'translateY(var(--lift-translate))' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'var(--transition-surface)', ...tones[tone], ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
