import React from 'react';

export type ButtonVariant = 'primary' | 'lime' | 'amber' | 'dark' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'brutal-btn-primary',
    lime: 'brutal-btn-lime',
    amber: 'brutal-btn-amber',
    dark: 'brutal-btn-dark',
    danger: 'brutal-btn-danger',
    outline: '',
  }[variant];

  const sizeStyle = {
    sm: { padding: '6px 12px', fontSize: '0.82rem' },
    md: { padding: '10px 18px', fontSize: '0.95rem' },
    lg: { padding: '14px 24px', fontSize: '1.05rem' },
  }[size];

  return (
    <button
      className={`brutal-btn ${variantClass} ${className}`}
      style={sizeStyle}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

