// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Update user profile
const updateProfile = async (userData) => {
  try {
    const token = getCurrentUser()?.token;
    const response = await axios.put(API_URL + 'update', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const token = getCurrentUser()?.token;
    const response = await axios.get(API_URL + 'profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  getProfile,
};
