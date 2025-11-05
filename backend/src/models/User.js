const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  cookie: {
    type: String,
    default: ''
  },
  cart: {
    type: Array,
    default: []
  },
  checkout: {
    email: String,
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    postcode: String,
    country: String
  },
  country: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
