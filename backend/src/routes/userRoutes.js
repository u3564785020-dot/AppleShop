const express = require('express');
const router = express.Router();
const {
  getOrCreateUser,
  updateCart,
  saveCheckout,
  getUser,
  getAllUsers
} = require('../controllers/userController');

// Get or create user
router.post('/user', getOrCreateUser);

// Get user by ID
router.get('/user/:clientId', getUser);

// Update cart
router.post('/user/cart', updateCart);

// Save checkout data
router.post('/user/checkout', saveCheckout);

// Get all users (for admin)
router.get('/users', getAllUsers);

module.exports = router;
