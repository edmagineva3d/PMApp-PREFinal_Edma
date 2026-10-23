import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { CATEGORIES } from '../../data/defaultProducts';

interface ProductFormProps {
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  isSubmitting?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Computer Accessories');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [price, setPrice] = useState('2490');
  const [quantity, setQuantity] = useState('10');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, category, description, specifications, price: parseFloat(price), quantity: parseInt(quantity), rating, image }); }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="brutal-input" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="brutal-input">
        {CATEGORIES.filter(c => c !== 'All Products').map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="brutal-input" />
      <textarea value={specifications} onChange={(e) => setSpecifications(e.target.value)} placeholder="Specifications" className="brutal-input" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="brutal-input" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="brutal-input" />
      <button type="submit" className="brutal-btn brutal-btn-primary">Register Product</button>
    </form>
  );
};
