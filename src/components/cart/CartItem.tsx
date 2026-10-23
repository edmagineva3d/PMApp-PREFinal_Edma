import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { QuantityControl } from '../products/QuantityControl';
import { Trash, Warning } from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const { updateCartQuantity, removeFromCart, products } = useProducts();

  // Look up latest inventory for this product
  const liveProduct = products.find((p) => p.id === item.product.id) || item.product;
  const itemSubtotal = liveProduct.price * item.cartQuantity;
  const isCappedAtMaxStock = item.cartQuantity >= liveProduct.quantity;

  const handleIncrease = () => {
    const res = updateCartQuantity(item.product.id, 1);
    if (!res.success && res.message) {
      toast.warning(res.message);
    }
  };

  const handleDecrease = () => {
    updateCartQuantity(item.product.id, -1);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
    toast.info(`Removed "${item.product.name}" from shopping cart.`);
  };

  return (
    <div
      className="brutal-card"
      style={{
        padding: '16px 20px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        backgroundColor: 'var(--surface-primary)',
      }}
    >
      {/* Thumbnail & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          minWidth: 260,
          flex: '1 1 300px',
        }}
      >
        <div
          onClick={() => navigate(`/products/${item.product.id}`)}
          style={{
            width: 72,
            height: 72,
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--border-color)',
            overflow: 'hidden',
            flexShrink: 0,
            cursor: 'pointer',
            backgroundColor: 'var(--surface-light)',
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              letterSpacing: '0.04em',
            }}
          >
            {item.product.category}
          </span>
          <h4
            onClick={() => navigate(`/products/${item.product.id}`)}
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: 'pointer',
              color: 'var(--text-main)',
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {item.product.name}
          </h4>
          <div
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            {formatCurrency(liveProduct.price)} / unit
          </div>
          {isCappedAtMaxStock && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                color: 'var(--status-warning)',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              <Warning size={12} weight="bold" />
              <span>Max available stock ({liveProduct.quantity}) reached</span>
            </div>
          )}
        </div>
      </div>

      {/* Quantity & Subtotal & Delete Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          justifyContent: 'space-between',
          flex: '0 0 auto',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 4,
            }}
          >
            Quantity
          </span>
          <QuantityControl
            quantity={item.cartQuantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
            max={liveProduct.quantity}
            size="sm"
          />
        </div>

        <div style={{ textAlign: 'right', minWidth: 110 }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 2,
            }}
          >
            Subtotal
          </span>
          <span
            className="font-data"
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--text-main)',
            }}
          >
            {formatCurrency(itemSubtotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className="brutal-btn brutal-btn-danger"
          style={{ padding: '8px 10px' }}
          title="Remove from cart"
        >
          <Trash size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
};

