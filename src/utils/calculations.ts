import type { Product, CartItem } from '../types/product';

/**
 * Computes individual product subtotal: Price × Quantity
 */
export function calculateSubtotal(price: number, quantity: number): number {
  const p = Number(price) || 0;
  const q = Number(quantity) || 0;
  return p * q;
}

/**
 * Computes overall inventory value: Sum of all product subtotals
 * Uses Array.prototype.reduce() as strictly mandated by the exam requirements.
 */
export function calculateOverallTotal(products: Product[]): number {
  if (!Array.isArray(products)) return 0;
  return products.reduce((total, product) => {
    const itemSubtotal = (Number(product.price) || 0) * (Number(product.quantity) || 0);
    return total + itemSubtotal;
  }, 0);
}

/**
 * Computes total number of individual inventory units across all products.
 */
export function calculateTotalUnits(products: Product[]): number {
  if (!Array.isArray(products)) return 0;
  return products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);
}

/**
 * Counts products with low stock (quantity < 5 and > 0).
 */
export function getLowStockCount(products: Product[]): number {
  if (!Array.isArray(products)) return 0;
  return products.filter((p) => (Number(p.quantity) || 0) < 5 && (Number(p.quantity) || 0) > 0).length;
}

/**
 * Counts out-of-stock products (quantity === 0).
 */
export function getOutOfStockCount(products: Product[]): number {
  if (!Array.isArray(products)) return 0;
  return products.filter((p) => (Number(p.quantity) || 0) === 0).length;
}

/**
 * Computes total monetary value of all items in the shopping cart.
 */
export function calculateCartTotal(cart: CartItem[]): number {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => {
    const itemTotal = (Number(item.product.price) || 0) * (Number(item.cartQuantity) || 0);
    return total + itemTotal;
  }, 0);
}

/**
 * Computes total number of physical item units in the cart.
 */
export function calculateCartItemCount(cart: CartItem[]): number {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((count, item) => count + (Number(item.cartQuantity) || 0), 0);
}

