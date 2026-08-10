import * as React from 'react';
import { Icon } from '../core/Icon.tsx';

export interface CheckboxProps {
  checked?: boolean;
  label?: React.ReactNode;
  /** Optional second line of muted text. */
  description?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}


export function Checkbox({ checked = false, label, description, disabled = false, onChange, id, style }: CheckboxProps) {
  return (
    <label htmlFor={id} style={{
      display: 'flex', alignItems: description ? 'flex-start' : 'center', gap: 11,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 21, height: 21, flex: 'none', marginTop: description ? 1 : 0,
        borderRadius: 'var(--radius-xs)',
        background: checked ? 'var(--emerald-700)' : 'var(--surface-card)',
        border: `1px solid ${checked ? 'var(--emerald-700)' : 'var(--border-strong)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'var(--transition-control)',
      }}>
        {checked && <Icon name="check" size={14} color="var(--cream-100)" strokeWidth={2.4} style={{ animation: 'plm-pop var(--duration-fast) var(--ease-out)' }} />}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>
        {description && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>{description}</span>}
      </span>
    </label>
  );
}
