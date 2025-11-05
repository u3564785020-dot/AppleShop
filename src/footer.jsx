import React from "react";
import "./footer.css";
import { LocalizedNavLink } from "./i18n/LocalizedNavLink";
import { useTranslation } from "./i18n/useTranslation";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="footercontainer">
        <div className="footerbox">
          <div className="kontakkt">
            <h4>{t("footer.contactUs")}</h4>
            <div className="kk">+498212684150</div>
            <div className="kk">appleshop@info.com</div>
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
            <h4>{t("footer.ourServices")}</h4>
            <div><LocalizedNavLink className="kk footer-link" to="/about">{t("footer.aboutUs")}</LocalizedNavLink></div>
            <div><LocalizedNavLink className="kk footer-link" to="/return-policy">{t("footer.returnPolicy")}</LocalizedNavLink></div>
            <div><LocalizedNavLink className="kk footer-link" to="/faq">{t("footer.faq")}</LocalizedNavLink></div>
            <div><LocalizedNavLink className="kk footer-link" to="/privacy">{t("footer.privacy")}</LocalizedNavLink></div>
          </div>
          <div className="kontakkt">
            <h4>{t("footer.quickLinks")}</h4>
            <div><LocalizedNavLink className="kk footer-link" to="/product">{t("footer.allProducts")}</LocalizedNavLink></div>
            <div><LocalizedNavLink className="kk footer-link" to="/support">{t("nav.support")}</LocalizedNavLink></div>
            <div><LocalizedNavLink className="kk footer-link" to="/cart">{t("footer.shoppingCart")}</LocalizedNavLink></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AppleShop. {t("footer.rightsReserved")}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
