import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import "./nav.css";
import { NavLink } from "react-router-dom";

const Nav = ({ cart, wishlist, search, setSearch }) => {
  const activeLink = "linkactiv";
  const normalLink = "link";
  return (
    <div>
      <div className="free">
        <p>
          <div className="icon">
            <FaTruckMoving /> Crazy Sale 70% discount on all of our products
          </div>
        </p>
      </div>
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <NavLink to="/" style={{textDecoration: 'none', color: '#000'}}>
              <div>TechMarket</div>
            </NavLink>
          </div>
          <div className="search-box">
            <input
              type="text"
              value={search || ""}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              placeholder="Enter the product name"
              autoComplete="off"
            />
            <NavLink to="/product">
              <button>Search</button>
            </NavLink>
          </div>
              <div className="icon">
                <NavLink className="link wishlist-icon-wrapper" to="/wishlist">
                  <AiOutlineHeart />
                  {wishlist && wishlist.length > 0 && (
                    <span className="wishlist-badge">{wishlist.length}</span>
                  )}
                </NavLink>
                <NavLink className="link cart-icon-wrapper" to="/cart">
                  <BsBagCheck />
                  {cart && cart.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </NavLink>
              </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          <div className="nav">
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) => {
                    return isActive ? activeLink : normalLink;
                  }}
                >
                  Support
                </NavLink>
              </li>
            </ul>
        </div>
      </div>
      </div>
    </div>
  );
};
export default Nav;
