const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const Product = require("../models/Product");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Cart = require("../models/Cart");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage });

router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { productName, description, price, category } = req.body;
        const imagePath = req.file.path; 

        const product = new Product({
            productName,
            description,
            price,
            category,
            image: imagePath
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/get-products/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();

        if (category !== 'male' && category !== 'female' && category !== 'kids') {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const products = await Product.find({ category });

        const productsWithImages = products.map(product => {
            return {
                productId: product._id,
                productName: product.productName,
                description: product.description,
                price: product.price,
                category: product.category,
                image: path.basename(product.image) // Extract just the filename
            };
        });

        res.json(productsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add-to-cart', fetchUser, async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;
        const userId = req.user.id;

        // Check if the product is already in the cart
        const existingCartItem = await Cart.findOne({ user: userId, product: productId, size: size });

        if (existingCartItem) {
            // If the product is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Product quantity updated in the cart' });
        } else {
            // If the product is not in the cart, create a new cart item
            const newCartItem = new Cart({
                user: userId,
                product: productId,
                quantity: quantity, 
                size: size
            });
            await newCartItem.save();
            return res.status(201).json({ message: 'Product added to the cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/cart-products', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find all cart items for the user
        const cartItems = await Cart.find({ user: userId }).populate('product');
        // console.log(cartItems);
        // Extract product details from cart items
        const products = cartItems.map(cartItem => ({
            _id: cartItem.product._id,
            cartItemId: cartItem._id,
            size: cartItem.size,
            productName: cartItem.product.productName,
            description: cartItem.product.description,
            price: cartItem.product.price,
            category: cartItem.product.category,
            image: cartItem.product.image.split("\\").pop(),
            quantity: cartItem.quantity,
            dateAdded: cartItem.date
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/update-cart', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItemId, updatedQuantity } = req.body;

        // Find the cart item for the user and the specified ID
        const cartItem = await Cart.findOne({ user: userId, _id: cartItemId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        // Update the quantity of the cart item
        cartItem.quantity = updatedQuantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/delete-cart-item/:cartItemId', async (req, res) => {
    try {
      const { cartItemId } = req.params;
  
      // Find the cart item by ID and delete it
      await Cart.findByIdAndDelete(cartItemId);
  
      res.status(200).json({ message: 'Item deleted from cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;