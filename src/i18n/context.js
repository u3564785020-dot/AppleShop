import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();

  const getLanguageFromPath = () => {
    const path = location.pathname;
    const langMatch = path.match(/^\/(en|pl|pt|he|el)(\/|$)/);
    return langMatch ? langMatch[1] : (localStorage.getItem('selectedLanguage') || 'en');
  };

  const [language, setLanguage] = useState(getLanguageFromPath);

  useEffect(() => {
    const lang = getLanguageFromPath();
    setLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  }, [location.pathname]);

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    localStorage.setItem('languageSelected', 'true');
    window.dispatchEvent(new CustomEvent('languageChanged'));
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
