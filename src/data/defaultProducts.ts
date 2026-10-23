import type { Product } from '../types/product';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Vortex RGB Precision Gaming Mouse',
    category: 'Gaming',
    price: 2850,
    quantity: 14,
    rating: 4.8,
    sku: 'GM-VTX-01',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    description:
      'Ultra-lightweight 58g ergonomic esports gaming mouse equipped with PixArt 3395 optical sensor, 26,000 DPI sensitivity, and 100M click optical switches with zero debounce delay.',
    specifications:
      'Sensor: PixArt 3395 (26,000 DPI)\nWeight: 58 grams ultra-light chassis\nConnectivity: 2.4GHz Wireless / Type-C Paracord\nBattery Life: Up to 90 hours continuous play\nSwitches: Kailh Optical Micro-switches (100M Clicks)',
    createdAt: '2026-10-15T08:00:00Z',
  },
  {
    id: 'prod-002',
    name: 'HyperDrive 8-in-1 Aluminium USB-C Hub',
    category: 'Computer Accessories',
    price: 3490,
    quantity: 4, // LOW STOCK (< 5) to showcase conditional formatting!
    rating: 4.7,
    sku: 'HUB-ALU-08',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
    description:
      'Precision-milled aerospace aluminum multi-port adapter featuring 4K 60Hz HDMI video output, 100W Power Delivery pass-through charging, Gigabit Ethernet, and dual high-speed UHS-II SD card readers.',
    specifications:
      'Video Output: HDMI 2.0 (4K @ 60Hz HDR)\nPower Delivery: 100W USB-C PD 3.0\nData Ports: 3x USB-A 3.2 Gen 2 (10Gbps)\nEthernet: RJ45 Gigabit 1000Mbps\nEnclosure: CNC Anodized Space Gray Aluminum',
    createdAt: '2026-10-16T09:30:00Z',
  },
  {
    id: 'prod-003',
    name: 'TitanShield 1TB Rugged Portable NVMe SSD',
    category: 'Storage Devices',
    price: 5890,
    quantity: 8,
    rating: 4.9,
    sku: 'SSD-TTN-1TB',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    description:
      'Blazing fast external solid-state drive delivering read speeds up to 1050 MB/s. Built into an IP65 water-and-dust resistant silicone armored shell capable of withstanding 3-meter drops.',
    specifications:
      'Capacity: 1 Terabyte NVMe M.2\nTransfer Speed: Up to 1,050 MB/s Read, 1,000 MB/s Write\nDurability: IP65 Rated Water/Dust Resistance & 3M Drop Protection\nInterface: USB 3.2 Gen 2 (10Gbps) Type-C\nHardware Encryption: AES 256-bit Password Protection',
    createdAt: '2026-10-17T11:15:00Z',
  },
  {
    id: 'prod-004',
    name: 'AeroPulse 15W Qi Fast Wireless Charging Pad',
    category: 'Electronics',
    price: 1650,
    quantity: 2, // LOW STOCK (< 5)
    rating: 4.5,
    sku: 'CHG-QI-15W',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80',
    description:
      'Sleek circular wireless charging stand with smart temperature management circuitry, non-slip textured silicone base, and adaptive magnetic alignment for all Qi-compatible smartphones and earphone cases.',
    specifications:
      'Output Power: 15W / 10W / 7.5W / 5W Adaptive Fast Charging\nInput: USB-C 9V/2A or 12V/1.5A QuickCharge 3.0\nSafety: Foreign Object Detection & Over-Voltage Prevention\nFinish: Matte Soft-Touch Polycarbonate with Zinc Trim\nLED Indicator: Subtle breathing ambient status glow',
    createdAt: '2026-10-18T14:20:00Z',
  },
  {
    id: 'prod-005',
    name: 'ApexVision 4K Ultra HD Pro Streaming Webcam',
    category: 'Computer Accessories',
    price: 4950,
    quantity: 6,
    rating: 4.6,
    sku: 'CAM-APX-4K',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description:
      'Broadcast-quality 4K webcam featuring a Sony STARVIS CMOS sensor, dual omnidirectional noise-canceling stereo microphones, AI face tracking autofocus, and an integrated physical magnetic privacy shutter.',
    specifications:
      'Resolution: 4K UHD @ 30fps / 1080p @ 60fps HDR\nField of View: Adjustable 65° / 78° / 90° Diagonal FOV\nAudio: Dual Stereo Microphones with AI Noise Reduction\nMounting: Universal Monitor Clip + 1/4-inch Tripod Thread\nPrivacy: Sliding Mechanical Privacy Shutter',
    createdAt: '2026-10-19T10:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'PulseCore Pro Acoustic Gaming Headset',
    category: 'Gaming',
    price: 4200,
    quantity: 11,
    rating: 4.8,
    sku: 'HDS-PULSE-PRO',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    description:
      'Audiophile-grade 53mm neodymium drivers tuned for immersive spatial sound. Features memory foam cooling gel ear cushions, detachable broadcast-grade condenser microphone, and universal cross-platform compatibility.',
    specifications:
      'Drivers: 53mm Neodymium Magnets with Acoustic Chambers\nFrequency Response: 15 Hz – 28,000 Hz\nMicrophone: Detachable Bi-directional Noise Cancelling Boom\nEar Cushions: Breathable Protein Leather with Memory Foam\nWeight: 275g Lightweight Ergonomic Headband',
    createdAt: '2026-10-20T16:45:00Z',
  },
];

export const CATEGORIES = [
  'All Products',
  'Computer Accessories',
  'Electronics',
  'Gaming',
  'Storage Devices',
  'Other',
] as const;

export const SAMPLE_PRESET_IMAGES = [
  {
    title: 'Gaming Mouse',
    url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'USB-C Hub',
    url: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Portable SSD',
    url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Wireless Charger',
    url: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '4K Webcam',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Gaming Headset',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mechanical Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Smart Smartwatch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
];

