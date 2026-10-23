import React from 'react';
import { Plus, Minus } from '@phosphor-icons/react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max,
  size = 'md',
  disabled = false,
}) => {
  const isDecreaseDisabled = disabled || quantity <= min;
  const isIncreaseDisabled = disabled || (max !== undefined && quantity >= max);

  const dimensionStyles = {
    sm: { btnSize: 26, iconSize: 13, minWidth: 30, fontSize: '0.85rem' },
    md: { btnSize: 32, iconSize: 15, minWidth: 38, fontSize: '0.95rem' },
    lg: { btnSize: 40, iconSize: 18, minWidth: 48, fontSize: '1.1rem' },
  }[size];

  return (
    <div
      className="quantity-stepper"
      onClick={(e) => e.stopPropagation()} // Prevent card navigation when clicking stepper
    >
      <button
        type="button"
        className="quantity-btn"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        style={{
          width: dimensionStyles.btnSize,
          height: dimensionStyles.btnSize,
        }}
        title={isDecreaseDisabled ? 'Quantity cannot be reduced further' : 'Decrease quantity by 1'}
        aria-label="Decrease quantity"
      >
        <Minus size={dimensionStyles.iconSize} weight="bold" />
      </button>

      <span
        className="quantity-val"
        style={{
          minWidth: dimensionStyles.minWidth,
          fontSize: dimensionStyles.fontSize,
          lineHeight: `${dimensionStyles.btnSize}px`,
        }}
      >
        {quantity}
      </span>

      <button
        type="button"
        className="quantity-btn"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        style={{
          width: dimensionStyles.btnSize,
          height: dimensionStyles.btnSize,
        }}
        title={isIncreaseDisabled ? 'Maximum limit reached' : 'Increase quantity by 1'}
        aria-label="Increase quantity"
      >
        <Plus size={dimensionStyles.iconSize} weight="bold" />
      </button>
    </div>
  );
};

