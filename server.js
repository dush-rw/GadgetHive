import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  createHmac,
  pbkdf2Sync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import sqlite3 from "sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseDir = path.join(__dirname, "data");
const databasePath = path.join(databaseDir, "gadgethive.sqlite");

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const db = new sqlite3.Database(databasePath);
const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "gadgethive-development-secret";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const runAsync = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });

const getAsync = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });

const allAsync = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const toBase64Url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

const fromBase64Url = (value) =>
  Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 310000, 64, "sha256").toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  const [salt, hash] = storedHash.split(":");
  const derivedHash = pbkdf2Sync(password, salt, 310000, 64, "sha256").toString(
    "hex",
  );
  return (
    hash.length === derivedHash.length &&
    timingSafeEqual(Buffer.from(hash), Buffer.from(derivedHash))
  );
};

const formatUser = (row) =>
  row && {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
  };

const signToken = (user) => {
  const payload = JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  });
  const encodedPayload = toBase64Url(payload);
  const signature = toBase64Url(
    createHmac("sha256", JWT_SECRET).update(encodedPayload).digest(),
  );
  return `${encodedPayload}.${signature}`;
};

const verifyToken = (token) => {
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;

    const expectedSignature = toBase64Url(
      createHmac("sha256", JWT_SECRET).update(encodedPayload).digest(),
    );
    const signatureBuffer = fromBase64Url(signature);
    const expectedSignatureBuffer = fromBase64Url(expectedSignature);

    if (
      signatureBuffer.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(fromBase64Url(encodedPayload).toString("utf8"));
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: "Invalid or expired session." });
    }

    const user = await getAsync(
      `SELECT id, first_name, last_name, email, phone, role FROM users WHERE id = ?;`,
      [payload.sub],
    );

    if (!user) {
      return res.status(401).json({ error: "Session no longer exists." });
    }

    req.user = formatUser(user);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
};

const formatProduct = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: row.price,
  originalPrice: row.original_price,
  image: row.image_url,
  description: row.description,
  rating: row.rating,
  reviews: row.review_count,
  inStock: Boolean(row.in_stock),
  featured: Boolean(row.featured),
  specs: JSON.parse(row.specs || "[]"),
});

const initDatabase = async () => {
  await runAsync(`PRAGMA foreign_keys = ON;`);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      image_url TEXT,
      rating REAL DEFAULT 0,
      review_count INTEGER DEFAULT 0,
      in_stock INTEGER DEFAULT 1,
      featured INTEGER DEFAULT 0,
      specs TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      city TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const adminRow = await getAsync(`SELECT id FROM users WHERE role = 'admin';`);
  if (!adminRow) {
    await runAsync(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        "Store",
        "Owner",
        "admin@gadgethive.com",
        "",
        hashPassword("admin123"),
        "admin",
      ],
    );
  }

  await runAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      order_number TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_method TEXT,
      subtotal REAL NOT NULL,
      shipping_cost REAL DEFAULT 0,
      total REAL NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      total_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  const countRow = await getAsync(`SELECT COUNT(*) as count FROM products;`);
  if (countRow?.count === 0) {
    const { products, categories } = await import("./src/data/products.js");

    await runAsync(`BEGIN TRANSACTION;`);
    for (const category of categories) {
      await runAsync(
        `INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?);`,
        [category.name, category.id, category.description || ""],
      );
    }
    await runAsync(`COMMIT;`);

    await runAsync(`BEGIN TRANSACTION;`);
    for (const product of products) {
      await runAsync(
        `INSERT INTO products (id, name, description, category, price, original_price, image_url, rating, review_count, in_stock, featured, specs)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          product.id,
          product.name,
          product.description,
          product.category,
          product.price,
          product.originalPrice,
          product.image,
          product.rating,
          product.reviews,
          product.inStock ? 1 : 0,
          product.featured ? 1 : 0,
          JSON.stringify(product.specs || []),
        ],
      );
    }
    await runAsync(`COMMIT;`);
  }
};

app.get("/api/categories", async (req, res) => {
  try {
    const rows = await allAsync(
      `SELECT slug, name FROM categories ORDER BY name ASC;`,
    );
    res.json(rows.map((row) => ({ id: row.slug, name: row.name })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const category = req.query.category;
    let rows;
    if (category) {
      rows = await allAsync(
        `SELECT * FROM products WHERE category = ? ORDER BY id DESC;`,
        [category],
      );
    } else {
      rows = await allAsync(`SELECT * FROM products ORDER BY id DESC;`);
    }
    res.json(rows.map(formatProduct));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const row = await getAsync(`SELECT * FROM products WHERE id = ?;`, [
      req.params.id,
    ]);
    if (!row) return res.status(404).json({ error: "Product not found" });
    res.json(formatProduct(row));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const normalizedFirstName = String(firstName || "").trim();
    const normalizedLastName = String(lastName || "").trim();

    if (
      !normalizedFirstName ||
      !normalizedLastName ||
      !normalizedEmail ||
      !password ||
      password.length < 6
    ) {
      return res.status(400).json({
        error:
          "First name, last name, email, and a 6+ character password are required.",
      });
    }

    const existingUser = await getAsync(
      `SELECT id FROM users WHERE email = ?;`,
      [normalizedEmail],
    );
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with this email exists." });
    }

    const result = await runAsync(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
       VALUES (?, ?, ?, ?, ?, 'customer');`,
      [
        normalizedFirstName,
        normalizedLastName,
        normalizedEmail,
        String(phone || "").trim(),
        hashPassword(password),
      ],
    );

    const userRow = await getAsync(`SELECT * FROM users WHERE id = ?;`, [
      result.lastID,
    ]);
    const user = formatUser(userRow);

    res.status(201).json({ user, token: signToken(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const userRow = await getAsync(`SELECT * FROM users WHERE email = ?;`, [
      normalizedEmail,
    ]);

    if (!userRow || !verifyPassword(password, userRow.password_hash)) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = formatUser(userRow);
    res.json({ user, token: signToken(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/auth/me", authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/products", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      originalPrice,
      image,
      description,
      rating,
      reviews,
      featured,
      specs,
    } = req.body;
    const nextIdRow = await getAsync(
      `SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM products;`,
    );
    const nextId = nextIdRow.nextId;
    await runAsync(
      `INSERT INTO products (id, name, category, price, original_price, image_url, description, rating, review_count, in_stock, featured, specs)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?);`,
      [
        nextId,
        name,
        category,
        price,
        originalPrice,
        image,
        description,
        rating,
        reviews,
        featured ? 1 : 0,
        JSON.stringify(specs || []),
      ],
    );
    const newProduct = await getAsync(`SELECT * FROM products WHERE id = ?;`, [
      nextId,
    ]);
    res.status(201).json(formatProduct(newProduct));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete(
  "/api/products/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      await runAsync(`DELETE FROM products WHERE id = ?;`, [req.params.id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

app.post("/api/orders", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      paymentMethod,
      notes,
      items,
      subtotal,
      total,
    } = req.body;
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Order must include at least one item." });
    }

    await runAsync(`BEGIN TRANSACTION;`);
    let customer = await getAsync(`SELECT * FROM customers WHERE email = ?;`, [
      email,
    ]);
    if (!customer) {
      const customerResult = await runAsync(
        `INSERT INTO customers (first_name, last_name, email, phone, address, city)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [firstName, lastName, email, phone, address, city],
      );
      customer = await getAsync(`SELECT * FROM customers WHERE id = ?;`, [
        customerResult.lastID,
      ]);
    } else {
      await runAsync(
        `UPDATE customers SET first_name = ?, last_name = ?, phone = ?, address = ?, city = ? WHERE id = ?;`,
        [firstName, lastName, phone, address, city, customer.id],
      );
    }

    const orderNumber = `GH-${Date.now().toString(36).toUpperCase()}`;
    const orderResult = await runAsync(
      `INSERT INTO orders (customer_id, order_number, payment_method, subtotal, shipping_cost, total, notes)
       VALUES (?, ?, ?, ?, 0, ?, ?);`,
      [customer.id, orderNumber, paymentMethod, subtotal, total, notes],
    );

    const orderId = orderResult.lastID;
    for (const item of items) {
      await runAsync(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
         VALUES (?, ?, ?, ?, ?);`,
        [
          orderId,
          item.id,
          item.quantity,
          item.price,
          item.price * item.quantity,
        ],
      );
    }

    await runAsync(`COMMIT;`);
    res.status(201).json({ orderNumber });
  } catch (error) {
    await runAsync(`ROLLBACK;`).catch(() => {});
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/orders", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await allAsync(`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.payment_method,
        o.subtotal,
        o.shipping_cost,
        o.total,
        o.notes,
        o.created_at,
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        c.address,
        c.city
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC;
    `);

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await allAsync(
          `
          SELECT 
            oi.id,
            oi.quantity,
            oi.unit_price,
            oi.total_price,
            p.name,
            p.image_url
          FROM order_items oi
          LEFT JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?;
          `,
          [order.id],
        );
        return { ...order, items };
      }),
    );

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
