import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components/products/ProductForm';
import type { Product } from '../types/product';
import { ArrowLeft, ShieldCheck } from '@phosphor-icons/react';
import { toast } from 'sonner';

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: Omit<Product, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);

    try {
      const createdProduct = addProduct(data);
      toast.success(`Successfully registered "${createdProduct.name}" into inventory!`, {
        description: `Subtotal automatically recalculated. Added with initial stock of ${createdProduct.quantity} unit(s).`,
      });

      // Redirect to the newly created product's dedicated details page
      setTimeout(() => {
        navigate(`/products/${createdProduct.id}`);
      }, 500);
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('An unexpected error occurred while creating the product.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="brutal-btn"
            style={{ padding: '6px 12px', fontSize: '0.82rem', marginBottom: 12 }}
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to Catalog</span>
          </button>

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
            <span>INVENTORY REGISTRATION</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-primary)' }}>MANDATORY REQUIREMENT 2</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Register New Product</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Provide complete product specifications, feature image, pricing, and initial stock quantities.
          </p>
        </div>

        {/* Academic Validation Notice */}
        <div
          className="brutal-card"
          style={{
            padding: '12px 18px',
            backgroundColor: 'var(--accent-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <ShieldCheck size={24} weight="bold" />
          <div style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>
            <strong>CCDI Exam Validation Active:</strong>
            <div>All 8 fields strictly validated before submission</div>
          </div>
        </div>
      </div>

      {/* Main Form Component */}
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

