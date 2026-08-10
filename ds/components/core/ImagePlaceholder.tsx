import * as React from 'react';
import { Icon } from './Icon.tsx';

export interface ImagePlaceholderProps {
  /** What belongs here, e.g. "Therapist portrait — warm light". */
  label?: string;
  /** CSS aspect-ratio string. Ignored when height is set. */
  ratio?: string;
  shape?: 'rounded' | 'arch' | 'square' | 'pill' | 'circle';
  tone?: 'cream' | 'emerald';
  height?: number | string;
  style?: React.CSSProperties;
}


/** Marks where real photography goes. No stock art is shipped with this system. */
export function ImagePlaceholder({ label = 'Photography', ratio = '4 / 3', shape = 'rounded', tone = 'cream', height, style }: ImagePlaceholderProps) {
  const radii = { rounded: 'var(--radius-lg)', arch: 'var(--radius-arch)', square: '0', pill: 'var(--radius-pill)', circle: '50%' };
  const tones = {
    cream: { background: 'var(--cream-200)', color: 'var(--ink-500)', border: '1px dashed var(--cream-400)' },
    emerald: { background: 'var(--emerald-800)', color: 'var(--emerald-300)', border: '1px dashed rgba(255,255,255,.18)' },
  };
  const t = tones[tone] || tones.cream;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      aspectRatio: height ? undefined : ratio, height, width: '100%',
      borderRadius: radii[shape], overflow: 'hidden', ...t, ...style,
    }}>
      <Icon name="flower2" size={22} />
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', textAlign: 'center', padding: '0 12px',
      }}>{label}</span>
    </div>
  );
}
