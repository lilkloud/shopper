const API_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authApi = {
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
  getProfile: (token) => apiRequest('/auth/profile', 'GET', null, token),
  updateProfile: (userData, token) => apiRequest('/auth/profile', 'PUT', userData, token),
};

// Products API
export const productsApi = {
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/products?${queryParams}`);
  },
  getProduct: (id) => apiRequest(`/products/${id}`),
  getTopProducts: () => apiRequest('/products/top'),
  createProduct: (productData, token) => apiRequest('/products', 'POST', productData, token),
  updateProduct: (id, productData, token) => apiRequest(`/products/${id}`, 'PUT', productData, token),
  deleteProduct: (id, token) => apiRequest(`/products/${id}`, 'DELETE', null, token),
  createReview: (id, reviewData, token) => 
    apiRequest(`/products/${id}/reviews`, 'POST', reviewData, token),
};

// Cart API
export const cartApi = {
  getCart: (token) => apiRequest('/cart', 'GET', null, token),
  addToCart: (productId, qty, token) => apiRequest('/cart', 'POST', { productId, qty }, token),
  updateCartItem: (itemId, qty, token) => apiRequest(`/cart/${itemId}`, 'PUT', { qty }, token),
  removeFromCart: (itemId, token) => apiRequest(`/cart/${itemId}`, 'DELETE', null, token),
};

// Helper to get auth token from localStorage
const getAuthToken = () => localStorage.getItem('token');

// Set up axios instance with auth token
const getAuthHeader = () => ({
  headers: {
    'x-auth-token': getAuthToken(),
  },
});

// Set token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export default {
  auth: authApi,
  products: productsApi,
  cart: cartApi,
  setAuthToken,
  getAuthToken,
};
