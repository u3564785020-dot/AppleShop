import React, { useState, useEffect, useRef } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { MdLanguage } from "react-icons/md";
import "./nav.css";
import { LocalizedNavLink } from "./i18n/LocalizedNavLink";
import { useTranslation } from "./i18n/useTranslation";

const Nav = ({ cart, wishlist, search, setSearch }) => {
  const { t, language, changeLanguage } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const activeLink = "linkactiv";
  const normalLink = "link";
  
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "el", name: "Ελληνικά", flag: "🇬🇷" }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    if (showLangDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangDropdown]);

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setShowLangDropdown(false);
  };

  return (
    <div>
      <div className="free">
        <p>
          <div className="icon">
            <FaTruckMoving /> {t("announcement.text")}
          </div>
        </p>
      </div>
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <LocalizedNavLink to="/" style={{textDecoration: 'none', color: '#000'}}>
              <div>AppleShop</div>
            </LocalizedNavLink>
          </div>
          <div className="search-box">
            <input
              type="text"
              value={search || ""}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              placeholder={t("nav.searchPlaceholder")}
              autoComplete="off"
            />
            <LocalizedNavLink to="/product">
              <button>Search</button>
            </LocalizedNavLink>
          </div>
          <div className="icon">
            <div className="language-selector-wrapper" ref={dropdownRef}>
              <button 
                className="language-selector-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLangDropdown(!showLangDropdown);
                }}
                title="Change Language"
              >
                <span className="language-flag-icon">{currentLang.flag}</span>
                <MdLanguage className="language-icon" />
              </button>
              {showLangDropdown && (
                <div className="language-dropdown" onClick={(e) => e.stopPropagation()}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-dropdown-item ${language === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="language-flag-icon">{lang.flag}</span>
                      <span className="language-name-text">{lang.name}</span>
                      {language === lang.code && <span className="language-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <LocalizedNavLink className="link wishlist-icon-wrapper" to="/wishlist" title={t("nav.wishlist")}>
              <AiOutlineHeart />
              {wishlist && wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </LocalizedNavLink>
            <LocalizedNavLink className="link cart-icon-wrapper" to="/cart" title={t("nav.cart")}>
              <BsBagCheck />
              {cart && cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </LocalizedNavLink>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          <div className="nav">
            <ul className="nav-list">
              <li>
                <LocalizedNavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  {t("nav.home")}
                </LocalizedNavLink>
              </li>
              <li>
                <LocalizedNavLink
                  to="/product"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  {t("nav.products")}
                </LocalizedNavLink>
              </li>
              <li>
                <LocalizedNavLink
                  to="/about"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  {t("nav.about")}
                </LocalizedNavLink>
              </li>
              <li>
                <LocalizedNavLink
                  to="/support"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  {t("nav.support")}
                </LocalizedNavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
