import React from 'react';
import { CATEGORIES } from '../../data/defaultProducts';
import { SquaresFour, Table, MagnifyingGlass, X } from '@phosphor-icons/react';

interface ProductFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  totalFilteredCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginBottom: 28,
      }}
    >
      {/* Category Pills & View Mode Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        {/* Horizontal scrollable categories */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            maxWidth: '100%',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`category-pill ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle & Results Count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
            }}
          >
            Showing <strong style={{ color: 'var(--text-main)' }}>{totalFilteredCount}</strong> item{totalFilteredCount !== 1 ? 's' : ''}
          </span>

          <div
            style={{
              display: 'inline-flex',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
              backgroundColor: 'var(--surface-primary)',
            }}
          >
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              style={{
                border: 'none',
                padding: '6px 10px',
                cursor: 'pointer',
                backgroundColor: viewMode === 'grid' ? 'var(--accent-secondary)' : 'transparent',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease',
              }}
              title="Card Grid Layout"
            >
              <SquaresFour size={20} weight={viewMode === 'grid' ? 'fill' : 'regular'} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              style={{
                border: 'none',
                borderLeft: '1px solid var(--border-color)',
                padding: '6px 10px',
                cursor: 'pointer',
                backgroundColor: viewMode === 'table' ? 'var(--accent-secondary)' : 'transparent',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease',
              }}
              title="Table Layout"
            >
              <Table size={20} weight={viewMode === 'table' ? 'fill' : 'regular'} />
            </button>
          </div>
        </div>
      </div>

      {/* Inline Search Bar (especially for mobile or direct on-page search) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <MagnifyingGlass
            size={18}
            weight="bold"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
            }}
          />
          <input
            type="text"
            className="brutal-input"
            style={{ paddingLeft: 42, paddingRight: searchQuery ? 40 : 14 }}
            placeholder="Search by product name, category, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
              title="Clear search"
            >
              <X size={16} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

