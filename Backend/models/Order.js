const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered'],
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: function() {
            // Calculate delivery date as 7 days from createdAt
            const deliveryDate = new Date(this.createdAt);
            deliveryDate.setDate(deliveryDate.getDate() + 7);
            return deliveryDate;
        }
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
