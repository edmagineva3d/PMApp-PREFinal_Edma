import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { ShoppingCart } from '@phosphor-icons/react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <h2>Shopping Cart</h2>
      <EmptyState
        title="Your Shopping Cart is Empty"
        description="Explore the catalog to add items."
        actionLabel="Browse Products"
        onAction={() => navigate('/products')}
        icon={<ShoppingCart size={36} />}
      />
    </div>
  );
};
