import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Products from './pages/Products';
import Cart from './pages/Cart';
import AddProductPage from './pages/AddProductPage';
import Wishlist from './pages/WishlistPage'; // Import Wishlist page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} /> {/* New route for Wishlist */}
        <Route path="/addproduct" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
