import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../core/Icon.tsx';

export interface SelectOption { value: string; label: string }

/** Native select in the brand field frame — treatment, duration, location type. */
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  /** Strings or {value,label} objects. */
  options?: Array<string | SelectOption>;
  /** Rendered as the empty first option. */
  placeholder?: string;
  iconLeft?: string;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}


export function Select({ value, defaultValue, options = [], placeholder, iconLeft, disabled = false, invalid = false, onChange, id, name, style }: SelectProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%', position: 'relative',
      background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
      border: `1px solid ${invalid ? 'var(--danger-600)' : focused ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)', padding: '13px 16px',
      boxShadow: focused ? 'var(--ring-focus)' : 'none',
      transition: 'var(--transition-control)', opacity: disabled ? 0.6 : 1, ...style,
    }}>
      {iconLeft && <Icon name={iconLeft} size={17} color="var(--ink-500)" />}
      <select
        id={id} name={name} value={value} defaultValue={defaultValue} disabled={disabled} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, minWidth: 0, appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', padding: 0, cursor: 'pointer',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
      <Icon name="chevronDown" size={17} color="var(--ink-500)" />
    </div>
  );
}
