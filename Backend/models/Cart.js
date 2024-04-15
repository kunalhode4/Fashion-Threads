const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
