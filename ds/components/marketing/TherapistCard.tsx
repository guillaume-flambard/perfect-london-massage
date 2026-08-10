import * as React from 'react';
import { Card } from '../core/Card.tsx';
import { Badge } from '../core/Badge.tsx';
import { Button } from '../core/Button.tsx';
import { Rating } from '../core/Rating.tsx';
import { Icon } from '../core/Icon.tsx';
import { ImagePlaceholder } from '../core/ImagePlaceholder.tsx';

export interface TherapistCardProps {
  name: string;
  /** e.g. "9 yrs experience". */
  experience?: string;
  /** Treatment specialisms rendered as brand badges. */
  specialisms?: string[];
  rating?: number;
  reviews?: number;
  /** Availability line, e.g. "Available today · 40 min away". */
  availability?: string;
  /** Portrait URL. Falls back to a photo placeholder. */
  photo?: string;
  onBook?: () => void;
  onView?: () => void;
  style?: React.CSSProperties;
}


export function TherapistCard({ name, experience, specialisms = [], rating, reviews, availability, photo, onBook, onView, style }: TherapistCardProps) {
  return (
    <Card padding="none" interactive onClick={onView} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ position: 'relative' }}>
        {photo ? <img src={photo} alt={name} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover' }} />
               : <ImagePlaceholder label={`${name} — portrait`} ratio="4 / 5" shape="square" />}
        {availability && (
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <Badge tone="success" icon="clock">{availability}</Badge>
          </div>
        )}
      </div>
      <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-xs)', fontWeight: 'var(--weight-display-strong)', margin: 0, lineHeight: 1.15 }}>{name}</h4>
          {experience && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{experience}</span>}
        </div>
        {rating != null && <Rating value={rating} count={reviews} />}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {specialisms.map((s) => <Badge key={s} tone="brand">{s}</Badge>)}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)' }}>
          <Button variant="primary" size="sm" fullWidth iconRight="arrowRight"
            onClick={(e) => { e.stopPropagation(); onBook && onBook(); }}>Book with {name.split(' ')[0]}</Button>
        </div>
      </div>
    </Card>
  );
}
