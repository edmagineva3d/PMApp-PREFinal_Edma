import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { CATEGORIES, SAMPLE_PRESET_IMAGES } from '../../data/defaultProducts';
import {
  UploadSimple,
  Trash,
  CheckCircle,
  WarningCircle,
  Sparkle,
  Image as ImageIcon,
  Star,
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/currency';
import { StockBadge } from '../ui/StockBadge';

interface ProductFormProps {
  initialValues?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  isSubmitting?: boolean;
}

interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  specifications?: string;
  rating?: string;
  price?: string;
  quantity?: string;
  image?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Computer Accessories');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [rating, setRating] = useState<number>(5.0);
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('10');
  const [image, setImage] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file format. Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setImageFileName(file.name);
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
      toast.success('Product image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url: string, title: string) => {
    setImage(url);
    setImageFileName(`Preset: ${title}`);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validation function
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name
    if (!name.trim()) {
      newErrors.name = 'Product name is strictly required.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters.';
    }

    // Category
    if (!category || category === 'All Products') {
      newErrors.category = 'Please choose a valid specific product category.';
    }

    // Description
    if (!description.trim()) {
      newErrors.description = 'Product detailed description is required.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters.';
    }

    // Specifications
    if (!specifications.trim()) {
      newErrors.specifications = 'Technical specifications are required.';
    }

    // Image
    if (!image.trim()) {
      newErrors.image = 'Product feature image is required (upload or pick preset).';
    }

    // Price
    const numPrice = parseFloat(price);
    if (price.trim() === '' || isNaN(numPrice)) {
      newErrors.price = 'Price is required and must be a valid number.';
    } else if (numPrice <= 0) {
      newErrors.price = 'Price must be greater than ₱0.00.';
    }

    // Quantity
    const numQty = parseInt(quantity, 10);
    if (quantity.trim() === '' || isNaN(numQty)) {
      newErrors.quantity = 'Inventory quantity is required.';
    } else if (numQty < 0) {
      newErrors.quantity = 'Quantity cannot be negative.';
    }

    // Rating
    if (isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1.0 and 5.0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please resolve the form errors before submitting.');
      return;
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      specifications: specifications.trim(),
      rating: parseFloat(rating.toFixed(1)),
      price: parseFloat(parseFloat(price).toFixed(2)),
      quantity: parseInt(quantity, 10),
      image: image.trim(),
      sku: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onSubmit(payload);
  };

  // Preview subtotal calculation
  const previewPrice = parseFloat(price) || 0;
  const previewQuantity = parseInt(quantity, 10) || 0;
  const previewSubtotal = previewPrice * previewQuantity;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
        gap: 32,
        alignItems: 'start',
      }}
    >
      {/* Left Column: Form Fields */}
      <form onSubmit={handleSubmit} noValidate>
        {/* SECTION 01: Identification */}
        <div
          className="brutal-card"
          style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '0.8rem',
                fontWeight: 900,
                backgroundColor: 'var(--accent-secondary)',
                padding: '4px 8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              01
            </span>
            <h3 style={{ fontSize: '1.15rem' }}>Product Identification</h3>
          </div>

          {/* Product Name */}
          <div style={{ marginBottom: 18 }}>
            <label className="brutal-label" htmlFor="prod-name">
              Product Title / Name *
            </label>
            <input
              id="prod-name"
              type="text"
              className="brutal-input"
              placeholder="e.g. Mechanical Ergonomic Keyboard with Hall Effect Switches"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
            />
            {errors.name && (
              <span
                style={{
                  color: 'var(--status-error)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 6,
                }}
              >
                <WarningCircle size={14} weight="bold" />
                {errors.name}
              </span>
            )}
          </div>

          {/* Category & Rating */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {/* Category */}
            <div>
              <label className="brutal-label" htmlFor="prod-category">
                Category *
              </label>
              <select
                id="prod-category"
                className="brutal-input"
                style={{ cursor: 'pointer' }}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                }}
              >
                {CATEGORIES.filter((c) => c !== 'All Products').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span
                  style={{
                    color: 'var(--status-error)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                  }}
                >
                  <WarningCircle size={14} weight="bold" />
                  {errors.category}
                </span>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="brutal-label" htmlFor="prod-rating">
                Product Rating (1.0 – 5.0) *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  id="prod-rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="brutal-input font-data"
                  value={rating}
                  onChange={(e) => {
                    setRating(parseFloat(e.target.value) || 1);
                    if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '10px 12px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--accent-secondary)',
                    fontWeight: 800,
                  }}
                >
                  <Star size={18} weight="fill" />
                  <span className="font-data">{rating.toFixed(1)}</span>
                </div>
              </div>
              {errors.rating && (
                <span
                  style={{
                    color: 'var(--status-error)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                  }}
                >
                  <WarningCircle size={14} weight="bold" />
                  {errors.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 02: Image Upload & Presets */}
        <div
          className="brutal-card"
          style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '0.8rem',
                fontWeight: 900,
                backgroundColor: 'var(--accent-supporting)',
                padding: '4px 8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              02
            </span>
            <h3 style={{ fontSize: '1.15rem' }}>Feature Image & Media</h3>
          </div>

          <label className="brutal-label">Product Feature Image *</label>

          {/* Upload Dropzone */}
          <div
            style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: 20,
              textAlign: 'center',
              backgroundColor: 'var(--surface-light)',
              marginBottom: 16,
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <UploadSimple size={32} weight="bold" style={{ marginBottom: 8, color: 'var(--accent-primary)' }} />
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
              Click to browse or drop product photo
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 4 }}>
              Supports PNG, JPG, WEBP up to 5MB
            </div>
          </div>

          {/* If image is selected */}
          {image && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--status-success-bg)',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={20} weight="fill" color="var(--status-success)" />
                <span
                  style={{
                    fontFamily: 'var(--font-data)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    maxWidth: 220,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {imageFileName || 'Custom Image Ready'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="brutal-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                >
                  Replace
                </button>
                <button
                  type="button"
                  className="brutal-btn brutal-btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                >
                  <Trash size={14} weight="bold" />
                </button>
              </div>
            </div>
          )}

          {errors.image && (
            <span
              style={{
                color: 'var(--status-error)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginBottom: 12,
              }}
            >
              <WarningCircle size={14} weight="bold" />
              {errors.image}
            </span>
          )}

          {/* Quick Presets Picker */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: 8,
              }}
            >
              Or Pick A Demo Preset:
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                gap: 8,
              }}
            >
              {SAMPLE_PRESET_IMAGES.map((preset) => (
                <div
                  key={preset.title}
                  onClick={() => handleSelectPreset(preset.url, preset.title)}
                  style={{
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: image === preset.url ? '2px 2px 0px var(--accent-primary)' : 'none',
                    borderColor: image === preset.url ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                  title={preset.title}
                >
                  <img
                    src={preset.url}
                    alt={preset.title}
                    style={{ width: '100%', height: 48, objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      textAlign: 'center',
                      padding: '2px 0',
                      backgroundColor: 'var(--surface-light)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {preset.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 03: Pricing & Quantity */}
        <div
          className="brutal-card"
          style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '0.8rem',
                fontWeight: 900,
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                padding: '4px 8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              03
            </span>
            <h3 style={{ fontSize: '1.15rem' }}>Pricing & Stock Quantity</h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {/* Price Input */}
            <div>
              <label className="brutal-label" htmlFor="prod-price">
                Price (PHP ₱) *
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--font-data)',
                    fontWeight: 800,
                    fontSize: '1rem',
                  }}
                >
                  ₱
                </span>
                <input
                  id="prod-price"
                  type="number"
                  step="0.01"
                  min="1"
                  className="brutal-input font-data"
                  style={{ paddingLeft: 32 }}
                  placeholder="2490.00"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
                  }}
                />
              </div>
              {errors.price && (
                <span
                  style={{
                    color: 'var(--status-error)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                  }}
                >
                  <WarningCircle size={14} weight="bold" />
                  {errors.price}
                </span>
              )}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="brutal-label" htmlFor="prod-qty">
                Initial Stock Quantity *
              </label>
              <input
                id="prod-qty"
                type="number"
                min="0"
                step="1"
                className="brutal-input font-data"
                placeholder="10"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: undefined }));
                }}
              />
              {errors.quantity && (
                <span
                  style={{
                    color: 'var(--status-error)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                  }}
                >
                  <WarningCircle size={14} weight="bold" />
                  {errors.quantity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 04: Description & Specifications */}
        <div
          className="brutal-card"
          style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '0.8rem',
                fontWeight: 900,
                backgroundColor: 'var(--surface-light)',
                padding: '4px 8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              04
            </span>
            <h3 style={{ fontSize: '1.15rem' }}>Description & Specifications</h3>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 18 }}>
            <label className="brutal-label" htmlFor="prod-desc">
              Product Detailed Description *
            </label>
            <textarea
              id="prod-desc"
              rows={4}
              className="brutal-input font-body"
              placeholder="Provide a comprehensive narrative description of the item, target audience, and key benefits..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
              }}
            />
            {errors.description && (
              <span
                style={{
                  color: 'var(--status-error)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 6,
                }}
              >
                <WarningCircle size={14} weight="bold" />
                {errors.description}
              </span>
            )}
          </div>

          {/* Specifications */}
          <div>
            <label className="brutal-label" htmlFor="prod-specs">
              Technical Specifications (Key-Value or Lines) *
            </label>
            <textarea
              id="prod-specs"
              rows={4}
              className="brutal-input font-body"
              placeholder="Sensor: PixArt 3395&#10;Connectivity: 2.4GHz Wireless&#10;Battery: 90 Hours..."
              value={specifications}
              onChange={(e) => {
                setSpecifications(e.target.value);
                if (errors.specifications) setErrors((prev) => ({ ...prev, specifications: undefined }));
              }}
            />
            {errors.specifications && (
              <span
                style={{
                  color: 'var(--status-error)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 6,
                }}
              >
                <WarningCircle size={14} weight="bold" />
                {errors.specifications}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            type="submit"
            className="brutal-btn brutal-btn-primary"
            style={{ flex: 1, padding: '14px 24px', fontSize: '1.05rem' }}
            disabled={isSubmitting}
          >
            <Sparkle size={20} weight="bold" />
            <span>{isSubmitting ? 'Registering Product...' : 'Create & Register Product'}</span>
          </button>
          <button
            type="button"
            className="brutal-btn"
            onClick={() => navigate('/products')}
            style={{ padding: '14px 20px' }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Right Column: Live Real-Time Card Preview */}
      <div style={{ position: 'sticky', top: 96 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Live Inventory Preview
          </span>
          <span className="brutal-badge" style={{ backgroundColor: 'var(--accent-secondary)' }}>
            Real-Time
          </span>
        </div>

        {/* Mock Product Card Preview */}
        <div
          className="brutal-card"
          style={{
            overflow: 'hidden',
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          {/* Card Media Header */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '65%',
              backgroundColor: 'var(--surface-light)',
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Product preview"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
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
                  color: 'var(--text-muted)',
                  gap: 8,
                }}
              >
                <ImageIcon size={44} weight="duotone" />
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-data)' }}>
                  Upload image to preview
                </span>
              </div>
            )}

            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <span
                style={{
                  backgroundColor: 'var(--surface-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '2px 2px 0px var(--border-color)',
                }}
              >
                {category}
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'var(--accent-secondary)',
                fontFamily: 'var(--font-data)',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '2px 2px 0px var(--border-color)',
              }}
            >
              <Star size={12} weight="fill" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <StockBadge quantity={previewQuantity} />
            </div>

            <h4
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                marginBottom: 8,
                minHeight: '1.4em',
              }}
            >
              {name || 'New Creative Product Name'}
            </h4>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
                marginBottom: 16,
                minHeight: '2.8em',
              }}
            >
              {description || 'Product description will appear here as you type in the form.'}
            </p>

            {/* Calculations Preview Box */}
            <div
              style={{
                backgroundColor: 'var(--surface-light)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Unit Price:</span>
                <span className="font-data" style={{ fontWeight: 700 }}>
                  {formatCurrency(previewPrice)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Inventory Quantity:</span>
                <span className="font-data" style={{ fontWeight: 700 }}>
                  {previewQuantity} units
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: 6,
                  fontWeight: 800,
                }}
              >
                <span style={{ fontFamily: 'var(--font-heading)' }}>Subtotal (Price × Qty):</span>
                <span className="font-data" style={{ color: 'var(--accent-primary)', fontSize: '1.05rem' }}>
                  {formatCurrency(previewSubtotal)}
                </span>
              </div>
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                fontFamily: 'var(--font-data)',
              }}
            >
              Dynamic calculation using .reduce() upon registration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

