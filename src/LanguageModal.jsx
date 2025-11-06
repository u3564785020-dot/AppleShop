import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "./i18n/useTranslation";
import "./LanguageModal.css";

const LanguageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user has already selected language
    const languageSelected = localStorage.getItem("languageSelected");
    
    if (!languageSelected && location.pathname.match(/^\/(en|pl|pt|he|el)\/?$/)) {
      // Show modal only on homepage on first visit
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  }, [location.pathname]);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "el", name: "Ελληνικά", flag: "🇬🇷" }
  ];

  const handleLanguageSelect = (langCode) => {
    // Save selected language to localStorage
    localStorage.setItem("selectedLanguage", langCode);
    localStorage.setItem("languageSelected", "true");
    
    // Close modal
    setIsOpen(false);
    
    // Redirect to language-specific URL
    window.location.href = `/${langCode}/`;
  };

  const handleClose = () => {
    // If user closes without selecting, set English as default
    if (!localStorage.getItem("languageSelected")) {
      localStorage.setItem("selectedLanguage", "en");
      localStorage.setItem("languageSelected", "true");
      window.location.href = "/en/";
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="language-modal-overlay">
      <div className="language-modal">
        <button className="language-modal-close" onClick={handleClose}>
          <AiOutlineClose />
        </button>

        <h2 className="language-modal-title">{t("languageModal.title")}</h2>
        <p className="language-modal-subtitle">{t("languageModal.subtitle")}</p>

        <div className="language-list">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="language-item"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
              <span className="language-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;

