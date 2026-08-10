import * as React from 'react';

export interface SectionHeadingProps {
  /** Short uppercase kicker, e.g. "How it works". */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}


export function SectionHeading({ eyebrow, title, lede, align = 'left', tone = 'default', size = 'md', style }: SectionHeadingProps) {
  const inverse = tone === 'inverse';
  const titleSize = { sm: 'var(--text-display-xs)', md: 'var(--text-display-sm)', lg: 'var(--text-display-md)' }[size];
  return (
    <header style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
      maxWidth: align === 'center' ? 640 : 720, ...style,
    }}>
      {eyebrow && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
          color: inverse ? 'var(--gold-400)' : 'var(--gold-700)',
        }}>{eyebrow}</span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: titleSize,
        lineHeight: 'var(--leading-heading)', letterSpacing: 'var(--tracking-display)', margin: 0,
        color: inverse ? 'var(--text-inverse)' : 'var(--text-body)',
      }}>{title}</h2>
      {lede && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-body)',
          color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)', maxWidth: 560,
        }}>{lede}</p>
      )}
    </header>
  );
}
