import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlass,
  ShoppingCart,
  Plus,
  GraduationCap,
} from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, cartItemCount, overallTotal } = useProducts();

  return (
    <header className="app-header">
      {/* Left: Branding & Academic Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: 'var(--text-main)',
              }}
            >
              KRAFTBOX
            </span>
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '0.68rem',
                fontWeight: 800,
                backgroundColor: 'var(--accent-secondary)',
                color: 'var(--text-main)',
                padding: '2px 6px',
                border: '1.5px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              v2.4
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              marginTop: 2,
            }}
          >
            <GraduationCap size={13} weight="bold" />
            <span>CCDI Sorsogon City • Pre-Final Exam</span>
          </div>
        </div>
      </div>

      {/* Center: Global Live Search */}
      <div className="header-search">
        <MagnifyingGlass size={18} weight="bold" className="header-search-icon" />
        <input
          type="text"
          className="header-search-input"
          placeholder="Quick search products, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Quick Total Badge & Actions */}
      <div className="header-actions">
        {/* Dynamic overall inventory value pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            backgroundColor: 'var(--surface-light)',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '1px 1px 0px var(--border-color)',
          }}
          title="Live computed inventory value using Array.reduce()"
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            Valuation:
          </span>
          <span
            className="font-data"
            style={{
              fontWeight: 800,
              fontSize: '0.88rem',
              color: 'var(--accent-primary)',
            }}
          >
            {formatCurrency(overallTotal)}
          </span>
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={() => navigate('/add-product')}
          className="brutal-btn brutal-btn-primary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <Plus size={16} weight="bold" />
          <span>New Product</span>
        </button>

        {/* Shopping Cart Pill */}
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="brutal-btn"
          style={{
            padding: '8px 14px',
            fontSize: '0.85rem',
            position: 'relative',
            backgroundColor: cartItemCount > 0 ? 'var(--accent-secondary)' : 'var(--surface-primary)',
          }}
        >
          <ShoppingCart size={17} weight="bold" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-data)',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 10,
                marginLeft: 4,
              }}
            >
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

