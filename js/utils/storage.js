// Helper functions for working with localStorage

export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart from storage:', error);
    return [];
  }
};

export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart to storage:', error);
    return false;
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem('cart');
    return true;
  } catch (error) {
    console.error('Error clearing cart from storage:', error);
    return false;
  }
};

export const getWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error getting wishlist from storage:', error);
    return [];
  }
};

export const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    return true;
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
    return false;
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token from storage:', error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    return true;
  } catch (error) {
    console.error('Error setting token in storage:', error);
    return false;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Error removing token from storage:', error);
    return false;
  }
};
