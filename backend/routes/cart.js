const express = require('express');
const { ObjectId } = require('mongoose').Types;
const Cart = require('../models/Cart');

const router = express.Router();

// Add to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate userId and productId
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({ userId, products: [{ productId, quantity }] });
      await newCart.save();
    }
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Error adding product to cart", error: err.message });
  }
});

// Remove product from cart
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  // Validate userId and productId
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== productId);
      
      // Delete the cart if no products are left
      if (cart.products.length === 0) {
        await Cart.deleteOne({ userId });
      } else {
        await cart.save();
      }

      res.status(200).json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error removing product from cart", error: err.message });
  }
});

module.exports = router;
