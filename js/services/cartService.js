import apiService from '../apiService';
import { getCartFromStorage, saveCartToStorage, clearCartFromStorage } from '../utils/storage';

// Get user's cart
export const getCart = async (isAuthenticated) => {
  try {
    if (isAuthenticated) {
      const data = await apiService.cart.getCart();
      return { success: true, data };
    } else {
      const cart = getCartFromStorage();
      return { success: true, data: cart };
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { success: false, error: error.message };
  }
};

// Add item to cart
export const addToCart = async (product, qty, isAuthenticated) => {
  try {
    if (isAuthenticated) {
      const data = await apiService.cart.addToCart(product._id, qty);
      return { success: true, data };
    } else {
      const cart = getCartFromStorage();
      const existingItem = cart.find(item => item.product === product._id);
      
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.push({
          _id: Date.now().toString(),
          product: product._id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          countInStock: product.countInStock,
          qty
        });
      }
      
      saveCartToStorage(cart);
      return { success: true, data: cart };
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: error.message };
  }
};

// Remove item from cart
export const removeFromCart = async (itemId, isAuthenticated) => {
  try {
    if (isAuthenticated) {
      await apiService.cart.removeFromCart(itemId);
      return { success: true };
    } else {
      let cart = getCartFromStorage();
      cart = cart.filter(item => item._id !== itemId);
      saveCartToStorage(cart);
      return { success: true, data: cart };
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: error.message };
  }
};

// Update cart item quantity
export const updateCartItemQty = async (itemId, qty, isAuthenticated) => {
  try {
    if (isAuthenticated) {
      const data = await apiService.cart.updateCartItem(itemId, qty);
      return { success: true, data };
    } else {
      const cart = getCartFromStorage();
      const item = cart.find(item => item._id === itemId);
      
      if (item) {
        item.qty = qty;
        saveCartToStorage(cart);
        return { success: true, data: cart };
      } else {
        throw new Error('Item not found in cart');
      }
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return { success: false, error: error.message };
  }
};

// Clear cart
export const clearCart = (isAuthenticated) => {
  try {
    if (isAuthenticated) {
      // Note: You might want to implement this in your backend
      console.log('Clear cart on backend not implemented');
    } else {
      clearCartFromStorage();
    }
    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false, error: error.message };
  }
};

// Sync local cart with server after login
export const syncCartWithServer = async (localCart) => {
  try {
    // First, get the current server cart
    const { data: serverCart } = await getCart(true);
    
    // Merge local cart with server cart
    const mergedCart = [...serverCart];
    
    localCart.forEach(localItem => {
      const existingItem = mergedCart.find(item => item.product.toString() === localItem.product);
      
      if (existingItem) {
        // If item exists in both carts, keep the larger quantity
        existingItem.qty = Math.max(existingItem.qty, localItem.qty);
      } else {
        // Add local item to server cart
        mergedCart.push({
          product: localItem.product,
          name: localItem.name,
          image: localItem.image,
          price: localItem.price,
          countInStock: localItem.countInStock,
          qty: localItem.qty
        });
      }
    });
    
    // Update server cart with merged cart
    // Note: You'll need to implement this in your backend
    console.log('Sync cart with server not fully implemented');
    
    return { success: true, data: mergedCart };
  } catch (error) {
    console.error('Error syncing cart with server:', error);
    return { success: false, error: error.message };
  }
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQty,
  clearCart,
  syncCartWithServer,
};
