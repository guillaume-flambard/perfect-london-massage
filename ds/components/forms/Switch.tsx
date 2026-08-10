import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}


export function Switch({ checked = false, label, disabled = false, onChange, style }: SwitchProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 11, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 44, height: 26, flex: 'none', borderRadius: 'var(--radius-pill)', padding: 3,
        background: checked ? 'var(--emerald-700)' : 'var(--ink-500)',
        display: 'flex',
        transition: 'background-color var(--duration-base) var(--ease-out)',
      }}>
        <span style={{
          width: 20, height: 20, borderRadius: '50%', background: 'var(--white)', boxShadow: 'var(--shadow-xs)',
          transform: checked ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform var(--duration-base) var(--ease-out)',
        }} />
      </span>
      {label && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
