const express = require('express');
const { ObjectId } = require('mongoose').Types;
const Wishlist = require('../models/Wishlist');

const router = express.Router();

// Add to wishlist
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  // Validate userId and productId
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex === -1) {
        wishlist.products.push({ productId });
        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist" });
      } else {
        res.status(400).json({ message: "Product already in wishlist" });
      }
    } else {
      const newWishlist = new Wishlist({ userId, products: [{ productId }] });
      await newWishlist.save();
      res.status(200).json({ message: "Product added to wishlist" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error adding product to wishlist", error: err.message });
  }
});

// Remove product from wishlist
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  // Validate userId and productId
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);
      await wishlist.save();
      res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      res.status(404).json({ message: "Wishlist not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error removing product from wishlist", error: err.message });
  }
});

module.exports = router;
