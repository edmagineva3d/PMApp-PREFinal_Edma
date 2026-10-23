import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { Plus, Package, Calculator } from '@phosphor-icons/react';
import { calculateOverallTotal } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useProducts();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredTotalValue = calculateOverallTotal(filteredProducts);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
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
            <span>CATALOG & WAREHOUSE</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-primary)' }}>MANDATORY REQUIREMENT 1</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Product Inventory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Filter by category, search live records, adjust stock quantities, and view detailed specifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="button"
            className="brutal-btn brutal-btn-primary"
            onClick={() => navigate('/add-product')}
            style={{ padding: '11px 20px' }}
          >
            <Plus size={18} weight="bold" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & View Mode Controls */}
      <ProductFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFilteredCount={filteredProducts.length}
      />

      {/* Value Summary of Current Filtered View */}
      {filteredProducts.length > 0 && (
        <div
          className="brutal-card"
          style={{
            padding: '12px 18px',
            backgroundColor: 'var(--surface-light)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={18} weight="bold" color="var(--accent-primary)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem' }}>
              Subtotal Valuation of Filtered Items:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              className="font-data"
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
              }}
            >
              {formatCurrency(filteredTotalValue)}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
              }}
            >
              ({filteredProducts.length} unique products displayed)
            </span>
          </div>
        </div>
      )}

      {/* Product List or Empty State */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} viewMode={viewMode} />
      ) : (
        <EmptyState
          title="No Matching Products Found"
          description={`No products match your current search "${searchQuery}" or category filter "${selectedCategory}". Try adjusting your query or resetting filters.`}
          actionLabel="Reset Filters & Search"
          onAction={() => {
            setSelectedCategory('All Products');
            setSearchQuery('');
          }}
          icon={<Package size={36} weight="duotone" />}
        />
      )}
    </div>
  );
};

