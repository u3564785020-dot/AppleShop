import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="footercontainer">
        <div className="footerbox">
          <div className="kontakkt">
            <h4>Contact Us</h4>
            <div className="kk">+498212684150</div>
            <div className="kk">techmarket@info.com</div>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="kontakkt">
            <h4>Our Services</h4>
            <div><NavLink className="kk footer-link" to="/about">About Us</NavLink></div>
            <div><NavLink className="kk footer-link" to="/return-policy">Return Policy</NavLink></div>
            <div><NavLink className="kk footer-link" to="/faq">FAQ</NavLink></div>
            <div><NavLink className="kk footer-link" to="/privacy">Privacy & Policy</NavLink></div>
          </div>
          <div className="kontakkt">
            <h4>Quick Links</h4>
            <div><NavLink className="kk footer-link" to="/product">All Products</NavLink></div>
            <div><NavLink className="kk footer-link" to="/support">Support</NavLink></div>
            <div><NavLink className="kk footer-link" to="/cart">Shopping Cart</NavLink></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TechMarket. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
