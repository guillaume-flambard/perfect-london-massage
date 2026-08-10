import * as React from 'react';
import { useState } from 'react';
import { Icon } from './Icon.tsx';

export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = emerald fill · gold = the one booking CTA · secondary = emerald outline · ghost = bare · inverse* = on emerald surfaces */
  variant?: 'primary' | 'gold' | 'secondary' | 'ghost' | 'inverse' | 'inverse-outline';
  size?: 'sm' | 'md' | 'lg';
  /** Icon name from the Icon set, placed before the label. */
  iconLeft?: string;
  /** Icon name placed after the label — usually "arrowRight". */
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Render as an anchor instead of a button. */
  as?: 'button' | 'a';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}


const SIZES = {
  sm: { padding: '9px 16px', fontSize: 'var(--text-xs)', icon: 15, gap: 7 },
  md: { padding: '13px 24px', fontSize: 'var(--text-sm)', icon: 17, gap: 9 },
  lg: { padding: '17px 34px', fontSize: 'var(--text-md)', icon: 19, gap: 10 },
};

function palette(variant: ButtonProps['variant'], hovered: boolean, pressed: boolean) {
  switch (variant) {
    case 'gold':
      return {
        background: pressed ? 'var(--action-gold-active)' : hovered ? 'var(--action-gold-hover)' : 'var(--action-gold)',
        color: 'var(--text-on-gold)', border: '1px solid transparent',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      };
    case 'secondary':
      return {
        background: hovered ? 'var(--emerald-100)' : 'transparent',
        color: 'var(--text-brand)', border: '1px solid var(--emerald-300)', boxShadow: 'none',
      };
    case 'ghost':
      return {
        background: hovered ? 'var(--cream-200)' : 'transparent',
        color: 'var(--text-body)', border: '1px solid transparent', boxShadow: 'none',
      };
    case 'inverse':
      return {
        background: hovered ? 'var(--cream-100)' : 'var(--white)',
        color: 'var(--emerald-800)', border: '1px solid transparent', boxShadow: 'none',
      };
    case 'inverse-outline':
      return {
        background: hovered ? 'rgba(255,255,255,.10)' : 'transparent',
        color: 'var(--text-inverse)', border: '1px solid var(--border-inverse)', boxShadow: 'none',
      };
    default:
      return {
        background: pressed ? 'var(--action-primary-active)' : hovered ? 'var(--action-primary-hover)' : 'var(--action-primary)',
        color: 'var(--text-inverse)', border: '1px solid transparent',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      };
  }
}

export function Button({
  children, variant = 'primary', size = 'md', iconLeft, iconRight,
  fullWidth = false, disabled = false, as = 'button', href, onClick, type = 'button', style, ...rest
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const p = palette(variant, hovered && !disabled, pressed && !disabled);
  const Tag = as === 'a' ? 'a' : 'button';
  return (
    <Tag
      href={href}
      type={Tag === 'button' ? type : undefined}
      disabled={Tag === 'button' ? disabled : undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: s.gap,
        fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)',
        fontSize: s.fontSize, letterSpacing: '0.02em', lineHeight: 1.1,
        padding: s.padding, borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: 'none', whiteSpace: 'nowrap',
        opacity: disabled ? 0.42 : 1,
        transform: pressed && !disabled ? 'scale(var(--press-scale))' : 'none',
        transition: 'var(--transition-control)', ...p, ...style,
      }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </Tag>
  );
}
