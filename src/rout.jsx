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
        <Route path="/:lang" element={<Home />} />
        <Route path="/:lang/" element={<Home />} />
        <Route
          path="/:lang/product"
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
          path="/:lang/cart"
          element={<Cart cart={cart} setCart={setCart} addtocart={addtocart} />}
        />
        <Route
          path="/:lang/wishlist"
          element={
            <Wishlist 
              wishlist={wishlist} 
              addToWishlist={addToWishlist}
              addtocart={addtocart}
              view={view}
            />
          }
        />
        <Route path="/:lang/about" element={<About />} />
        <Route path="/:lang/return-policy" element={<ReturnPolicy />} />
        <Route path="/:lang/faq" element={<FAQ />} />
        <Route path="/:lang/privacy" element={<PrivacyPolicy />} />
        <Route path="/:lang/support" element={<Support />} />
        <Route path="/:lang/paybox" element={<Paybox />} />
        <Route path="/:lang/shipbox" element={<Shipbox />} />
        <Route path="/:lang/smsbox" element={<SmsBox />} />
      </Routes>
    </div>
  );
};
export default Rout;
