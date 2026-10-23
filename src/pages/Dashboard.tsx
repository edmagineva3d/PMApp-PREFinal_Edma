import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Package, CurrencyCircleDollar, WarningOctagon, ShoppingCart } from '@phosphor-icons/react';
import { StatPanel } from '../components/ui/StatPanel';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <section className="brutal-card bg-grid-pattern" style={{ padding: '36px', marginBottom: 30 }}>
        <h1>Your Inventory. <span style={{ backgroundColor: 'var(--accent-secondary)' }}>Your Rules.</span></h1>
        <p>Keep your products organized, track quantities, and manage your inventory with a smarter, simpler workspace.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button type="button" onClick={() => navigate('/products')} className="brutal-btn brutal-btn-primary">
            <span>Explore Products</span>
            <ArrowRight size={18} weight="bold" />
          </button>
          <button type="button" onClick={() => navigate('/add-product')} className="brutal-btn brutal-btn-lime">
            <Plus size={18} weight="bold" />
            <span>Add New Product</span>
          </button>
        </div>
      </section>
      <section className="stats-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <StatPanel label="Total Products" value="6" subValue="Active Catalog" icon={<Package size={22} weight="bold" />} />
          <StatPanel label="Inventory Value" value="₱225,480.00" subValue="Computed Subtotals" icon={<CurrencyCircleDollar size={22} weight="bold" />} accentColor="blue" isLarge />
          <StatPanel label="Low Stock Items" value="2" subValue="Quantity < 5" icon={<WarningOctagon size={22} weight="bold" />} accentColor="amber" />
          <StatPanel label="Cart Items" value="0 units" subValue="Cart ready" icon={<ShoppingCart size={22} weight="bold" />} />
        </div>
      </section>
    </div>
  );
};
