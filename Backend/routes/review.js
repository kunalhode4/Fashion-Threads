const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');

// GET all reviews for a product
router.get('/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a review for a product
router.post('/review', fetchUser, async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const userId = req.user.id;
    const userObj = await User.findOne({ _id: userId });
    const user = userObj.name;
    const newReview = new Review({ user, product, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
