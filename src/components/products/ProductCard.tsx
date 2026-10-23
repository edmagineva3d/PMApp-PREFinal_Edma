import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ArrowRight } from '@phosphor-icons/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="brutal-card" style={{ padding: 18 }}>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <div>₱{product.price.toFixed(2)}</div>
      <button onClick={() => navigate(`/products/${product.id}`)} className="brutal-btn">
        <span>View Details</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
