import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../core/Icon.tsx';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'search' | 'number' | 'date' | 'time';
  /** Icon name rendered inside, left of the text. */
  iconLeft?: string;
  /** Static trailing text, e.g. "min" or "£". */
  suffix?: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}


function fieldFrame(focused: boolean, invalid: boolean, disabled: boolean) {
  return {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
    background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
    border: `1px solid ${invalid ? 'var(--danger-600)' : focused ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
    borderRadius: 'var(--radius-md)', padding: '13px 16px',
    boxShadow: focused ? 'var(--ring-focus)' : 'none',
    transition: 'var(--transition-control)', opacity: disabled ? 0.6 : 1,
  };
}

export function Input({ value, defaultValue, placeholder, type = 'text', iconLeft, suffix, invalid = false, disabled = false, onChange, id, name, style, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ ...fieldFrame(focused, invalid, disabled), ...style }}>
      {iconLeft && <Icon name={iconLeft} size={17} color="var(--ink-500)" />}
      <input
        id={id} name={name} type={type} value={value} defaultValue={defaultValue}
        placeholder={placeholder} disabled={disabled} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', padding: 0,
        }}
        {...rest}
      />
      {suffix && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{suffix}</span>}
    </div>
  );
}
