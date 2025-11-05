// API Configuration - автоматическое определение URL
const getApiBaseUrl = () => {
  // Если установлена переменная окружения, используем её
  if (process.env.REACT_APP_API_URL) {
    console.log('[API] Using REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    let url = process.env.REACT_APP_API_URL;
    // Убеждаемся, что URL начинается с http:// или https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
      console.log('[API] Added https:// prefix:', url);
    }
    return url;
  }
  
  // Если в production, пытаемся определить URL backend
  if (process.env.NODE_ENV === 'production') {
    // Если backend на том же домене (например, /api), используем относительный путь
    const hostname = window.location.hostname;
    
    // Если это Railway домен, backend обычно на другом поддомене или порту
    // Используем переменную из window (можно установить через инжекцию)
    if (window.__API_URL__) {
      console.log('[API] Using window.__API_URL__:', window.__API_URL__);
      return window.__API_URL__;
    }
    
    // Fallback: используем тот же домен с /api
    const fallbackUrl = `${window.location.protocol}//${hostname}/api`;
    console.warn('[API] No API URL configured, using fallback:', fallbackUrl);
    return fallbackUrl;
  }
  
  // Development: localhost
  const devUrl = 'http://localhost:3001/api';
  console.log('[API] Development mode, using:', devUrl);
  return devUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Log API base URL on load
console.log('[API] API_BASE_URL:', API_BASE_URL);

// Get or generate client ID
const getClientId = () => {
  let clientId = localStorage.getItem('clientId');
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('clientId', clientId);
    console.log('[API] Generated new clientId:', clientId);
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
      
      console.log('[API] Initializing user...', { clientId, apiUrl: API_BASE_URL });
      
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, cookie }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API] Failed to initialize user:', response.status, errorText);
        throw new Error(`Failed to initialize user: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('[API] User initialized successfully:', data);
      return data;
    } catch (error) {
      console.error('[API] Error initializing user:', error.message);
      console.error('[API] Full error:', error);
      console.warn('[API] Continuing in offline mode...');
      // Return offline client ID if API fails
      return { clientId: getClientId(), cart: [], checkout: {} };
    }
  },

  // Update cart
  async updateCart(cart) {
    try {
      const clientId = getClientId();
      
      console.log('[API] Updating cart...', { clientId, itemsCount: cart.length, apiUrl: API_BASE_URL });
      
      const response = await fetch(`${API_BASE_URL}/user/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, cart }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API] Failed to update cart:', response.status, errorText);
        throw new Error(`Failed to update cart: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('[API] Cart updated successfully:', data);
      return data;
    } catch (error) {
      console.error('[API] Error updating cart:', error.message);
      console.error('[API] Full error:', error);
      // Silently fail - cart still works locally
    }
  },

  // Save checkout data
  async saveCheckout(checkoutData) {
    try {
      const clientId = getClientId();
      
      console.log('[API] Saving checkout data...', { clientId, apiUrl: API_BASE_URL });
      
      const response = await fetch(`${API_BASE_URL}/user/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, checkout: checkoutData }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API] Failed to save checkout:', response.status, errorText);
        throw new Error(`Failed to save checkout: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('[API] Checkout data saved successfully:', data);
      return data;
    } catch (error) {
      console.error('[API] Error saving checkout:', error.message);
      console.error('[API] Full error:', error);
      throw error;
    }
  },

  // Get user data
  async getUser() {
    try {
      const clientId = getClientId();
      
      console.log('[API] Getting user data...', { clientId, apiUrl: API_BASE_URL });
      
      const response = await fetch(`${API_BASE_URL}/user/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API] Failed to get user:', response.status, errorText);
        throw new Error(`Failed to get user: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('[API] User data retrieved successfully:', data);
      return data;
    } catch (error) {
      console.error('[API] Error getting user:', error.message);
      console.error('[API] Full error:', error);
      return null;
    }
  },
};

export default api;
