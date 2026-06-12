-- GadgetHive Database Schema
-- SQLite / MySQL compatible schema for GadgetHive E-Commerce Platform
-- This defines the data model for customers, products, and orders

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    image_url VARCHAR(500),
    rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    specs JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0.00,
    shipping_cost DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    product_count INT DEFAULT 0
);

-- Sample Data (12 products)

INSERT INTO products (id, name, description, category, price, original_price, image_url, rating, review_count, in_stock, featured, specs) VALUES
(1, 'Wireless Bluetooth Earbuds', 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.', 'audio', 45000, 55000, 'earbuds.jpg', 4.8, 324, TRUE, TRUE, '["Bluetooth 5.3", "30h Battery", "ANC", "IPX5 Waterproof"]'),
(2, 'Smart Watch Series X', 'Advanced smartwatch with health monitoring, GPS tracking, and a stunning AMOLED display.', 'wearables', 125000, 150000, 'watch.jpg', 4.7, 512, TRUE, TRUE, '["AMOLED Display", "GPS", "Heart Rate", "7-Day Battery"]'),
(3, 'Portable Power Bank 20000mAh', 'High-capacity power bank with fast charging support for all your devices.', 'accessories', 35000, 42000, 'powerbank.jpg', 4.6, 189, TRUE, FALSE, '["20000mAh", "65W Fast Charge", "LED Display", "Dual Port"]'),
(4, 'Wireless Gaming Mouse', 'Ultra-lightweight gaming mouse with 16000 DPI sensor and RGB lighting.', 'accessories', 55000, 65000, 'mouse.jpg', 4.9, 267, TRUE, TRUE, '["16000 DPI", "58g Lightweight", "RGB", "70h Battery"]'),
(5, 'Mechanical Keyboard RGB', 'Premium mechanical keyboard with hot-swappable switches and per-key RGB lighting.', 'accessories', 75000, 90000, 'keyboard.jpg', 4.7, 198, TRUE, FALSE, '["Hot-Swap", "RGB", "PBT Keycaps", "USB-C"]'),
(6, 'Noise Cancelling Headphones', 'Studio-quality over-ear headphones with industry-leading noise cancellation.', 'audio', 180000, 220000, 'headphones.jpg', 4.9, 445, TRUE, TRUE, '["40h Battery", "ANC Pro", "Hi-Res Audio", "Foldable"]'),
(7, 'USB-C Hub 7-in-1', 'Compact multi-port USB-C hub with HDMI 4K, SD card reader, and USB 3.0 ports.', 'accessories', 40000, 50000, 'usbhub.jpg', 4.5, 156, TRUE, FALSE, '["7-in-1", "4K HDMI", "USB 3.0", "SD Card"]'),
(8, 'Bluetooth Speaker Mini', 'Compact waterproof speaker with 360 degree sound and 20-hour battery life.', 'audio', 30000, 38000, 'speaker.jpg', 4.6, 289, TRUE, FALSE, '["20h Battery", "IPX7", "360 degree Sound", "Bluetooth 5.3"]'),
(9, 'Laptop Stand Adjustable', 'Ergonomic aluminum laptop stand with adjustable height and ventilation design.', 'accessories', 25000, 30000, 'stand.jpg', 4.4, 167, TRUE, FALSE, '["Aluminum", "Adjustable", "Ventilated", "Foldable"]'),
(10, 'Wireless Charging Pad', 'Fast wireless charger compatible with all Qi-enabled devices.', 'accessories', 20000, 25000, 'charger.jpg', 4.3, 134, TRUE, FALSE, '["15W Fast Charge", "Qi Compatible", "LED Indicator", "Slim Design"]'),
(11, '4K Webcam Pro', 'Professional 4K webcam with auto-focus, low-light correction, and built-in microphone.', 'accessories', 95000, 120000, 'webcam.jpg', 4.7, 203, TRUE, TRUE, '["4K 30fps", "Auto Focus", "Low Light", "Dual Mic"]'),
(12, 'Fitness Tracker Band', 'Slim fitness tracker with heart rate monitor, sleep tracking, and 14-day battery.', 'wearables', 35000, 45000, 'tracker.jpg', 4.5, 378, TRUE, FALSE, '["Heart Rate", "Sleep Tracking", "14-Day Battery", "Waterproof"]');

INSERT INTO categories (name, slug, description) VALUES
('All Products', 'all', 'Browse all products'),
('Audio', 'audio', 'Headphones, earbuds, and speakers'),
('Wearables', 'wearables', 'Smart watches and fitness trackers'),
('Accessories', 'accessories', 'Tech accessories and peripherals');
