import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Product, CartItem } from '../types/product';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  calculateOverallTotal,
  calculateTotalUnits,
  getLowStockCount,
  getOutOfStockCount,
  calculateCartTotal,
  calculateCartItemCount,
} from '../utils/calculations';

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: string) => void;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProductQuantity: (id: string, delta: number) => void;
  setProductQuantity: (id: string, newQty: number) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  getProductById: (id: string) => Product | undefined;

  // Shopping Cart Actions
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  updateCartQuantity: (productId: string, delta: number) => { success: boolean; message?: string };
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Computed Totals & Metrics
  overallTotal: number;
  totalUnits: number;
  lowStockCount: number;
  outOfStockCount: number;
  cartTotal: number;
  cartItemCount: number;
  filteredProducts: Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'ccdi_inventory_products_v2',
  CART: 'ccdi_inventory_cart_v2',
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  const [cart, setCart] = useLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');

  // Filtered Products based on Category and Search Query
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All Products' ||
        item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

      // Search query filter (matches Name, Category, Description)
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.sku && item.sku.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Overall Inventory Total calculated dynamically using .reduce()
  const overallTotal = useMemo(() => calculateOverallTotal(products), [products]);
  const totalUnits = useMemo(() => calculateTotalUnits(products), [products]);
  const lowStockCount = useMemo(() => getLowStockCount(products), [products]);
  const outOfStockCount = useMemo(() => getOutOfStockCount(products), [products]);

  // Cart Metrics
  const cartTotal = useMemo(() => calculateCartTotal(cart), [cart]);
  const cartItemCount = useMemo(() => calculateCartItemCount(cart), [cart]);

  // Add Product
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      quantity: Math.max(0, Math.floor(Number(productData.quantity) || 0)),
      price: Math.max(0, Number(productData.price) || 0),
      rating: Math.min(5, Math.max(1, Number(productData.rating) || 5)),
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Update Inventory Quantity by delta (+1 / -1)
  const updateProductQuantity = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, (item.quantity || 0) + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Direct set inventory quantity
  const setProductQuantity = (id: string, newQty: number) => {
    const safeQty = Math.max(0, Math.floor(newQty));
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: safeQty };
        }
        return item;
      })
    );
  };

  // Delete Product
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Reset to default exam products
  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setCart([]);
  };

  // Get single product by id
  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  // Add item to Cart (with inventory check)
  const addToCart = (product: Product, quantityToAdd: number = 1): { success: boolean; message: string } => {
    // Check real-time inventory
    const currentProduct = products.find((p) => p.id === product.id) || product;
    if (currentProduct.quantity <= 0) {
      return { success: false, message: `"${currentProduct.name}" is currently Out of Stock!` };
    }

    const existingCartItem = cart.find((item) => item.product.id === product.id);
    const currentInCart = existingCartItem ? existingCartItem.cartQuantity : 0;
    const targetCartQty = currentInCart + quantityToAdd;

    if (targetCartQty > currentProduct.quantity) {
      return {
        success: false,
        message: `Cannot add more. Available inventory is ${currentProduct.quantity} unit(s).`,
      };
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantityToAdd, product: currentProduct }
            : item
        );
      }
      return [...prev, { product: currentProduct, cartQuantity: quantityToAdd }];
    });

    return { success: true, message: `Added "${product.name}" to cart.` };
  };

  // Update Cart Quantity
  const updateCartQuantity = (productId: string, delta: number): { success: boolean; message?: string } => {
    const product = products.find((p) => p.id === productId);
    const existing = cart.find((item) => item.product.id === productId);

    if (!existing) return { success: false, message: 'Item not in cart' };

    const newCartQty = existing.cartQuantity + delta;

    if (newCartQty <= 0) {
      removeFromCart(productId);
      return { success: true, message: 'Removed item from cart' };
    }

    if (product && newCartQty > product.quantity) {
      return {
        success: false,
        message: `Maximum stock reached! Only ${product.quantity} available in inventory.`,
      };
    }

    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, cartQuantity: newCartQty } : item))
    );

    return { success: true };
  };

  // Remove from Cart
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        addProduct,
        updateProductQuantity,
        setProductQuantity,
        deleteProduct,
        resetToDefaults,
        getProductById,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        overallTotal,
        totalUnits,
        lowStockCount,
        outOfStockCount,
        cartTotal,
        cartItemCount,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

