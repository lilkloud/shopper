import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService, { setAuthToken } from './apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        setAuthToken(token);
        const userData = await apiService.auth.getProfile();
        setUser(userData);
      } catch (err) {
        console.error('Error checking auth status:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const data = await apiService.auth.register(userData);
      setAuthToken(data.token);
      setUser(data);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const data = await apiService.auth.login({ email, password });
      setAuthToken(data.token);
      setUser(data);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const data = await apiService.auth.updateProfile(userData);
      setUser(data);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Update failed');
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
