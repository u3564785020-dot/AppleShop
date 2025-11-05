require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.RAILWAY_PUBLIC_DOMAIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Trust proxy for Railway
app.set('trust proxy', true);

// Routes
app.use('/api', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'AppleShop Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/health',
      createUser: 'POST /api/user',
      getUser: 'GET /api/user/:clientId',
      updateCart: 'POST /api/user/cart',
      saveCheckout: 'POST /api/user/checkout',
      getAllUsers: 'GET /api/users'
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB: ${process.env.MONGODB_URI || process.env.MONGO_URL ? 'Connected' : 'Not configured'}`);
});

module.exports = app;
