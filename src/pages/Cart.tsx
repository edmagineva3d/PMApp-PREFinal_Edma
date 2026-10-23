import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { CartItemRow } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { ShoppingCart, ArrowLeft } from '@phosphor-icons/react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartItemCount } = useProducts();

  return (
    <div className="page-container">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="brutal-btn"
            style={{ padding: '6px 12px', fontSize: '0.82rem', marginBottom: 12 }}
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Continue Shopping</span>
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 4,
            }}
          >
            <span>DISPATCH & CART</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-primary)' }}>ACTIVE BASKET</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Shopping Cart</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Review your selected inventory items, adjust quantities, or proceed to simulated checkout.
          </p>
        </div>

        {cartItemCount > 0 && (
          <div
            className="brutal-badge"
            style={{
              backgroundColor: 'var(--accent-secondary)',
              fontSize: '0.9rem',
              padding: '6px 14px',
            }}
          >
            <ShoppingCart size={18} weight="bold" />
            <span>{cartItemCount} Total Units</span>
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* Left: Cart Items List */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Selected Products ({cart.length})
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Stock limits enforced in real-time
              </span>
            </div>

            <div>
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right: Cart Summary Panel */}
          <div>
            <CartSummary />
          </div>
        </div>
      ) : (
        <EmptyState
          title="Your Shopping Cart is Empty"
          description="You currently have no products added to your cart. Explore our product catalog to discover high-grade gear and tech accessories."
          actionLabel="Explore Product Catalog"
          onAction={() => navigate('/products')}
          icon={<ShoppingCart size={40} weight="duotone" />}
        />
      )}
    </div>
  );
};

