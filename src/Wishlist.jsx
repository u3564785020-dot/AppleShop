import React from "react";
import { LocalizedLink } from "./i18n/LocalizedLink";
import { useTranslation } from "./i18n/useTranslation";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import "./Wishlist.css";

const Wishlist = ({ wishlist, addToWishlist, addtocart, view }) => {
  const { t } = useTranslation();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="breadcrumbs">
          <LocalizedLink to="/" className="breadcrumb-link">{t("nav.home")}</LocalizedLink>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{t("wishlist.title")}</span>
        </div>
        <h1 className="wishlist-title">{t("wishlist.title")}</h1>
        <p className="wishlist-subtitle">
          {wishlist.length > 0 
            ? (wishlist.length === 1 
                ? t("wishlist.subtitle", { count: wishlist.length })
                : t("wishlist.subtitlePlural", { count: wishlist.length }))
            : t("wishlist.empty")}
        </p>
      </div>

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>{t("wishlist.empty")}</h2>
            <p>{t("wishlist.emptyDesc")}</p>
            <LocalizedLink to="/product" className="continue-shopping-btn">
              {t("wishlist.continueShopping")}
            </LocalizedLink>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <button 
                  className="remove-btn"
                  onClick={() => addToWishlist(item)}
                  title={t("wishlist.removeFromWishlist")}
                >
                  <AiOutlineClose />
                </button>
                
                {item.Price < 600 && (
                  <div className="product-badge sale-badge">{t("products.sale")}</div>
                )}
                {item.id <= 4 && (
                  <div className="product-badge new-badge">{t("products.new")}</div>
                )}

                <div className="wishlist-image">
                  <img 
                    src={item.Img} 
                    alt={item.Title}
                    onClick={() => {
                      view(item);
                      handleScrollToTop();
                    }}
                  />
                </div>

                <div className="wishlist-info">
                  <p className="wishlist-brand">{item.Brand}</p>
                  <h3 className="wishlist-name">{item.Title}</h3>
                  <p className="wishlist-memory">{item.Memory}</p>
                  <div className="wishlist-price">
                    <span className="current-price">${item.Price}</span>
                    <span className="old-price">${Math.round(item.Price / 0.77)}</span>
                  </div>
                </div>

                <div className="wishlist-actions">
                  <button 
                    className="wishlist-action-btn add-to-cart"
                    onClick={() => {
                      addtocart(item);
                    }}
                  >
                    <AiOutlineShoppingCart />
                    {t("products.addToCart")}
                  </button>
                  <button 
                    className="wishlist-action-btn quick-view"
                    onClick={() => {
                      view(item);
                      handleScrollToTop();
                    }}
                  >
                    <BsEye />
                    {t("products.view")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="wishlist-footer">
            <LocalizedLink to="/product" className="continue-shopping-link">
              ← {t("wishlist.continueShopping")}
            </LocalizedLink>
            <div className="wishlist-summary">
              <h3>{t("wishlist.totalItems")}: {wishlist.length}</h3>
              <p>Keep browsing to add more items to your wishlist</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

