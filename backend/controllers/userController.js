const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { calculateRanks } = require('../utils/rankUtils');

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, college } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      username,
      email,
      college,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      college: user.college,
      token: generateToken(user._id), // Generate and send token
    });
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist. Please register first.' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // If everything is okay, send a success response with token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id), // Generate token and send it back
    });
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    // Use req.user populated by your authenticate middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Return user data
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
};

// Save test score
const saveTestScore = async (req, res) => {
  console.log('saveTestScore called with:', req.body);
  const { score, category } = req.body;

  if (!score || typeof score !== 'number' || score < 0 || !category) {
    return res.status(400).json({ message: 'Score and category are required and must be valid.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save score
    user.scores.push({ category, score });
    user.cumulativeScore += score; // Update cumulative score
    await user.save();

    // Call calculateRanks after saving the score
    await calculateRanks();

    res.status(200).json({ message: 'Score saved successfully and ranks updated.' });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get leaderboard data
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ overallRank: 1 }).select('username cumulativeScore overallRank college collegeRank');
    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error fetching leaderboard.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  saveTestScore, // Export saveTestScore
  getLeaderboard,
};
