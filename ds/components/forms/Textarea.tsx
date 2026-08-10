import * as React from 'react';
import { useState } from 'react';

export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}


export function Textarea({ value, defaultValue, placeholder, rows = 4, invalid = false, disabled = false, onChange, id, name, style }: TextareaProps) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id} name={name} rows={rows} value={value} defaultValue={defaultValue}
      placeholder={placeholder} disabled={disabled} onChange={onChange}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', resize: 'vertical', padding: '13px 16px',
        background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
        border: `1px solid ${invalid ? 'var(--danger-600)' : focused ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)', outline: 'none',
        boxShadow: focused ? 'var(--ring-focus)' : 'none',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)',
        color: 'var(--text-body)', transition: 'var(--transition-control)', ...style,
      }}
    />
  );
}
