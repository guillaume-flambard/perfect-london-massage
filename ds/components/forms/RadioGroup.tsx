import * as React from 'react';

export interface RadioOption { value: string; label: string; description?: string }

/** Card-style single choice — location type, therapist gender preference, duration. */
export interface RadioGroupProps {
  name: string;
  value?: string;
  options?: Array<string | RadioOption>;
  direction?: 'row' | 'column';
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}


export function RadioGroup({ name, value, options = [], onChange, direction = 'column', style }: RadioGroupProps) {
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap: 10, ...style }}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const selected = value === opt.value;
        return (
          <label key={opt.value} style={{
            display: 'flex', alignItems: opt.description ? 'flex-start' : 'center', gap: 11,
            padding: '13px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
            background: selected ? 'var(--surface-accent-soft)' : 'var(--surface-card)',
            border: `1px solid ${selected ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
            transition: 'var(--transition-control)',
          }}>
            <input type="radio" name={name} value={opt.value} checked={selected}
              onChange={() => onChange && onChange(opt.value)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <span style={{
              width: 19, height: 19, flex: 'none', borderRadius: '50%', marginTop: opt.description ? 2 : 0,
              border: `1px solid ${selected ? 'var(--emerald-700)' : 'var(--border-strong)'}`,
              background: 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selected && <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--emerald-700)', animation: 'plm-pop var(--duration-fast) var(--ease-out)' }} />}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-body)' }}>{opt.label}</span>
              {opt.description && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>{opt.description}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
