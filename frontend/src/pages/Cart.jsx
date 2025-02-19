import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Navbar from '../components/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    updateTotalPrice(storedCart);
  }, []);

  const updateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      return !isNaN(price) && !isNaN(quantity) ? acc + price * quantity : acc;
    }, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId, operation) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: operation === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex((item) => item.id === productId);

    if (index !== -1) {
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const handleBuyNow = (product) => {
    alert(`Your order for ${product.name} has been placed successfully!`);
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  return (
    <div>
    <Navbar/>
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>
      <div className="cart-container">
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={item.id || index} className="cart-item">
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">Price: Rs. {item.price}</p>
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 'increase')}
                    >
                      +
                    </button>
                  </div>
                  <p className="item-total-price">
                    Total: Rs. {item.price * item.quantity}
                  </p>
                  <div className="cart-buttons">
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                    <button className="buy-now-btn" onClick={() => handleBuyNow(item)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-total-container">
            <div className="cart-total">
              <h3>Total Price: Rs. {totalPrice}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Cart;
