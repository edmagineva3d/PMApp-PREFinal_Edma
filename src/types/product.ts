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
  rating: number;
  price: number;
  quantity: number;
  image: string;
  createdAt?: string;
  sku?: string;
}

export interface CartItem {
  product: Product;
  cartQuantity: number;
}
