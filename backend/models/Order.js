import mongoose from 'mongoose';
import Product from './Product.js';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const shippingAddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const paymentResultSchema = new mongoose.Schema({
    id: String,
    status: String,
    update_time: String,
    email_address: String
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Add a method to calculate prices
orderSchema.methods.calculatePrices = function() {
    const itemsPrice = this.orderItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
    
    // Example: Shipping is free for orders over $100, otherwise $10
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    
    // Example: 10% tax
    const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
    
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    this.itemsPrice = itemsPrice;
    this.shippingPrice = shippingPrice;
    this.taxPrice = taxPrice;
    this.totalPrice = totalPrice;
    
    return this;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
