import React from 'react';
import { Warning, CheckCircle } from '@phosphor-icons/react';

interface StockBadgeProps {
  quantity: number;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ quantity, className = '' }) => {
  if (quantity < 5) {
    return (
      <span className={`brutal-badge badge-low-stock ${className}`}>
        <Warning size={14} weight="bold" />
        <span>Low Stock ({quantity})</span>
      </span>
    );
  }
  return (
    <span className={`brutal-badge badge-in-stock ${className}`}>
      <CheckCircle size={14} weight="bold" />
      <span>In Stock ({quantity})</span>
    </span>
  );
};
