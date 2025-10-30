import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Прокрутка наверх при смене страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading;
};

export default usePageTransition;

