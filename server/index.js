import express, { json } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Mock database
let products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
  { id: 2, name: 'Mouse', price: 29, category: 'Electronics', inStock: true },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture', inStock: false },
];

let nextProductId = 4;

// Mock tokens
const VALID_TOKENS = {
  'user-token-123': { username: 'user', role: 'user' },
  'admin-token-456': { username: 'admin', role: 'admin' },
};

// ===== AUTHENTICATION =====

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'password') {
    res.json({ success: true, token: 'user-token-123', role: 'user' });
  } else if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'admin-token-456', role: 'admin' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = VALID_TOKENS[token];

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ===== PRODUCTS ENDPOINTS =====

// GET all products (200 OK)
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ success: true, data: product });
});

// POST create product (201 Created or 400 Bad Request)
app.post('/api/products', (req, res) => {
  const { name, price, category, inStock } = req.body;

  // Validation - Missing fields (400)
  if (!name || price === undefined) {
    return res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Missing required fields: name and price are required',
      received: req.body
    });
  }

  // Validation - Wrong types
  if (typeof name !== 'string') {
    return res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Field "name" must be a string',
      received: typeof name
    });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Field "price" must be a number, not a string',
      received: { price, type: typeof price }
    });
  }

  // Validation - Business logic (422)
  if (price < 0) {
    return res.status(422).json({ 
      error: 'Unprocessable Entity', 
      message: 'Price cannot be negative',
      validationErrors: { price: 'Must be greater than or equal to 0' }
    });
  }

  const newProduct = {
    id: nextProductId++,
    name,
    price,
    category: category || 'Uncategorized',
    inStock: inStock !== undefined ? inStock : true,
  };

  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// PUT update product (422 for validation errors)
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { price } = req.body;

  if (price !== undefined && price < 0) {
    return res.status(422).json({ 
      error: 'Validation failed', 
      message: 'Price cannot be negative',
      validationErrors: { price: 'Must be >= 0' }
    });
  }

  Object.assign(product, req.body);
  res.json({ success: true, data: product });
});

// DELETE product (204 No Content)
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(204).send();
});

// ===== AUTHENTICATED ENDPOINTS =====

// Profile endpoint (requires authentication - 401 if no token)
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ 
    success: true, 
    data: {
      username: req.user.username,
      role: req.user.role,
      email: `${req.user.username}@example.com`,
    }
  });
});

// Secure endpoint (401 without auth)
app.get('/api/secure', authenticate, (req, res) => {
  res.json({ 
    success: true, 
    message: 'This is protected data',
    data: { secret: 'Only authenticated users can see this' }
  });
});

// Admin endpoint (403 for non-admin users)
app.get('/api/admin/users', authenticate, requireAdmin, (req, res) => {
  res.json({ 
    success: true, 
    data: [
      { id: 1, username: 'user', role: 'user' },
      { id: 2, username: 'admin', role: 'admin' },
    ]
  });
});

// ===== ERROR SCENARIOS =====

// Server error endpoint (500)
app.get('/api/error', (req, res) => {
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: 'Something went wrong on the server' 
  });
});

// Slow endpoint (for timeout testing)
app.get('/api/slow', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  res.json({ success: true, message: 'Finally responded after 5 seconds' });
});

// Users endpoint (for payload debugging)
app.post('/api/users', (req, res) => {
  // Expects flat structure: { name, email, age }
  const { name, email, age, user } = req.body;

  if (user) {
    return res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Expected flat structure, received nested object',
      hint: 'Send { name, email, age } not { user: { name, email, age } }'
    });
  }

  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['name', 'email'],
      received: Object.keys(req.body)
    });
  }

  res.status(201).json({ 
    success: true, 
    data: { id: Date.now(), name, email, age }
  });
});

// Events endpoint (for date format testing)
app.post('/api/events', (req, res) => {
  const { name, date, timestamp } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Check if date is ISO string
  if (date && typeof date === 'object') {
    return res.status(400).json({ 
      error: 'Invalid date format', 
      message: 'Expected ISO string, received Date object',
      hint: 'Use date.toISOString() before sending'
    });
  }

  res.status(201).json({ 
    success: true, 
    data: { id: Date.now(), name, date, timestamp }
  });
});

// Forbidden endpoint (always returns 403)
app.get('/api/admin', (req, res) => {
  res.status(403).json({ 
    error: 'Forbidden', 
    message: 'You do not have permission to access this resource' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: `Cannot ${req.method} ${req.path}` 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`\n📡 Available endpoints:`);
  console.log(`   GET    /api/products`);
  console.log(`   POST   /api/products`);
  console.log(`   GET    /api/products/:id`);
  console.log(`   PUT    /api/products/:id`);
  console.log(`   DELETE /api/products/:id`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/profile (auth required)`);
  console.log(`   GET    /api/secure (auth required)`);
  console.log(`   GET    /api/admin/users (admin required)`);
  console.log(`   GET    /api/error (500 error)`);
  console.log(`   GET    /api/slow (5s delay)`);
  console.log(`\n💡 Test credentials:`);
  console.log(`   User:  username: "user",  password: "password"`);
  console.log(`   Admin: username: "admin", password: "admin123"`);
  console.log(`\n`);
});
