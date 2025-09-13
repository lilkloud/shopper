import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './authContext';
import apiService from './apiService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch cart from API when authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const cartData = await apiService.cart.getCart();
        setCart(cartData);
      } catch (err) {
        setError(err.message || 'Failed to load cart');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  // Add item to cart
  const addToCart = async (productId, qty) => {
    try {
      setError(null);
      const updatedCart = await apiService.cart.addToCart(productId, qty);
      setCart(updatedCart);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to add to cart');
      return { success: false, error: err.message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setError(null);
      await apiService.cart.removeFromCart(itemId);
      setCart(cart.filter(item => item._id !== itemId));
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to remove from cart');
      return { success: false, error: err.message };
    }
  };

  // Update cart item quantity
  const updateCartItemQty = async (itemId, qty) => {
    try {
      setError(null);
      const updatedCart = await apiService.cart.updateCartItem(itemId, qty);
      setCart(updatedCart);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to update cart');
      return { success: false, error: err.message };
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Calculate items count
  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        cartTotal,
        itemsCount,
        addToCart,
        removeFromCart,
        updateCartItemQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
