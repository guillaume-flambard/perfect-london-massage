import * as React from 'react';
import { useState } from 'react';
import { Icon } from './Icon.tsx';

export interface ChipProps {
  children?: React.ReactNode;
  /** Optional leading icon name; renders gold when selected, emerald otherwise. */
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Omit to render a static reassurance chip. */
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}


export function Chip({ children, icon, selected = false, onClick, disabled = false, size = 'md', style }: ChipProps) {
  const [hovered, setHovered] = useState(false);
  const interactive = !!onClick && !disabled;
  const pad = size === 'sm' ? '7px 13px' : '10px 17px';
  return (
    <button
      type="button" disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      aria-pressed={onClick ? selected : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, padding: pad,
        borderRadius: 'var(--radius-pill)',
        background: selected ? 'var(--emerald-700)' : hovered && interactive ? 'var(--cream-200)' : 'var(--surface-card)',
        color: selected ? 'var(--text-inverse)' : 'var(--text-body)',
        border: `1px solid ${selected ? 'var(--emerald-700)' : 'var(--border-strong)'}`,
        fontFamily: 'var(--font-body)', fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)', lineHeight: 1.2, whiteSpace: 'nowrap',
        cursor: interactive ? 'pointer' : 'default', opacity: disabled ? 0.45 : 1,
        transition: 'var(--transition-control)', ...style,
      }}
    >
      {icon && <Icon name={icon} size={15} color={selected ? 'var(--gold-400)' : 'var(--emerald-600)'} />}
      {children}
    </button>
  );
}
