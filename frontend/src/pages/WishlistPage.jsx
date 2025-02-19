import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Cart.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  // Function to remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    console.log("Trying to remove product with ID:", productId);
    
    if (!productId) {
      console.error("Error: productId is undefined. Check localStorage data.");
      return;
    }

    const updatedWishlist = wishlistItems.filter(item => item.id !== productId && item._id !== productId);
    console.log("Wishlist after removal:", updatedWishlist);

    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id || item._id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, id: product.id || product._id });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <div className="cart-header">
          <h2>Your Wishlist</h2>
        </div>
        <div className="cart-container">
          <div className="cart-items-container">
            {wishlistItems.length === 0 ? (
              <p className="empty-cart-message">Your wishlist is empty.</p>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id || item._id} className="cart-item">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150"; // Fallback image
                    }}
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">Price: Rs. {item.price}</p>
                    <button className="buy-btn" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                    <button className="remove-btn" onClick={() => removeFromWishlist(item.id || item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
