import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageContext } from './context';
import { t } from './translations';

export const useTranslation = () => {
  const { language, changeLanguage } = useLanguageContext();
  const location = useLocation();
  const navigate = useNavigate();

  const getLanguageFromPath = () => {
    const path = location.pathname;
    const langMatch = path.match(/^\/(en|pl|pt|he|el)(\/|$)/);
    return langMatch ? langMatch[1] : language || 'en';
  };

  const currentLang = getLanguageFromPath();

  const translate = (key, params = {}) => {
    return t(key, currentLang, params);
  };

  const switchLanguage = (langCode) => {
    let newPath = location.pathname;
    
    // Remove existing language prefix if any
    newPath = newPath.replace(/^\/(en|pl|pt|he|el)/, '');
    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }
    if (newPath === '/') {
      newPath = '';
    }
    
    // Add new language prefix
    newPath = `/${langCode}${newPath}`;
    
    changeLanguage(langCode);
    navigate(newPath);
  };

  return {
    t: translate,
    language: currentLang,
    changeLanguage: switchLanguage
  };
};
