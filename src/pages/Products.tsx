import React, { useState } from 'react';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';

export const Products: React.FC = () => {
  const [category, setCategory] = useState('All Products');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filtered = DEFAULT_PRODUCTS.filter((item) => {
    const matchCat = category === 'All Products' || item.category === category;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-container">
      <h2>Product Catalog</h2>
      <ProductFilters
        selectedCategory={category}
        onSelectCategory={setCategory}
        searchQuery={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFilteredCount={filtered.length}
      />
      <ProductGrid products={filtered} />
    </div>
  );
};
