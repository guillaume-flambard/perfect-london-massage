import * as React from 'react';
import { IconButton } from '../core/IconButton.tsx';

export interface DrawerProps {
  open?: boolean;
  title?: React.ReactNode;
  /** Small gold uppercase kicker above the title. */
  eyebrow?: string;
  children?: React.ReactNode;
  /** Sticky footer area — usually the submit + WhatsApp buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  side?: 'right' | 'left';
  style?: React.CSSProperties;
}


export function Drawer({ open, title, eyebrow, children, footer, onClose, width = 460, side = 'right', style }: DrawerProps) {
  return (
    <div aria-hidden={!open} style={{
      position: 'absolute', inset: 0, zIndex: 60, pointerEvents: open ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'var(--surface-overlay)',
        opacity: open ? 1 : 0, transition: `opacity var(--duration-base) var(--ease-out)`,
      }} />
      <aside role="dialog" aria-modal="true" style={{
        position: 'absolute', top: 0, bottom: 0, [side]: 0, width, maxWidth: '100%',
        background: 'var(--surface-page)', boxShadow: 'var(--shadow-drawer)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : `translateX(${side === 'right' ? '100%' : '-100%'})`,
        transition: `transform var(--duration-slow) var(--ease-entrance)`, ...style,
      }}>
        <header style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)',
          padding: 'var(--space-6)', borderBottom: '1px solid var(--border-soft)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {eyebrow && <span style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
              letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--gold-700)',
            }}>{eyebrow}</span>}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-sm)', margin: 0, fontWeight: 'var(--weight-display)' }}>{title}</h3>
          </div>
          <IconButton icon="x" label="Close" variant="ghost" onClick={onClose} />
        </header>
        <div style={{
          flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
          opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
        }}>
          {children}
        </div>
        {footer && (
          <footer style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--border-soft)', background: 'var(--surface-card)' }}>
            {footer}
          </footer>
        )}
      </aside>
    </div>
  );
}
