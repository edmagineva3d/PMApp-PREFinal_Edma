import React from 'react';
import { NavLink } from 'react-router-dom';
import { SquaresFour, Package, PlusCircle, ShoppingCart } from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';

export const MobileNavigation: React.FC = () => {
  const { cartItemCount } = useProducts();

  return (
    <nav className="mobile-nav-bar" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <SquaresFour size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Overview</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <Package size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Products</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/add-product"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <PlusCircle size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Add Item</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={22} weight={isActive ? 'fill' : 'regular'} />
              {cartItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    backgroundColor: 'var(--accent-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-data)',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: 8,
                    border: '1.5px solid var(--border-color)',
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

