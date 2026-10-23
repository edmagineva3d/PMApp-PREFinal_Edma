import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus } from '@phosphor-icons/react';

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
    </div>
  );
};
