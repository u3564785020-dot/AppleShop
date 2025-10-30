import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import "./Wishlist.css";

const Wishlist = ({ wishlist, addToWishlist, addtocart, view }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Wishlist</span>
        </div>
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlist.length > 0 
            ? `You have ${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} in your wishlist` 
            : 'Your wishlist is empty'}
        </p>
      </div>

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite items here to keep track of them</p>
            <Link to="/product" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <button 
                  className="remove-btn"
                  onClick={() => addToWishlist(item)}
                  title="Remove from Wishlist"
                >
                  <AiOutlineClose />
                </button>
                
                {item.Price < 600 && (
                  <div className="product-badge sale-badge">Sale</div>
                )}
                {item.id <= 4 && (
                  <div className="product-badge new-badge">New</div>
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
                    Add to Cart
                  </button>
                  <button 
                    className="wishlist-action-btn quick-view"
                    onClick={() => {
                      view(item);
                      handleScrollToTop();
                    }}
                  >
                    <BsEye />
                    Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="wishlist-footer">
            <Link to="/product" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
            <div className="wishlist-summary">
              <h3>Total Items: {wishlist.length}</h3>
              <p>Keep browsing to add more items to your wishlist</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

