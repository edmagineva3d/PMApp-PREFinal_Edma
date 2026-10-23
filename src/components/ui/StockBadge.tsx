import React from 'react';
import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react';
import { getStockStatus } from '../../types/product';

interface StockBadgeProps {
  quantity: number;
  className?: string;
  showIcon?: boolean;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ quantity, className = '', showIcon = true }) => {
  const status = getStockStatus(quantity);

  if (status === 'OUT_OF_STOCK') {
    return (
      <span className={`brutal-badge badge-out-of-stock ${className}`} title="No units available">
        {showIcon && <XCircle size={14} weight="bold" />}
        <span>Out of Stock</span>
      </span>
    );
  }

  if (status === 'LOW_STOCK') {
    return (
      <span
        className={`brutal-badge badge-low-stock ${className}`}
        title="Low inventory: less than 5 units remaining"
      >
        {showIcon && <Warning size={14} weight="bold" />}
        <span>Low Stock ({quantity})</span>
      </span>
    );
  }

  return (
    <span className={`brutal-badge badge-in-stock ${className}`} title="Adequate inventory available">
      {showIcon && <CheckCircle size={14} weight="bold" />}
      <span>In Stock ({quantity})</span>
    </span>
  );
};

