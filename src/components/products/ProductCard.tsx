import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Product } from '../../types/product';
import { calculateSubtotal } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { StockBadge } from '../ui/StockBadge';
import { QuantityControl } from './QuantityControl';
import { ShoppingCart, ArrowRight, Star, ImageSquare } from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { updateProductQuantity, addToCart } = useProducts();
  const [imageError, setImageError] = useState(false);

  const subtotal = calculateSubtotal(product.price, product.quantity);
  const isOutOfStock = product.quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) {
      toast.error(`"${product.name}" is out of stock!`);
      return;
    }
    const result = addToCart(product, 1);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleIncreaseQty = () => {
    updateProductQuantity(product.id, 1);
  };

  const handleDecreaseQty = () => {
    updateProductQuantity(product.id, -1);
  };

  return (
    <div
      
      
      
      
      className="brutal-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: 'var(--surface-primary)',
        position: 'relative',
      }}
    >
      {/* Product Image Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '65%', // 16:10 aspect ratio
          backgroundColor: 'var(--surface-light)',
          borderBottom: '2px solid var(--border-color)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--surface-light)',
              color: 'var(--text-muted)',
              gap: 6,
            }}
          >
            <ImageSquare size={36} weight="light" />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-data)' }}>No preview available</span>
          </div>
        )}

        {/* Category Floating Pill */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
          }}
        >
          <span
            style={{
              backgroundColor: 'var(--surface-primary)',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              padding: '4px 10px',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '2px 2px 0px var(--border-color)',
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Rating Floating Tag */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            backgroundColor: 'var(--accent-secondary)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-data)',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '3px 8px',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '2px 2px 0px var(--border-color)',
          }}
        >
          <Star size={12} weight="fill" color="var(--text-main)" />
          <span>{Number(product.rating || 5).toFixed(1)}</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div
        style={{
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Stock Badge & Sku */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              gap: 8,
            }}
          >
            <StockBadge quantity={product.quantity} />
            {product.sku && (
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                {product.sku}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigate(`/products/${product.id}`)}
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: 8,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
            }}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description preview */}
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 16,
            }}
          >
            {product.description}
          </p>
        </div>

        <div>
          {/* Financials & Quantity Grid */}
          <div
            style={{
              backgroundColor: 'var(--surface-light)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Price Column */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                Unit Price
              </span>
              <span
                className="font-data"
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                }}
              >
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Subtotal Column */}
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                Subtotal
              </span>
              <span
                className="font-data"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                }}
              >
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>

          {/* Interactive Quantity Control & Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Stock Qty
              </span>
              <QuantityControl
                quantity={product.quantity}
                onIncrease={handleIncreaseQty}
                onDecrease={handleDecreaseQty}
                min={0}
                size="sm"
              />
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              className="brutal-btn brutal-btn-primary"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.85rem',
                justifyContent: 'center',
              }}
              title={isOutOfStock ? 'Cannot add out-of-stock item' : 'Add 1 unit to cart'}
            >
              <ShoppingCart size={16} weight="bold" />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
            </button>
          </div>

          {/* View Details Link Button */}
          <button
            type="button"
            className="brutal-btn"
            onClick={() => navigate(`/products/${product.id}`)}
            style={{
              width: '100%',
              backgroundColor: 'var(--surface-primary)',
              fontSize: '0.82rem',
              padding: '7px 12px',
              justifyContent: 'center',
            }}
          >
            <span>View Full Specs</span>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

