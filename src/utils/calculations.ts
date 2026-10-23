import type { Product } from '../types/product';

export function calculateSubtotal(price: number, quantity: number): number {
  return (Number(price) || 0) * (Number(quantity) || 0);
}
