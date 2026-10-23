import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import {
  CreditCard,
  Trash,
  Package,
  ShieldCheck,
  X,
} from '@phosphor-icons/react';
import { toast } from 'sonner';

export const CartSummary: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartItemCount, clearCart } = useProducts();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      toast.info('Shopping cart has been emptied.');
    }
  };

  const handleSimulateCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
      clearCart();
      toast.success('Order placed successfully! (Demo Checkout Simulation)');
      navigate('/products');
    }, 1500);
  };

  return (
    <>
      <div
        className="brutal-card"
        style={{
          padding: 24,
          backgroundColor: 'var(--surface-primary)',
          position: 'sticky',
          top: 96,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
            borderBottom: '2px solid var(--border-color)',
            marginBottom: 18,
          }}
        >
          <h3 style={{ fontSize: '1.25rem' }}>Order Summary</h3>
          <span
            className="font-data"
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: 'var(--accent-secondary)',
              padding: '2px 8px',
              border: '1.5px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Pricing Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal:</span>
            <span className="font-data" style={{ fontWeight: 700 }}>
              {formatCurrency(cartTotal)}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Standard Delivery (PH):</span>
            <span className="font-data" style={{ fontWeight: 700, color: 'var(--status-success)' }}>
              FREE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>VAT & Processing:</span>
            <span className="font-data" style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              Included
            </span>
          </div>

          <div
            style={{
              borderTop: '2px solid var(--border-color)',
              paddingTop: 14,
              marginTop: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
              }}
            >
              Total Due:
            </span>
            <span
              className="font-data"
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
              }}
            >
              {formatCurrency(cartTotal)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            type="button"
            className="brutal-btn brutal-btn-primary"
            style={{ width: '100%', padding: '12px 18px', fontSize: '1rem', justifyContent: 'center' }}
            disabled={cart.length === 0}
            onClick={() => setIsCheckoutModalOpen(true)}
          >
            <CreditCard size={18} weight="bold" />
            <span>Proceed to Checkout</span>
          </button>

          <button
            type="button"
            className="brutal-btn"
            style={{ width: '100%', padding: '10px 18px', fontSize: '0.88rem', justifyContent: 'center' }}
            disabled={cart.length === 0}
            onClick={handleClearCart}
          >
            <Trash size={16} weight="bold" />
            <span>Clear Shopping Cart</span>
          </button>
        </div>

        {/* Assurance Badges */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px dashed var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}
          >
            <ShieldCheck size={16} weight="bold" color="var(--status-success)" />
            <span>CCDI Academic Pre-Final Exam Verification</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}
          >
            <Package size={16} weight="bold" color="var(--accent-primary)" />
            <span>Instant LocalStorage State Synchronization</span>
          </div>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      {isCheckoutModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(23, 23, 23, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
          }}
          onClick={() => setIsCheckoutModalOpen(false)}
        >
          <div
            className="brutal-card"
            style={{
              maxWidth: 480,
              width: '100%',
              backgroundColor: 'var(--surface-primary)',
              padding: 28,
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
                borderBottom: '2px solid var(--border-color)',
                paddingBottom: 12,
              }}
            >
              <h3 style={{ fontSize: '1.3rem' }}>Complete Simulated Checkout</h3>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: '0.9rem' }}>
              You are completing an order of <strong>{cartItemCount}</strong> item(s) for a total of{' '}
              <strong className="font-data" style={{ color: 'var(--accent-primary)' }}>
                {formatCurrency(cartTotal)}
              </strong>
              .
            </p>

            <div
              style={{
                backgroundColor: 'var(--surface-light)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 16,
                marginBottom: 20,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.85rem' }}>
                Order Summary Items:
              </div>
              <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      padding: '4px 0',
                    }}
                  >
                    <span>
                      {item.product.name} × {item.cartQuantity}
                    </span>
                    <span className="font-data">{formatCurrency(item.product.price * item.cartQuantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                className="brutal-btn brutal-btn-lime"
                style={{ flex: 1, padding: '12px 18px', fontSize: '0.95rem' }}
                onClick={handleSimulateCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm & Place Order'}
              </button>
              <button
                type="button"
                className="brutal-btn"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

