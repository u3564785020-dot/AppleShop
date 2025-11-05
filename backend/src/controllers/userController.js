const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const geoip = require('geoip-lite');

// Get or create user by clientId
const getOrCreateUser = async (req, res) => {
  try {
    const { clientId, cookie } = req.body;
    
    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    let user = await User.findOne({ clientId });

    if (!user) {
      // Get country from IP
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
      const geo = geoip.lookup(ip);
      const country = geo ? geo.country : 'Unknown';

      user = new User({
        clientId,
        cookie: cookie || '',
        cart: [],
        country,
        ipAddress: ip
      });
      await user.save();
    } else {
      // Update cookie if provided
      if (cookie) {
        user.cookie = cookie;
        await user.save();
      }
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getOrCreateUser:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update cart
const updateCart = async (req, res) => {
  try {
    const { clientId, cart } = req.body;

    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const user = await User.findOne({ clientId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart = cart || [];
    await user.save();

    res.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Error in updateCart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Save checkout data
const saveCheckout = async (req, res) => {
  try {
    const { clientId, checkout } = req.body;

    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const user = await User.findOne({ clientId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.checkout = checkout || {};
    await user.save();

    res.json({ success: true, checkout: user.checkout });
  } catch (error) {
    console.error('Error in saveCheckout:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user data
const getUser = async (req, res) => {
  try {
    const { clientId } = req.params;

    const user = await User.findOne({ clientId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users (for admin purposes)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getOrCreateUser,
  updateCart,
  saveCheckout,
  getUser,
  getAllUsers
};
