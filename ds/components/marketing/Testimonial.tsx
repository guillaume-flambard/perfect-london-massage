import * as React from 'react';
import { Card } from '../core/Card.tsx';
import { Rating } from '../core/Rating.tsx';
import { Icon } from '../core/Icon.tsx';

export interface TestimonialProps {
  quote: React.ReactNode;
  /** First name + initial, e.g. "Helena R." */
  author: string;
  /** e.g. "Kensington". */
  borough: string;
  rating?: number;
  /** Optional treatment booked. */
  treatment?: string;
  style?: React.CSSProperties;
}


export function Testimonial({ quote, author, borough, rating = 5, treatment, style }: TestimonialProps) {
  return (
    <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', ...style }}>
      <Icon name="quote" size={22} color="var(--gold-400)" />
      <p style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-tight)',
        color: 'var(--text-body)', letterSpacing: '-0.005em',
      }}>{quote}</p>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Rating value={rating} size={14} showValue={false} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>{author}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>
          <Icon name="mapPin" size={13} />{borough}{treatment && ` · ${treatment}`}
        </span>
      </div>
    </Card>
  );
}
