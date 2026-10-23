import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { CartItemRow } from '../components/cart/CartItem';
import { EmptyState } from '../components/ui/EmptyState';
import { ShoppingCart } from '@phosphor-icons/react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useProducts();

  if (cart.length === 0) {
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
  }

  return (
    <div className="page-container">
      <h2>Shopping Cart ({cart.length})</h2>
      {cart.map(item => <CartItemRow key={item.product.id} item={item} />)}
    </div>
  );
};
