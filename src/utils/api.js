// API Configuration - автоматическое определение URL
const getApiBaseUrl = () => {
  // Если установлена переменная окружения, используем её
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Если в production, пытаемся определить URL backend
  if (process.env.NODE_ENV === 'production') {
    // Если backend на том же домене (например, /api), используем относительный путь
    const hostname = window.location.hostname;
    
    // Если это Railway домен, backend обычно на другом поддомене или порту
    // Используем переменную из window (можно установить через инжекцию)
    if (window.__API_URL__) {
      return window.__API_URL__;
    }
    
    // Fallback: используем тот же домен с /api
    return `${window.location.protocol}//${hostname}/api`;
  }
  
  // Development: localhost
  return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

// Get or generate client ID
const getClientId = () => {
  let clientId = localStorage.getItem('clientId');
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('clientId', clientId);
  }
  return clientId;
};

// Get cookie string
const getCookie = () => {
  return document.cookie;
};

// API Functions
export const api = {
  // Initialize user (create or get)
  async initUser() {
    try {
      const clientId = getClientId();
      const cookie = getCookie();
      
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, cookie }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error initializing user:', error);
      // Return offline client ID if API fails
      return { clientId: getClientId(), cart: [], checkout: {} };
    }
  },

  // Update cart
  async updateCart(cart) {
    try {
      const clientId = getClientId();
      
      const response = await fetch(`${API_BASE_URL}/user/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, cart }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      // Silently fail - cart still works locally
    }
  },

  // Save checkout data
  async saveCheckout(checkoutData) {
    try {
      const clientId = getClientId();
      
      const response = await fetch(`${API_BASE_URL}/user/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, checkout: checkoutData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save checkout');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving checkout:', error);
      throw error;
    }
  },

  // Get user data
  async getUser() {
    try {
      const clientId = getClientId();
      
      const response = await fetch(`${API_BASE_URL}/user/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
};

export default api;
