import * as React from 'react';

export interface FieldProps {
  label?: React.ReactNode;
  /** Muted helper text below the control. */
  hint?: React.ReactNode;
  /** Replaces hint and turns it red. */
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}


/** Label + help/error wrapper shared by every form control. */
export function Field({ label, hint, error, required, htmlFor, children, style }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', ...style }}>
      {label && (
        <label htmlFor={htmlFor} style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)',
          letterSpacing: '0.02em', color: 'var(--text-body)',
        }}>
          {label}{required && <span style={{ color: 'var(--gold-700)' }}> *</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', lineHeight: 1.45,
          color: error ? 'var(--danger-600)' : 'var(--text-subtle)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
