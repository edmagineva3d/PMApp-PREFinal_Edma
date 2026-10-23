export type ProductCategory =
  | 'All Products'
  | 'Computer Accessories'
  | 'Electronics'
  | 'Gaming'
  | 'Storage Devices'
  | 'Other';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  rating: number; // 1 to 5
  price: number; // In Philippine Pesos (PHP)
  quantity: number; // Inventory stock count
  image: string; // URL or base64 Data URL
  createdAt?: string;
  sku?: string;
}

export interface CartItem {
  product: Product;
  cartQuantity: number;
}

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export function getStockStatus(quantity: number): StockStatus {
  if (quantity <= 0) return 'OUT_OF_STOCK';
  if (quantity < 5) return 'LOW_STOCK';
  return 'IN_STOCK';
}

export function getStockLabel(status: StockStatus): string {
  switch (status) {
    case 'IN_STOCK':
      return 'In Stock';
    case 'LOW_STOCK':
      return 'Low Stock (<5)';
    case 'OUT_OF_STOCK':
      return 'Out of Stock';
  }
}

