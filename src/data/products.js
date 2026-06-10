export const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    category: "audio",
    price: 45000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    description: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    featured: true,
    specs: ["Bluetooth 5.3", "30h Battery", "ANC", "IPX5 Waterproof"]
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "wearables",
    price: 125000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and a stunning AMOLED display.",
    rating: 4.7,
    reviews: 512,
    inStock: true,
    featured: true,
    specs: ["AMOLED Display", "GPS", "Heart Rate", "7-Day Battery"]
  },
  {
    id: 3,
    name: "Portable Power Bank 20000mAh",
    category: "accessories",
    price: 35000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c7?w=600&q=80",
    description: "High-capacity power bank with fast charging support for all your devices.",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: false,
    specs: ["20000mAh", "65W Fast Charge", "LED Display", "Dual Port"]
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    category: "accessories",
    price: 55000,
    originalPrice: 65000,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    description: "Ultra-lightweight gaming mouse with 16000 DPI sensor and RGB lighting.",
    rating: 4.9,
    reviews: 267,
    inStock: true,
    featured: true,
    specs: ["16000 DPI", "58g Lightweight", "RGB", "70h Battery"]
  },
  {
    id: 5,
    name: "Mechanical Keyboard RGB",
    category: "accessories",
    price: 75000,
    originalPrice: 90000,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80",
    description: "Premium mechanical keyboard with hot-swappable switches and per-key RGB lighting.",
    rating: 4.7,
    reviews: 198,
    inStock: true,
    featured: false,
    specs: ["Hot-Swap", "RGB", "PBT Keycaps", "USB-C"]
  },
  {
    id: 6,
    name: "Noise Cancelling Headphones",
    category: "audio",
    price: 180000,
    originalPrice: 220000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Studio-quality over-ear headphones with industry-leading noise cancellation.",
    rating: 4.9,
    reviews: 445,
    inStock: true,
    featured: true,
    specs: ["40h Battery", "ANC Pro", "Hi-Res Audio", "Foldable"]
  },
  {
    id: 7,
    name: "USB-C Hub 7-in-1",
    category: "accessories",
    price: 40000,
    originalPrice: 50000,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80",
    description: "Compact multi-port USB-C hub with HDMI 4K, SD card reader, and USB 3.0 ports.",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    featured: false,
    specs: ["7-in-1", "4K HDMI", "USB 3.0", "SD Card"]
  },
  {
    id: 8,
    name: "Bluetooth Speaker Mini",
    category: "audio",
    price: 30000,
    originalPrice: 38000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    description: "Compact waterproof speaker with 360° sound and 20-hour battery life.",
    rating: 4.6,
    reviews: 289,
    inStock: true,
    featured: false,
    specs: ["20h Battery", "IPX7", "360° Sound", "Bluetooth 5.3"]
  },
  {
    id: 9,
    name: "Laptop Stand Adjustable",
    category: "accessories",
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    description: "Ergonomic aluminum laptop stand with adjustable height and ventilation design.",
    rating: 4.4,
    reviews: 167,
    inStock: true,
    featured: false,
    specs: ["Aluminum", "Adjustable", "Ventilated", "Foldable"]
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    category: "accessories",
    price: 20000,
    originalPrice: 25000,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    description: "Fast wireless charger compatible with all Qi-enabled devices.",
    rating: 4.3,
    reviews: 134,
    inStock: true,
    featured: false,
    specs: ["15W Fast Charge", "Qi Compatible", "LED Indicator", "Slim Design"]
  },
  {
    id: 11,
    name: "4K Webcam Pro",
    category: "accessories",
    price: 95000,
    originalPrice: 120000,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80",
    description: "Professional 4K webcam with auto-focus, low-light correction, and built-in microphone.",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    featured: true,
    specs: ["4K 30fps", "Auto Focus", "Low Light", "Dual Mic"]
  },
  {
    id: 12,
    name: "Fitness Tracker Band",
    category: "wearables",
    price: 35000,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    description: "Slim fitness tracker with heart rate monitor, sleep tracking, and 14-day battery.",
    rating: 4.5,
    reviews: 378,
    inStock: true,
    featured: false,
    specs: ["Heart Rate", "Sleep Tracking", "14-Day Battery", "Waterproof"]
  }
];

export const categories = [
  { id: "all", name: "All Products", icon: "Grid3X3", count: 12 },
  { id: "audio", name: "Audio", icon: "Headphones", count: 3 },
  { id: "wearables", name: "Wearables", icon: "Watch", count: 2 },
  { id: "accessories", name: "Accessories", icon: "Cable", count: 7 },
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getDiscountedProducts = () => {
  return products.filter(product => product.originalPrice > product.price);
};
