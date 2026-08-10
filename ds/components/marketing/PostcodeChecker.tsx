import * as React from 'react';
import { useState } from 'react';
import { Card } from '../core/Card.tsx';
import { Input } from '../forms/Input.tsx';
import { Button } from '../core/Button.tsx';
import { Icon } from '../core/Icon.tsx';

export interface PostcodeResult { covered: boolean; message: string }

/**
 * Postcode → ETA and travel-surcharge feedback for the coverage section.
 * @startingPoint section="Marketing" subtitle="Postcode coverage & ETA checker" viewport="700x260"
 */
export interface PostcodeCheckerProps {
  onCheck?: (postcode: string) => void;
  /** Feedback banner: green when covered, amber otherwise. */
  result?: PostcodeResult;
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}


export function PostcodeChecker({ onCheck, result, tone = 'default', style }: PostcodeCheckerProps) {
  const [value, setValue] = useState('');
  const inverse = tone === 'inverse';
  return (
    <Card padding="lg" tone={inverse ? 'inverse' : 'default'} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', ...style }}>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
        color: inverse ? 'var(--gold-400)' : 'var(--gold-700)',
      }}>Check your coverage</span>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Input placeholder="Enter your London postcode" iconLeft="mapPin" value={value}
          onChange={(e) => setValue(e.target.value)} style={{ flex: '1 1 220px' }} />
        <Button variant={inverse ? 'gold' : 'primary'} onClick={() => onCheck && onCheck(value)}>Check ETA</Button>
      </div>
      {result && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 'var(--radius-md)',
          background: result.covered ? 'var(--success-100)' : 'var(--warning-100)',
          color: result.covered ? 'var(--success-600)' : 'var(--warning-600)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
          animation: 'plm-rise var(--duration-base) var(--ease-entrance)',
        }}>
          <Icon name={result.covered ? 'circleCheckBig' : 'info'} size={18} />
          <span>{result.message}</span>
        </div>
      )}
    </Card>
  );
}
