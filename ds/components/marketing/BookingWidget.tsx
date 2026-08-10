import * as React from 'react';
import { Card } from '../core/Card.tsx';
import { Select } from '../forms/Select.tsx';
import { Input } from '../forms/Input.tsx';
import { Button } from '../core/Button.tsx';
import { Field } from '../forms/Field.tsx';

export interface BookingWidgetProps {
  /** Treatment options for the middle select. */
  treatments?: Array<string | { value: string; label: string }>;
  /** Location-type options. */
  locations?: Array<string | { value: string; label: string }>;
  onSubmit?: () => void;
  style?: React.CSSProperties;
}


export function BookingWidget({ treatments = [], locations = [], onSubmit, style }: BookingWidgetProps) {
  return (
    <Card padding="lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 'var(--space-4)', alignItems: 'end', ...style }}>
      <Field label="Where">
        <Select placeholder="Home, hotel or office" iconLeft="house" options={locations} />
      </Field>
      <Field label="Treatment">
        <Select placeholder="Any treatment" iconLeft="leaf" options={treatments} />
      </Field>
      <Field label="When">
        <Input type="text" placeholder="Today, as soon as possible" iconLeft="calendar" />
      </Field>
      <Button variant="gold" size="lg" onClick={onSubmit} iconRight="arrowRight">Find a therapist</Button>
    </Card>
  );
}
