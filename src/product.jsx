import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetail from "./productdetail";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillApple,
} from "react-icons/ai";
import { BsEye, BsPhone, BsLaptop } from "react-icons/bs";
import { FaTabletAlt, FaHeadphones } from "react-icons/fa";
import { MdDesktopMac } from "react-icons/md";
import "./products.css";

const Product = ({ detail, view, close, setClose, addtocart, wishlist, addToWishlist, isInWishlist, search }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [product, setProduct] = useState(ProductDetail);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  
  // Search filter
  React.useEffect(() => {
    if (search) {
      const filtered = ProductDetail.filter((x) => {
        return x.Title.toLowerCase().includes(search.toLowerCase()) ||
               x.Brand.toLowerCase().includes(search.toLowerCase()) ||
               x.Cat.toLowerCase().includes(search.toLowerCase());
      });
      setProduct(filtered);
    } else {
      setProduct(ProductDetail);
    }
  }, [search]);

  // Sorting logic
  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    switch(sortType) {
      case "price-low":
        return sorted.sort((a, b) => a.Price - b.Price);
      case "price-high":
        return sorted.sort((a, b) => b.Price - a.Price);
      case "name":
        return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
      default:
        return sorted;
    }
  };

  const filterproduct = (product) => {
    const update = ProductDetail.filter((x) => {
      return x.Cat === product && x.Price >= priceRange[0] && x.Price <= priceRange[1];
    });
    setProduct(update);
  };
  
  const filterByPrice = () => {
    const update = ProductDetail.filter((x) => {
      return x.Price >= priceRange[0] && x.Price <= priceRange[1];
    });
    setProduct(update);
  };
  
  const AllProducts = () => {
    setPriceRange([0, 2000]);
    setProduct(ProductDetail);
  };
  return (
    <div>
      {close ? (
        <div className="pddetaill">
          <div className="pdcontainer">
            <button className="closebtn" onClick={() => setClose(false)}>
              <AiOutlineClose />
            </button>
            {detail.map((curElm) => {
              return (
                <div className="pdbox" key={curElm.id}>
                  <div className="pdimgbox">
                    <img src={curElm.Img} alt="m" />
                  </div>
                  <div className="pddetail">
                    <p>{curElm.Brand}</p>
                    <h4>{curElm.Title}</h4>
                    <h5 className="pppprice">
                      ${Math.round(curElm.Price / 1.3)}
                      {"   "}
                      <span className="ppppricenew">${curElm.Price}</span>
                    </h5>
                    <div className="pddescr">
                      <button
                        onClick={() => addtocart(curElm)}
                        className="addtocartbtn"
                      >
                        <Link
                          onClick={() => setClose(false)}
                          className="tocart"
                          to="/cart"
                        >
                          Add To Cart
                        </Link>
                      </button>
                      <div className="pddescrtitle">Specification:</div>
                      <div>
                        <h5>
                          Brand: <span className="deskk">{curElm.Brand}</span>
                        </h5>
                        <h5>
                          Color: <span className="deskk">{curElm.Color}</span>
                        </h5>
                        <h5>
                          Display:
                          <span className="deskk"> {curElm.Display}</span>
                        </h5>
                        <h5>
                          Processor:
                          <span className="deskk"> {curElm.Processor}</span>
                        </h5>
                        <h5>
                          Operating System:
                          <span className="deskk">
                            {curElm.OperatingSystem}
                          </span>
                        </h5>
                        <h5>
                          RAM: <span className="deskk">{curElm.RAM}</span>
                        </h5>
                        <h5>
                          Memory: <span className="deskk">{curElm.Memory}</span>
                        </h5>
                      </div>
                      <div className="pddescrtitle">Description:</div>
                      <h5>
                        <span className="deskk">{curElm.Description}</span>
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="products">
        <div className="products-header">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Products</span>
          </div>
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">Discover our premium collection of Apple products</p>
          <div className="products-info">
            <span className="products-count">Showing {product.length} {product.length === 1 ? 'product' : 'products'}</span>
          </div>
        </div>

        <div className="container">
          <div className="filter">
            <div className="filter-header">
              <h3>Filter by Category</h3>
              <button onClick={() => AllProducts()} className="reset-filters">Reset</button>
            </div>
            <ul className="filter-list">
              <li onClick={() => AllProducts()} className="filter-item">
                <AiFillApple className="filter-icon" />
                <span>All Products</span>
              </li>
              <li onClick={() => filterproduct("Iphone")} className="filter-item">
                <BsPhone className="filter-icon" />
                <span>iPhone</span>
              </li>
              <li onClick={() => filterproduct("iPad")} className="filter-item">
                <FaTabletAlt className="filter-icon" />
                <span>iPad</span>
              </li>
              <li onClick={() => filterproduct("Mac")} className="filter-item">
                <BsLaptop className="filter-icon" />
                <span>MacBook</span>
              </li>
              <li onClick={() => filterproduct("iMac")} className="filter-item">
                <MdDesktopMac className="filter-icon" />
                <span>iMac</span>
              </li>
              <li onClick={() => filterproduct("AirPods")} className="filter-item">
                <FaHeadphones className="filter-icon" />
                <span>AirPods</span>
              </li>
            </ul>
            
            <div className="filter-header" style={{marginTop: '30px'}}>
              <h3>Price Range</h3>
            </div>
            <div className="price-filter">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>Min</label>
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    min="0"
                    max="2000"
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label>Max</label>
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                    min="0"
                    max="2000"
                  />
                </div>
              </div>
              <button onClick={filterByPrice} className="apply-price-btn">Apply</button>
              <div className="price-range-display">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </div>
          <div className="productbox">
            <div className="sort-bar">
              <div className="sort-left">
                <span className="sort-label">Sort by:</span>
                <select 
                  className="sort-select" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>
            
            {product.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <div className="containerProduct">
                {sortProducts(product, sortBy).map((curElm) => {
                return (
                  <div className="boxproduct" key={curElm.id}>
                    {curElm.Price < 600 && (
                      <div className="product-badge sale-badge">Sale</div>
                    )}
                    {curElm.id <= 4 && (
                      <div className="product-badge new-badge">New</div>
                    )}
                    <div className="imgbox">
                      <img
                        src={curElm.Img}
                        alt={curElm.Title}
                        onClick={() => {
                          view(curElm);
                          handleScrollToTop();
                        }}
                      ></img>
                    </div>
                    <div className="details">
                      <button 
                        className="product-action-btn cart-btn"
                        onClick={() => addtocart(curElm)}
                        title="Add to Cart"
                      >
                        <AiOutlineShoppingCart />
                        Add to Cart
                      </button>
                      <button 
                        className="product-action-btn view-btn"
                        onClick={() => {
                          view(curElm);
                          handleScrollToTop();
                        }}
                        title="Quick View"
                      >
                        <BsEye />
                        View
                      </button>
                      <button 
                        className={`product-action-btn wishlist-btn ${isInWishlist && isInWishlist(curElm.id) ? 'active' : ''}`}
                        onClick={() => addToWishlist && addToWishlist(curElm)}
                        title={isInWishlist && isInWishlist(curElm.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <AiOutlineHeart />
                        {isInWishlist && isInWishlist(curElm.id) ? 'In Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                    <div className="pdetail">
                      <p>{curElm.Brand}</p>
                      <h3>{curElm.Title}</h3>
                      <h4>{curElm.Memory}</h4>
                      <h3 className="pppprice">
                        ${Math.round(curElm.Price / 1.3)}
                        {"   "}
                        <span className="ppppricenew">${curElm.Price}</span>
                      </h3>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
