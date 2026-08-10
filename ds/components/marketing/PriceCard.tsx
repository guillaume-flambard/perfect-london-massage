import * as React from 'react';
import { Card } from '../core/Card.tsx';
import { Icon } from '../core/Icon.tsx';
import { Badge } from '../core/Badge.tsx';
import { Button } from '../core/Button.tsx';

export interface PriceCardProps {
  /** Eyebrow, e.g. "60 minutes". */
  title: string;
  /** Formatted price, e.g. "£65". */
  price: string;
  /** Unit suffix. Default "/hr". */
  unit?: string;
  /** Small print under the price, e.g. "Zones 1–3, no travel surcharge". */
  note?: string;
  features?: string[];
  /** Emerald fill + gold CTA + "Most booked" badge. One per row. */
  featured?: boolean;
  cta?: string;
  onSelect?: () => void;
  style?: React.CSSProperties;
}


export function PriceCard({ title, price, unit = '/hr', note, features = [], featured = false, cta = 'Book this', onSelect, style }: PriceCardProps) {
  return (
    <Card padding="lg" tone={featured ? 'inverse' : 'default'}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
          color: featured ? 'var(--gold-400)' : 'var(--gold-700)',
        }}>{title}</span>
        {featured && <Badge tone="gold" uppercase>Most booked</Badge>}
        </div>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-md)', lineHeight: 1,
            fontWeight: 'var(--weight-display)', color: featured ? 'var(--text-inverse)' : 'var(--text-body)',
          }}>{price}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: featured ? 'var(--emerald-300)' : 'var(--text-subtle)' }}>{unit}</span>
        </span>
        {note && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: featured ? 'var(--emerald-300)' : 'var(--text-subtle)' }}>{note}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {features.map((ft) => (
          <span key={ft} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.5, color: featured ? 'var(--text-inverse-muted)' : 'var(--text-muted)' }}>
            <Icon name="check" size={16} color={featured ? 'var(--gold-400)' : 'var(--emerald-500)'} style={{ marginTop: 2 }} />{ft}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Button variant={featured ? 'gold' : 'secondary'} fullWidth onClick={onSelect}>{cta}</Button>
      </div>
    </Card>
  );
}
