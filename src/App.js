import React, { useState, useEffect } from "react";
import Nav from "./nav";
import Rout from "./rout";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import Footer from "./footer";
import PageLoader from "./PageLoader";
import LanguageModal from "./LanguageModal";
import usePageTransition from "./usePageTransition";
import { LanguageProvider } from "./i18n/context";
import api from "./utils/api";
import { sendNewUserAlert } from "./utils/telegram";
import "./PageTransition.css";

// Redirect handler for language routing
function LanguageRedirect({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    // If no language prefix, redirect to /en
    if (!path.match(/^\/(en|pl|pt|he|el)(\/|$)/)) {
      const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
      navigate(`/${selectedLang}${path === '/' ? '' : path}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}

function AppContent() {
  const isLoading = usePageTransition();
  //products open/ close
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState([]);
  const view = (product) => {
    setDetail([{ ...product }]);
    setClose(true);
  };

  //add to cart
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Initialize user on mount
  useEffect(() => {
    const initUserAndNotify = async () => {
      try {
        // Check if this is first visit (no clientId in localStorage)
        const existingClientId = localStorage.getItem('clientId');
        const isNewUser = !existingClientId;
        
        const userData = await api.initUser();
        
        // Save user data to sessionStorage for telegram notifications
        if (userData) {
          sessionStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Send Telegram alert only for new users (first visit)
        // Check if user was just created (no createdAt in response or very recent)
        if (isNewUser && userData) {
          // Small delay to ensure user data is saved
          setTimeout(() => {
            sendNewUserAlert(userData);
          }, 500);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };
    
    initUserAndNotify();
  }, []);

  // Sync cart with backend when it changes
  useEffect(() => {
    if (cart.length >= 0) {
      api.updateCart(cart).catch(console.error);
    }
  }, [cart]);
  
  const addtocart = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    if (exsit) {
      // alert("This Product is already added to cart");
    } else {
      const newCart = [...cart, { ...product, qty: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      // alert("product is added to cart");
    }
  };

  // Wishlist functionality
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const addToWishlist = (product) => {
    const exists = wishlist.find((x) => x.id === product.id);
    if (exists) {
      // Remove from wishlist
      const newWishlist = wishlist.filter((x) => x.id !== product.id);
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } else {
      // Add to wishlist
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((x) => x.id === productId);
  };

  // Search functionality
  const [search, setSearch] = useState("");

  return (
    <>
      <LanguageModal />
      {isLoading && <PageLoader />}
      <div className="App">
        <Nav 
          cart={cart} 
          wishlist={wishlist}
          search={search} 
          setSearch={setSearch} 
        />
        <div className="main-content">
          <Rout
            detail={detail}
            view={view}
            close={close}
            setClose={setClose}
            cart={cart}
            setCart={setCart}
            addtocart={addtocart}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            isInWishlist={isInWishlist}
            search={search}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <LanguageRedirect>
          <AppContent />
        </LanguageRedirect>
      </LanguageProvider>
    </Router>
  );
}

export default App;
