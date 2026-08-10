import * as React from 'react';
import { Card } from '../core/Card.tsx';
import { Icon } from '../core/Icon.tsx';
import { ImagePlaceholder } from '../core/ImagePlaceholder.tsx';

export interface TreatmentCardProps {
  name: string;
  description?: string;
  /** Icon name, used when layout="icon". */
  icon?: string;
  /** e.g. "60 / 90 min". */
  duration?: string;
  /** e.g. "from £65". */
  price?: string;
  image?: string;
  /** icon = emerald circle glyph · image = full-bleed photo top */
  layout?: 'icon' | 'image';
  onClick?: () => void;
  style?: React.CSSProperties;
}


export function TreatmentCard({ name, description, icon = 'leaf', duration, price, image, onClick, layout = 'icon', style }: TreatmentCardProps) {
  return (
    <Card padding={layout === 'image' ? 'none' : 'lg'} interactive={!!onClick} onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', gap: layout === 'image' ? 0 : 'var(--space-4)', ...style }}>
      {layout === 'image' && (image
        ? <img src={image} alt={name} style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover' }} />
        : <ImagePlaceholder label={`${name} — treatment`} ratio="16 / 10" shape="square" />)}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: layout === 'image' ? 'var(--card-padding)' : 0 }}>
        {layout === 'icon' && (
          <span style={{
            width: 46, height: 46, borderRadius: '50%', background: 'var(--surface-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={icon} size={21} color="var(--emerald-700)" />
          </span>
        )}
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-xs)', fontWeight: 'var(--weight-display-strong)', margin: 0 }}>{name}</h4>
        {description && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)' }}>{description}</p>}
        {(duration || price) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-soft)', marginTop: 'var(--space-3)' }}>
            {duration && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}><Icon name="timer" size={14} />{duration}</span>}
            {price && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--emerald-700)', marginLeft: 'auto' }}>{price}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
