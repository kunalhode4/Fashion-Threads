const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Order = require('../models/Order');
const cron = require('node-cron');
const Cart = require('../models/Cart');


cron.schedule('* * * * *', async () => {
    try {
        // Find orders with pending status
        const pendingOrders = await Order.find({ status: 'pending' });

        // Update status of pending orders to confirmed if 2 minutes have passed
        pendingOrders.forEach(async (order) => {
            const elapsedTime = Date.now() - order.createdAt.getTime();
            if (elapsedTime >= 2 * 60 * 1000) {
                order.status = 'confirmed';
                await order.save();
            }
        });

        const confirmedOrders = await Order.find({ status: 'confirmed' });

        confirmedOrders.forEach(async (order) => {
            const elapsedTime = Date.now() - order.createdAt.getTime(); 
            if (elapsedTime >= 2 * 24 * 60 * 60 * 1000) { 
                order.status = 'shipped';
                await order.save();
            }
        });

        // Find orders with shipped status
        const shippedOrders = await Order.find({ status: 'shipped' });

        // Update status of shipped orders to delivered if 1 day has passed
        shippedOrders.forEach(async (order) => {
            const elapsedTime = Date.now() - order.createdAt.getTime(); 
            if (elapsedTime >= 1 * 24 * 60 * 60 * 1000) { 
                order.status = 'delivered';
                await order.save();
            }
        });


    } catch (error) {
        console.error('Error updating order status:', error);
    }
});

router.post('/place-orders', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { products, totalAmount, address, state, city, pincode } = req.body;

        // Create a new order
        const newOrder = new Order({
            user: userId,
            products: products,
            totalAmount: totalAmount,
            address: address.address,
            state: address.state,
            city: address.city,
            pincode: address.pincode
        });

        // Save the order to the database
        await newOrder.save();

        await Cart.updateOne({ user: userId }, { $pull: { products: { $in: products } } });

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.get('/orders', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
