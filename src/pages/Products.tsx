import React from 'react';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { ProductGrid } from '../components/products/ProductGrid';

export const Products: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Product Catalog</h2>
      <ProductGrid products={DEFAULT_PRODUCTS} />
    </div>
  );
};
