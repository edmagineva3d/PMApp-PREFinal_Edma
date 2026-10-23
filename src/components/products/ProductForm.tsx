import React, { useState, useRef } from 'react';
import type { Product } from '../../types/product';
import { CATEGORIES, SAMPLE_PRESET_IMAGES } from '../../data/defaultProducts';
import { UploadSimple } from '@phosphor-icons/react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, category, description, specifications, price: parseFloat(price), quantity: parseInt(quantity), rating, image }); }}>
      <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer', border: '2px dashed var(--border-color)', padding: 16 }}>
        <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
        <UploadSimple size={24} />
        <span>Upload Product Image</span>
      </div>
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
