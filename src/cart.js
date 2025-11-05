import React, { useEffect } from "react";
import { LocalizedLink } from "./i18n/LocalizedLink";
import { useTranslation } from "./i18n/useTranslation";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import api from "./utils/api";
import "./cart.css";

const Cart = ({ cart, setCart, addtocart }) => {
  const { t } = useTranslation();
  
  // Sync cart with backend when cart prop changes
  useEffect(() => {
    if (cart && cart.length >= 0) {
      api.updateCart(cart).catch(console.error);
    }
  }, [cart]);
  
  const incqty = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    const newCart = cart.map((curElm) => {
      return curElm.id === product.id
        ? { ...exsit, qty: exsit.qty + 1 }
        : curElm;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const decqty = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    if (exsit.qty > 1) {
      const newCart = cart.map((curElm) => {
        return curElm.id === product.id
          ? { ...exsit, qty: exsit.qty - 1 }
          : curElm;
      });
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  // remove cart product
  const removeproduct = (product) => {
    const newCart = cart.filter((x) => {
      return x.id !== product.id;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  //totalprice
  const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0);
  const discount = 1.3;
  const subtotal = Math.round(Totalprice / discount);
  const discountAmount = Math.round(Totalprice - Totalprice / discount);
  const total = subtotal;
  
  return (
    <div className="cart-page">
      {/* Header Section */}
      <div className="cart-header">
        <div className="breadcrumbs">
          <LocalizedLink to="/" className="breadcrumb-link">{t("nav.home")}</LocalizedLink>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{t("cart.title")}</span>
        </div>
        <h1 className="cart-title">{t("cart.title")}</h1>
        <p className="cart-subtitle">
          {cart.length > 0 
            ? (cart.length === 1 
                ? t("cart.subtitle", { count: cart.length })
                : t("cart.subtitlePlural", { count: cart.length }))
            : ""}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>{t("cart.empty")}</h2>
            <p>{t("cart.emptyDesc")}</p>
            <LocalizedLink to="/product" className="continue-shopping-btn">
              {t("cart.continueShopping")}
            </LocalizedLink>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>{t("cart.items")}</h2>
              </div>
              <div className="cart-items-list">
                {cart.map((curElm) => {
                  const itemPrice = Math.round(curElm.Price / discount);
                  const itemTotal = itemPrice * curElm.qty;
                  
                  return (
                    <div className="cart-item-card" key={curElm.id}>
                      <div className="cart-item-image">
                        <img src={curElm.Img} alt={curElm.Title} />
                      </div>
                      
                      <div className="cart-item-details">
                        <div className="cart-item-header">
                          <div className="cart-item-info">
                            <p className="cart-item-category">{curElm.Cat}</p>
                            <h3 className="cart-item-name">{curElm.Title}</h3>
                            {curElm.Memory && (
                              <p className="cart-item-memory">{curElm.Memory}</p>
                            )}
                          </div>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeproduct(curElm)}
                            title={t("cart.remove")}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>

                        <div className="cart-item-footer">
                          <div className="cart-item-price">
                            <span className="price-label">Price:</span>
                            <span className="price-value">${itemPrice}</span>
                          </div>
                          
                          <div className="cart-item-controls">
                            <div className="quantity-controls">
                              <button 
                                className="quantity-btn"
                                onClick={() => decqty(curElm)}
                                disabled={curElm.qty <= 1}
                              >
                                <AiOutlineMinus />
                              </button>
                              <span className="quantity-value">{curElm.qty}</span>
                              <button 
                                className="quantity-btn"
                                onClick={() => incqty(curElm)}
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                            <div className="cart-item-total">
                              <span className="total-label">Total:</span>
                              <span className="total-value">${itemTotal}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="cart-summary-section">
              <div className="order-summary">
                <h3 className="summary-title">Order Summary</h3>
                
                <div className="summary-row">
                  <span className="summary-label">{t("cart.subtotal")}</span>
                  <span className="summary-value">${subtotal}</span>
                </div>
                
                <div className="summary-row discount-row">
                  <span className="summary-label">{t("cart.discount")}</span>
                  <span className="summary-value discount-value">-${discountAmount}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span className="summary-label">{t("cart.total")}</span>
                  <span className="summary-value total-value">${total}</span>
                </div>

                <LocalizedLink to="/shipbox" className="checkout-btn">
                  {t("cart.checkout")}
                </LocalizedLink>

                <LocalizedLink to="/product" className="continue-shopping-link">
                  ← {t("cart.continueShopping")}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
