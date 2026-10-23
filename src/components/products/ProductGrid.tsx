import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { QuantityControl } from './QuantityControl';
import { StockBadge } from '../ui/StockBadge';
import { calculateSubtotal } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { ShoppingCart, ArrowRight } from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'sonner';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'table';
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { updateProductQuantity, addToCart } = useProducts();

  const handleAddToCart = (product: Product) => {
    if (product.quantity <= 0) {
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

  if (viewMode === 'table') {
    return (
      <div
        className="brutal-card"
        style={{
          overflowX: 'auto',
          backgroundColor: 'var(--surface-primary)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontFamily: 'var(--font-body)',
            minWidth: 780,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--surface-light)',
                borderBottom: '2px solid var(--border-color)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
              }}
            >
              <th style={{ padding: '14px 18px' }}>Product</th>
              <th style={{ padding: '14px 14px' }}>Category</th>
              <th style={{ padding: '14px 14px' }}>Status</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Unit Price</th>
              <th style={{ padding: '14px 14px', textAlign: 'center' }}>Stock Qty</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Subtotal</th>
              <th style={{ padding: '14px 18px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const subtotal = calculateSubtotal(product.price, product.quantity);
              const isOutOfStock = product.quantity <= 0;

              return (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: '1px solid rgba(32,32,32,0.12)',
                    transition: 'background-color 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF9F5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Thumbnail & Name */}
                  <td style={{ padding: '14px 18px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 'var(--radius-sm)',
                          border: '2px solid var(--border-color)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          backgroundColor: 'var(--surface-light)',
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: 'var(--text-main)',
                            maxWidth: 260,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-data)',
                            fontSize: '0.72rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {product.sku || product.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '14px 14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--surface-light)',
                        display: 'inline-block',
                      }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Stock Status Badge */}
                  <td style={{ padding: '14px 14px' }}>
                    <StockBadge quantity={product.quantity} />
                  </td>

                  {/* Unit Price */}
                  <td
                    style={{
                      padding: '14px 14px',
                      textAlign: 'right',
                      fontFamily: 'var(--font-data)',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                    }}
                  >
                    {formatCurrency(product.price)}
                  </td>

                  {/* Quantity Stepper */}
                  <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                    <QuantityControl
                      quantity={product.quantity}
                      onIncrease={() => updateProductQuantity(product.id, 1)}
                      onDecrease={() => updateProductQuantity(product.id, -1)}
                      min={0}
                      size="sm"
                    />
                  </td>

                  {/* Subtotal */}
                  <td
                    style={{
                      padding: '14px 14px',
                      textAlign: 'right',
                      fontFamily: 'var(--font-data)',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      fontSize: '1rem',
                    }}
                  >
                    {formatCurrency(subtotal)}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        className="brutal-btn brutal-btn-primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                        style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                        title="Add 1 to Cart"
                      >
                        <ShoppingCart size={14} weight="bold" />
                      </button>

                      <button
                        type="button"
                        className="brutal-btn"
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                        title="View Product Details"
                      >
                        <ArrowRight size={14} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Grid Layout
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

