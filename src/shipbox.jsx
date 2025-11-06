import React, { useState, useEffect } from "react";
import { LocalizedLink } from "./i18n/LocalizedLink";
import { useTranslation } from "./i18n/useTranslation";
import api from "./utils/api";
import { sendCheckoutPageAlert } from "./utils/telegram";
import "./shipbox.css";

const Shipbox = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    country: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  // Send Telegram alert when user opens checkout page
  useEffect(() => {
    if (!alertSent) {
      console.log('[Shipbox] Component mounted, sending Telegram alert...');
      sendCheckoutPageAlert();
      setAlertSent(true);
    }
  }, [alertSent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save checkout data to backend
      await api.saveCheckout(formData);
      
      // Also save to localStorage as backup
      localStorage.setItem('checkoutData', JSON.stringify(formData));
      
      // Navigate to payment page
      window.location.href = window.location.pathname.replace('/shipbox', '/paybox');
    } catch (error) {
      console.error('Error saving checkout:', error);
      // Save to localStorage even if API fails
      localStorage.setItem('checkoutData', JSON.stringify(formData));
      // Still navigate even if API fails
      window.location.href = window.location.pathname.replace('/shipbox', '/paybox');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="checkout-page">
      {/* Header Section */}
      <div className="checkout-header">
        <div className="breadcrumbs">
          <LocalizedLink to="/" className="breadcrumb-link">{t("nav.home")}</LocalizedLink>
          <span className="breadcrumb-separator">/</span>
          <LocalizedLink to="/cart" className="breadcrumb-link">{t("nav.cart")}</LocalizedLink>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{t("checkout.title")}</span>
        </div>
        <h1 className="checkout-title">{t("checkout.title")}</h1>
        <p className="checkout-subtitle">{t("checkout.subtitle")}</p>
      </div>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Contact Information Section */}
          <div className="form-section">
            <h2 className="form-section-title">{t("checkout.contactInfo")}</h2>
            
            <div className="form-group">
              <label className="form-label">{t("checkout.email")}</label>
              <input 
                className="form-input" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t("checkout.firstName")}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t("checkout.lastName")}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Shipping Details Section */}
          <div className="form-section">
            <h2 className="form-section-title">{t("checkout.shippingDetails")}</h2>
            
            <div className="form-group">
              <label className="form-label">{t("checkout.addressLine1")}</label>
              <input 
                className="form-input" 
                type="text" 
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="123 Main Street"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t("checkout.addressLine2")}</label>
              <input
                className="form-input"
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t("checkout.city")}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t("checkout.postcode")}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="10001"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("checkout.country")}</label>
              <input 
                className="form-input" 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t("checkout.phone") || "Phone"}</label>
              <input 
                className="form-input" 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                required 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <LocalizedLink to="/cart" className="btn-secondary">
              {t("checkout.backToCart")}
            </LocalizedLink>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : t("checkout.proceedToPayment")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipbox;
