const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController'); // Import controller methods
const router = express.Router();

// Middleware to validate registration fields
const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }
  next();
};

// Middleware to validate login fields
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }
  next();
};

// Middleware to authenticate users (make sure to adjust the logic to verify JWT tokens)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }
  
  // Here, you would verify the token and set req.user accordingly
  // Assuming you have a function verifyToken to handle this
  try {
    const decoded = verifyToken(token); // Implement this function as per your auth strategy
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Register user
router.post('/register', validateRegistration, async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Login user
router.post('/login', validateLogin, async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    await getProfile(req, res); // Ensure this function is implemented in your controller
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
});

module.exports = router;
