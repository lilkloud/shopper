import express from 'express';
import { protect } from '../middleware/auth.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { productId, qty } = req.body;
        
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const user = await User.findById(req.user._id);
        
        // Check if item already in cart
        const cartItem = user.cart.find(
            (item) => item.product.toString() === productId
        );
        
        if (cartItem) {
            // Update quantity if item already in cart
            cartItem.qty += Number(qty);
        } else {
            // Add new item to cart
            user.cart.push({
                product: product._id,
                name: product.name,
                image: product.images[0],
                price: product.price,
                countInStock: product.countInStock,
                qty: Number(qty)
            });
        }
        
        await user.save();
        res.status(201).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product', 'name price images countInStock');
        res.json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        user.cart = user.cart.filter(
            (item) => item._id.toString() !== req.params.id
        );
        
        await user.save();
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const { qty } = req.body;
        
        const user = await User.findById(req.user._id);
        
        const cartItem = user.cart.find(
            (item) => item._id.toString() === req.params.id
        );
        
        if (cartItem) {
            cartItem.qty = qty;
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
