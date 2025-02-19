import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount, wishlistCount, isSignedIn, location }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <h1>Shopify</h1>
        </Link>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search products..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
      

        <Link to="/wishlist">
          <button className="wishlist-btn">Wishlist ({wishlistCount})</button>
        </Link>

        <Link to="/signup">
          <button className="auth-btn">{isSignedIn ? 'Profile' : 'Sign In / Sign Up'}</button>
        </Link>

        <Link to="/cart">
          <button className="cart-btn">Cart ({cartCount})</button>
        </Link>
      
    </nav>
  );
};

export default Navbar;
