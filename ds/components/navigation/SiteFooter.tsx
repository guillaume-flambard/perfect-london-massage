import * as React from 'react';
import { Logo } from '../core/Logo.tsx';
import { Icon } from '../core/Icon.tsx';

export interface FooterColumn { title: string; links: string[] }
export interface FooterContact { label: string; icon: string; href?: string }

/** Deep-emerald footer: wordmark, positioning line, direct contact, link columns, legal strip. */
export interface SiteFooterProps {
  columns?: FooterColumn[];
  /** WhatsApp / phone / email direct lines. */
  contact?: FooterContact[];
  legal?: React.ReactNode;
  style?: React.CSSProperties;
}


export function SiteFooter({ columns = [], contact = [], legal, style }: SiteFooterProps) {
  return (
    <footer style={{ background: 'var(--surface-inverse-deep)', color: 'var(--text-inverse-muted)', ...style }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-20) var(--gutter) var(--space-10)',
        display: 'grid', gridTemplateColumns: `1.4fr repeat(${Math.max(columns.length, 1)}, minmax(140px, 1fr))`, gap: 'var(--space-12)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 300 }}>
          <Logo tone="inverse" stacked size="lg" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--emerald-300)' }}>
            Qualified mobile massage therapists, dispatched across central London to homes, hotels and offices.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {contact.map((c) => (
              <a key={c.label} href={c.href || '#'} style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--cream-100)',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', textDecoration: 'none',
              }}>
                <Icon name={c.icon} size={16} color="var(--gold-400)" />{c.label}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
              letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--gold-400)',
            }}>{col.title}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {col.links.map((l) => (
                <a key={l} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--emerald-200)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.10)' }}>
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-5) var(--gutter)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--emerald-300)',
        }}>{legal}</div>
      </div>
    </footer>
  );
}
