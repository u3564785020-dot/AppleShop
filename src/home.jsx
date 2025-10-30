import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BiHeadphone } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetail from "./productdetail";
import "./home.css";

import imgBg from "./img/iphone.png";
import LanguageModal from "./LanguageModal";

const Home = () => {
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
      <LanguageModal />
      {/* Hero Banner */}
      <div className="top-banner">
        <div className="cotainer">
          <div className="detail">
            <span className="hero-badge">NEW ARRIVAL</span>
            <h2 className="detail-text">
              New <br /> iPhone 15
            </h2>
            <div className="detail-small-text">
              Order now and get a 70% discount
            </div>
            <ul className="hero-features">
              <li>✓ A17 Pro Chip</li>
              <li>✓ 48MP Camera</li>
              <li>✓ Titanium Design</li>
            </ul>
            <Link className="link-shop" to="/product">
              Shop Now <BsArrowRight className="bsarrow" />
            </Link>
          </div>
          <div className="img-box">
            <img className="img-iph" src={imgBg} alt="iPhone 15"></img>
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
                <h3>Free Shipping</h3>
                <p>Order above $1000</p>
              </div>
            </div>

            <div className="iconabout">
              <HiOutlineReceiptRefund />
              <div className="detailabout">
                <h3>Return & Refund</h3>
                <p>Money back Guarantee</p>
              </div>
            </div>

            <div className="iconabout">
              <BsCurrencyDollar />
              <div className="detailabout">
                <h3>Member Discount</h3>
                <p>On every Order</p>
              </div>
            </div>

            <div className="iconabout">
              <BiHeadphone />
              <div className="detailabout">
                <h3>Customer Support</h3>
                <p>Every time call support</p>
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
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Check out our most popular items</p>
            </div>
            <Link to="/product" className="view-all-link">
              View All Products →
            </Link>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <div className="featured-product-card" key={product.id}>
                {product.Price < 600 && (
                  <span className="product-badge sale">Sale</span>
                )}
                {product.id <= 4 && (
                  <span className="product-badge new">New</span>
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
                    <Link to="/product" className="btn-add-cart">
                      <AiOutlineShoppingCart /> Add to Cart
                    </Link>
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
            <span className="offer-badge">LIMITED TIME OFFER</span>
            <h2 className="offer-title">Get Up to 70% Off</h2>
            <p className="offer-text">On selected Apple products. Don't miss out on these amazing deals!</p>
            <Link to="/product" className="offer-btn">
              Shop Deals Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Customers Say</h2>
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
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-text">Get 10% off your first order and stay updated with the latest deals</p>
            
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
