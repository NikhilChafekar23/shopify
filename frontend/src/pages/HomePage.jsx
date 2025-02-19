import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Pune 411007');
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error('❌ Error fetching products:', error));

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    setCartCount(savedCart.reduce((total, item) => total + item.quantity, 0));

    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(savedWishlist);

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsSignedIn(true);
    }
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} has been added to your cart! 🛒`);
  };

  const handleAddToWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!storedWishlist.some((item) => item._id === product._id)) {
      const updatedWishlist = [...storedWishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
      alert(`${product.name} has been added to your wishlist! ❤️`);
    } else {
      alert(`${product.name} is already in your wishlist.`);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* Importing Navbar */}
      <Navbar cartCount={cartCount} wishlistCount={wishlistItems.length} isSignedIn={isSignedIn} location={location} />

      {/* Product Listing */}
      <div className="main-content">
        <h2>Products</h2>
        <div className="products">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: Rs. {product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="add-to-wishlist-btn" onClick={() => handleAddToWishlist(product)}>
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
