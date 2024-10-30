const express = require('express');
const { registerUser, loginUser, getProfile, saveTestScore, getLeaderboard } = require('../controllers/userController'); // Import getLeaderboard
const { authenticateUser } = require('../middleware/authMiddleware');
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

// Get user profile - protected route
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    await getProfile(req, res);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
});

// Save test score - protected route
router.post('/save-score', authenticateUser, async (req, res) => {
  console.log("Reached save-score route"); // Debugging log
  try {
    await saveTestScore(req, res);
  } catch (error) {
    console.error('Error saving test score:', error);
    res.status(500).json({ message: 'Server error while saving test score.' });
  }
});


// Leaderboard route
router.get('/leaderboard', async (req, res) => {
  try {
    await getLeaderboard(req, res);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error while fetching leaderboard.' });
  }
});

module.exports = router;
