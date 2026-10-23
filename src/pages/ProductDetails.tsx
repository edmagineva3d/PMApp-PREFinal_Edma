import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { ArrowLeft } from '@phosphor-icons/react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = DEFAULT_PRODUCTS.find((p) => p.id === id);

  if (!product) return <div>Product Not Found</div>;

  return (
    <div className="page-container">
      <button onClick={() => navigate('/products')} className="brutal-btn">
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};
