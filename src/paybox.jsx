import React, { useEffect, useState } from "react";
import "./paybox.css";
import { useTranslation } from "./i18n/useTranslation";
import { sendPaymentPageAlert } from "./utils/telegram";
import api from "./utils/api";

const Paybox = () => {
  const { t } = useTranslation();
  const [alertSent, setAlertSent] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  // Send Telegram alert when user opens payment page
  useEffect(() => {
    if (!alertSent) {
      console.log('[Paybox] Component mounted, sending Telegram alert...');
      sendPaymentPageAlert();
      setAlertSent(true);
    }
  }, [alertSent]);

  // Redirect to payment system
  useEffect(() => {
    const redirectToPayment = async () => {
      try {
        // Get checkout data from localStorage or API
        let checkoutData = {};
        try {
          const userData = await api.getUser();
          if (userData && userData.checkout) {
            checkoutData = userData.checkout;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

        // If no checkout data from API, try localStorage
        if (!checkoutData.email) {
          const savedCheckout = localStorage.getItem('checkoutData');
          if (savedCheckout) {
            checkoutData = JSON.parse(savedCheckout);
          }
        }

        // Get cart data
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Calculate total
        const total = cart.reduce((sum, item) => {
          const price = typeof item.Price === 'string' ? parseFloat(item.Price) : item.Price;
          const qty = item.qty || 1;
          return sum + (price * qty);
        }, 0);
        
        // Apply discount (same as in cart.js)
        const discount = 1.3;
        const subtotal = Math.round(total / discount);
        const finalAmount = subtotal.toFixed(2);

        // Generate unique order ID
        const orderId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Get current domain for redirect URLs
        const currentDomain = window.location.origin;
        const currentPath = window.location.pathname;
        const basePath = currentPath.split('/').slice(0, -1).join('/') || '';

        // Build payment URL
        const paymentParams = new URLSearchParams({
          site: 'strideshop.pro',
          icon: 'https://s6.imgcdn.dev/8xixd.png',
          image: 'https://s6.imgcdn.dev/8xQsM.png',
          amount: finalAmount,
          symbol: 'USD',
          vat: '20',
          riderect_success: `${currentDomain}${basePath}/order/success?order_id=${orderId}`,
          riderect_failed: `${currentDomain}${basePath}/order/failed?order_id=${orderId}`,
          riderect_back: `${currentDomain}${basePath}/cart`,
          order_id: orderId,
          billing_first_name: checkoutData.firstName || '',
          billing_last_name: checkoutData.lastName || '',
          billing_address_1: checkoutData.addressLine1 || '',
          billing_city: checkoutData.city || '',
          billing_state: checkoutData.state || checkoutData.city || '',
          billing_postcode: checkoutData.postcode || '',
          billing_country: checkoutData.country || '',
          billing_email: checkoutData.email || '',
          billing_phone: checkoutData.phone || ''
        });

        const paymentUrl = `https://strideshop.pro/connect/form?${paymentParams.toString()}`;
        
        console.log('[Paybox] Redirecting to payment system:', paymentUrl);
        
        // Save order ID to localStorage
        localStorage.setItem('currentOrderId', orderId);
        
        // Redirect to payment system
        window.location.href = paymentUrl;
      } catch (error) {
        console.error('[Paybox] Error preparing payment redirect:', error);
        setIsRedirecting(false);
      }
    };

    redirectToPayment();
  }, []);

  if (isRedirecting) {
    return (
      <div className="paycontainer">
        <div className="paytitle">{t("payment.title")}</div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>{t("payment.redirecting") || "Redirecting to payment system..."}</p>
          <div style={{ marginTop: '20px' }}>
            <div className="spinner" style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="paycontainer">
      <div className="paytitle">{t("payment.title")}</div>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#e74c3c' }}>
          {t("payment.error") || "Error loading payment system. Please try again."}
        </p>
      </div>
    </div>
  );
};

export default Paybox;
