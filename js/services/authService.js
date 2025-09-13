import apiService from '../apiService';
import { setToken, removeToken } from '../utils/storage';

// Register a new user
export const register = async (userData) => {
  try {
    const { data, token } = await apiService.auth.register(userData);
    setToken(token);
    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const { data, token } = await apiService.auth.login({ email, password });
    setToken(token);
    return { success: true, data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logout = () => {
  removeToken();
  return { success: true };
};

// Get user profile
export const getProfile = async () => {
  try {
    const data = await apiService.auth.getProfile();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { success: false, error: error.message };
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const { data, token } = await apiService.auth.updateProfile(userData);
    // Update token if a new one was returned
    if (token) {
      setToken(token);
    }
    return { success: true, data };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  isAuthenticated,
};
