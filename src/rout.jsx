import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Product from "./product";
import Cart from "./cart";
import Wishlist from "./Wishlist";
import About from "./about";
import Support from "./support";
import Paybox from "./paybox";
import Shipbox from "./shipbox";
import SmsBox from "./smsbox";
import ReturnPolicy from "./ReturnPolicy";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";
const Rout = ({ detail, view, close, setClose, cart, setCart, addtocart, wishlist, addToWishlist, isInWishlist, search }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product"
          element={
            <Product
              detail={detail}
              view={view}
              close={close}
              setClose={setClose}
              addtocart={addtocart}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              search={search}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} addtocart={addtocart} />}
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist 
              wishlist={wishlist} 
              addToWishlist={addToWishlist}
              addtocart={addtocart}
              view={view}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/paybox" element={<Paybox />} />
        <Route path="/shipbox" element={<Shipbox />} />
        <Route path="/smsbox" element={<SmsBox />} />
      </Routes>
    </div>
  );
};
export default Rout;
