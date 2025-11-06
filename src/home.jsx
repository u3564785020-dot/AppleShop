import React, { useState } from "react";
import { LocalizedLink } from "./i18n/LocalizedLink";
import { useTranslation } from "./i18n/useTranslation";
import { BsArrowRight } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BiHeadphone } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetail from "./productdetail";
import "./home.css";

import imgBg from "./img/iphone.png";

const Home = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  // Get featured products (first 8 products)
  const featuredProducts = ProductDetail.slice(0, 8);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing quality products! Fast delivery and excellent customer service. Highly recommended!",
      avatar: "👩"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Best prices for Apple products. Bought my iPhone 15 here and saved a lot. Will buy again!",
      avatar: "👨"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      text: "Professional service and genuine products. My go-to store for all Apple devices.",
      avatar: "👩‍💼"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div className="top-banner">
        <div className="cotainer">
          <div className="detail">
            <span className="hero-badge">{t("home.newArrival")}</span>
            <h2 className="detail-text">
              New <br /> iPhone 17
            </h2>
            <div className="detail-small-text">
              {t("home.orderDiscount")}
            </div>
            <ul className="hero-features">
              <li>✓ A19 Chip</li>
              <li>✓ 48MP Dual Fusion Camera</li>
              <li>✓ ProMotion Display</li>
            </ul>
            <LocalizedLink className="link-shop" to="/product">
              {t("home.shopNow")} <BsArrowRight className="bsarrow" />
            </LocalizedLink>
          </div>
          <div className="img-box">
            <img className="img-iph" src={imgBg} alt="iPhone 17"></img>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="about">
        <div className="containerabout">
          <div className="boxabout">
            <div className="iconabout">
              <FiTruck />
              <div className="detailabout">
                <h3>{t("home.freeShipping")}</h3>
                <p>{t("home.freeShippingDesc")}</p>
              </div>
            </div>

            <div className="iconabout">
              <HiOutlineReceiptRefund />
              <div className="detailabout">
                <h3>{t("home.easyReturn")}</h3>
                <p>{t("home.easyReturnDesc")}</p>
              </div>
            </div>

            <div className="iconabout">
              <BsCurrencyDollar />
              <div className="detailabout">
                <h3>{t("home.easyPayment")}</h3>
                <p>{t("home.easyPaymentDesc")}</p>
              </div>
            </div>

            <div className="iconabout">
              <BiHeadphone />
              <div className="detailabout">
                <h3>{t("home.support24")}</h3>
                <p>{t("home.support24Desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">{t("home.featuredProducts")}</h2>
              <p className="section-subtitle">{t("home.featuredProductsSubtitle")}</p>
            </div>
            <LocalizedLink to="/product" className="view-all-link">
              {t("home.viewAll")}
            </LocalizedLink>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <div className="featured-product-card" key={product.id}>
                {product.Price < 600 && (
                  <span className="product-badge sale">{t("products.sale")}</span>
                )}
                {product.id <= 4 && (
                  <span className="product-badge new">{t("products.new")}</span>
                )}
                
                <div className="featured-product-image">
                  <img src={product.Img} alt={product.Title} />
                </div>

                <div className="featured-product-info">
                  <p className="product-brand">{product.Brand}</p>
                  <h3 className="product-name">{product.Title}</h3>
                  <p className="product-memory">{product.Memory}</p>
                  
                  <div className="product-price">
                    <span className="current-price">${product.Price}</span>
                    <span className="old-price">${Math.round(product.Price / 0.77)}</span>
                  </div>

                  <div className="product-actions">
                    <LocalizedLink to="/product" className="btn-add-cart">
                      <AiOutlineShoppingCart /> {t("products.addToCart")}
                    </LocalizedLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="special-offer">
        <div className="offer-container">
          <div className="offer-content">
            <span className="offer-badge">{t("home.specialOffer")}</span>
            <h2 className="offer-title">{t("home.specialOfferTitle")}</h2>
            <p className="offer-text">{t("home.specialOfferDesc")}</p>
            <LocalizedLink to="/product" className="offer-btn">
              {t("home.shopNowBtn")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">{t("home.testimonials")}</h2>
          <p className="section-subtitle">Trusted by thousands of happy customers</p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <span className="author-avatar">{testimonial.avatar}</span>
                  <span className="author-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">{t("home.newsletter")}</h2>
            <p className="newsletter-text">{t("home.newsletterDesc")}</p>
            
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder={t("home.newsletterPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                {t("home.newsletterSubscribe")}
              </button>
            </form>
            
            <p className="newsletter-privacy">
              {t("home.newsletterPrivacy")}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
