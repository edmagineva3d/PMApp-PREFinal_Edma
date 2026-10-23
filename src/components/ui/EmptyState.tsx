import React from 'react';
import { Package, ArrowClockwise } from '@phosphor-icons/react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div
      className="brutal-card"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--surface-primary)',
        margin: '24px 0',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--surface-light)',
          border: '2px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 16,
          color: 'var(--text-secondary)',
        }}
      >
        {icon || <Package size={36} weight="duotone" />}
      </div>
      <h3
        style={{
          fontSize: '1.4rem',
          fontFamily: 'var(--font-heading)',
          marginBottom: 8,
          color: 'var(--text-main)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          maxWidth: 420,
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          marginBottom: actionLabel ? 24 : 0,
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="lime" onClick={onAction} icon={<ArrowClockwise size={18} weight="bold" />}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

