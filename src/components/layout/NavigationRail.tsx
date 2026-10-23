import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  SquaresFour,
  Package,
  PlusCircle,
  ShoppingCart,
  ArrowsCounterClockwise,
  Cube,
} from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'sonner';

export const NavigationRail: React.FC = () => {
  const { cartItemCount, resetToDefaults } = useProducts();

  const handleResetData = () => {
    if (window.confirm('Reset all product records and cart back to the exam default dataset?')) {
      resetToDefaults();
      toast.success('Inventory reset to initial CCDI exam default products.');
    }
  };

  return (
    <aside className="icon-rail" aria-label="Desktop Icon Rail Navigation">
      {/* Brand Cube Logo */}
      <div className="rail-brand">
        <NavLink to="/" title="KRAFTBOX Dashboard" style={{ textDecoration: 'none' }}>
          <div className="rail-logo-box">
            <Cube size={26} weight="duotone" />
          </div>
        </NavLink>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.62rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            marginTop: 4,
            color: 'var(--text-main)',
          }}
        >
          KRAFT
        </span>
      </div>

      {/* Main Nav Links */}
      <nav>
        <ul className="rail-nav-links">
          {/* Overview / Dashboard */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `rail-nav-item ${isActive ? 'active' : ''}`}
              title="Overview Dashboard"
            >
              {({ isActive }) => (
                <>
                  <SquaresFour size={24} weight={isActive ? 'fill' : 'regular'} />
                  <span className="rail-tooltip">Dashboard Overview</span>
                </>
              )}
            </NavLink>
          </li>

          {/* Product Catalog */}
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => `rail-nav-item ${isActive ? 'active' : ''}`}
              title="Product Catalog & Inventory"
            >
              {({ isActive }) => (
                <>
                  <Package size={24} weight={isActive ? 'fill' : 'regular'} />
                  <span className="rail-tooltip">All Products</span>
                </>
              )}
            </NavLink>
          </li>

          {/* Add Product */}
          <li>
            <NavLink
              to="/add-product"
              className={({ isActive }) => `rail-nav-item ${isActive ? 'active' : ''}`}
              title="Add New Product"
            >
              {({ isActive }) => (
                <>
                  <PlusCircle size={24} weight={isActive ? 'fill' : 'regular'} />
                  <span className="rail-tooltip">Add New Product</span>
                </>
              )}
            </NavLink>
          </li>

          {/* Shopping Cart */}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => `rail-nav-item ${isActive ? 'active' : ''}`}
              title="Shopping Cart"
            >
              {({ isActive }) => (
                <>
                  <ShoppingCart size={24} weight={isActive ? 'fill' : 'regular'} />
                  {cartItemCount > 0 && <span className="rail-badge">{cartItemCount}</span>}
                  <span className="rail-tooltip">Shopping Cart ({cartItemCount})</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bottom Tool: Reset Exam Defaults */}
      <div>
        <button
          type="button"
          onClick={handleResetData}
          className="rail-nav-item"
          title="Reset to CCDI Exam Default Products"
          style={{ background: 'none', cursor: 'pointer' }}
        >
          <ArrowsCounterClockwise size={20} weight="bold" />
          <span className="rail-tooltip">Reset Exam Defaults</span>
        </button>
      </div>
    </aside>
  );
};

