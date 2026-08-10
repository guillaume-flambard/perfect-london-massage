import * as React from 'react';
import { useState } from 'react';
import { Icon } from './Icon.tsx';

export interface IconButtonProps {
  /** Icon name from the Icon set. */
  icon: string;
  /** Required accessible label. */
  label: string;
  variant?: 'ghost' | 'outline' | 'solid' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}


const SIZES = { sm: { box: 34, icon: 16 }, md: { box: 42, icon: 19 }, lg: { box: 52, icon: 22 } };

export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, onClick, style, ...rest }: IconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const skins = {
    ghost: { background: hovered ? 'var(--cream-200)' : 'transparent', color: 'var(--text-body)', border: '1px solid transparent' },
    outline: { background: hovered ? 'var(--cream-200)' : 'var(--surface-card)', color: 'var(--text-brand)', border: '1px solid var(--border-strong)' },
    solid: { background: hovered ? 'var(--action-primary-hover)' : 'var(--action-primary)', color: 'var(--text-inverse)', border: '1px solid transparent' },
    inverse: { background: hovered ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.06)', color: 'var(--text-inverse)', border: '1px solid var(--border-inverse)' },
  };
  return (
    <button
      type="button" aria-label={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: s.box, height: s.box, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0,
        opacity: disabled ? 0.42 : 1, transition: 'var(--transition-control)', ...skins[variant], ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.icon} />
    </button>
  );
}
