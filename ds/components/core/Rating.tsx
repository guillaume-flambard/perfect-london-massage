import * as React from 'react';
import { Icon } from './Icon.tsx';

export interface RatingProps {
  /** 0–5, halves supported. */
  value?: number;
  /** Review count rendered in parentheses. */
  count?: number;
  /** Star size in px. Default 15. */
  size?: number;
  showValue?: boolean;
  style?: React.CSSProperties;
}


export function Rating({ value = 5, count, size = 15, showValue = true, style }: RatingProps) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {stars.map((s) => {
          const filled = value >= s - 0.25;
          const half = !filled && value >= s - 0.75;
          return (
            <Icon
              key={s}
              name={half ? 'starHalf' : 'star'}
              size={size}
              color={filled || half ? 'var(--star-filled)' : 'var(--star-empty)'}
              style={{ fill: filled ? 'var(--star-filled)' : 'none' }}
            />
          );
        })}
      </span>
      {showValue && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>
          ({count})
        </span>
      )}
    </span>
  );
}
