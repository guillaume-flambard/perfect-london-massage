import * as React from 'react';
import { useEffect, useState } from 'react';
import { Logo } from '../core/Logo.tsx';
import { Button } from '../core/Button.tsx';
import { IconButton } from '../core/IconButton.tsx';

export interface NavLink { id: string; label: string; href?: string }

/**
 * Sticky translucent header: wordmark, nav, and the one gold booking CTA.
 * @startingPoint section="Navigation" subtitle="Sticky header with the booking CTA" viewport="700x160"
 */
export interface SiteHeaderProps {
  links?: Array<string | NavLink>;
  /** id of the current page — underlined in gold. */
  active?: string;
  onNavigate?: (id: string) => void;
  onBook?: () => void;
  sticky?: boolean;
  /** Mobile layout: hamburger + drawer nav instead of inline links. */
  compact?: boolean;
  style?: React.CSSProperties;
}


export function SiteHeader({ links = [], active, onNavigate, onBook, sticky = true, compact = false, style }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled((window.scrollY || 0) > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  return (
    <header style={{
      position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 40,
      background: 'rgba(253,251,247,.86)', backdropFilter: 'var(--blur-veil)',
      WebkitBackdropFilter: 'var(--blur-veil)',
      borderBottom: '1px solid var(--border-soft)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'var(--shadow-none)',
      transition: 'box-shadow var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out)', ...style,
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: compact ? '12px var(--gutter)' : '18px var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)',
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} style={{ textDecoration: 'none' }}>
          <Logo size={compact ? 'sm' : 'md'} />
        </a>

        {!compact && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {links.map((l) => {
              const link = typeof l === 'string' ? { id: l, label: l } : l;
              const isActive = active === link.id;
              return (
                <a key={link.id} href={link.href || '#'}
                  onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(link.id); }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                    fontWeight: isActive ? 'var(--weight-semibold)' : 'var(--weight-medium)',
                    color: isActive ? 'var(--emerald-700)' : 'var(--text-muted)',
                    textDecoration: 'none', paddingBottom: 2, whiteSpace: 'nowrap',
                    borderBottom: `1.5px solid ${isActive ? 'var(--gold-500)' : 'transparent'}`,
                    transition: 'var(--transition-control)',
                  }}>{link.label}</a>
              );
            })}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Button variant="gold" size={compact ? 'sm' : 'md'} onClick={onBook}>Book a Session</Button>
          {compact && <IconButton icon={open ? 'x' : 'menu'} label="Menu" variant="outline" size="sm" onClick={() => setOpen(!open)} />}
        </div>
      </div>

      {compact && open && (
        <nav style={{ borderTop: '1px solid var(--border-soft)', padding: 'var(--space-4) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'var(--surface-page)' }}>
          {links.map((l) => {
            const link = typeof l === 'string' ? { id: l, label: l } : l;
            return (
              <a key={link.id} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate && onNavigate(link.id); }}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-body)', textDecoration: 'none' }}>{link.label}</a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
