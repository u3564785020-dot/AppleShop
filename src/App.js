import React, { useState } from "react";
import Nav from "./nav";
import Rout from "./rout";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./footer";
import PageLoader from "./PageLoader";
import usePageTransition from "./usePageTransition";
import "./PageTransition.css";

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
      <AppContent />
    </Router>
  );
}

export default App;
