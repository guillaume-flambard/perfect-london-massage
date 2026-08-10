import * as React from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'brand' | 'inverse' | 'ink';
  /** Stack "Massage" beneath "Perfect London" — for footers and mobile menus. */
  stacked?: boolean;
  style?: React.CSSProperties;
}


/**
 * No brand mark was supplied for Perfect London Massage, so the logo is the name
 * set in the display serif. Do not invent a symbol — swap this for the real
 * lockup when the client provides one.
 */
export function Logo({ size = 'md', tone = 'brand', stacked = false, style }: LogoProps) {
  const sizes = { sm: 17, md: 21, lg: 30 };
  const fs = sizes[size] || sizes.md;
  const colors = {
    brand: { main: 'var(--emerald-700)', accent: 'var(--gold-700)' },
    inverse: { main: 'var(--cream-100)', accent: 'var(--gold-400)' },
    ink: { main: 'var(--ink-900)', accent: 'var(--gold-700)' },
  };
  const c = colors[tone] || colors.brand;
  return (
    <span style={{
      display: 'inline-flex', flexDirection: stacked ? 'column' : 'row', alignItems: stacked ? 'flex-start' : 'baseline',
      gap: stacked ? 2 : '0.28em', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display-strong)',
      fontSize: fs, lineHeight: 1.05, letterSpacing: '-0.01em', color: c.main, ...style,
    }}>
      <span>Perfect London</span>
      <span style={{
        fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)', color: c.accent,
        fontSize: fs * 0.42, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
        transform: stacked ? 'none' : 'translateY(-0.15em)',
      }}>Massage</span>
    </span>
  );
}
