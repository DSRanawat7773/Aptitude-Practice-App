// controllers/leaderboardController.js
const User = require('../models/User');

// Fetch leaderboard for a specific college
const getCollegeLeaderboard = async (req, res) => {
  try {
    const { college } = req.params;
    const users = await User.find({ college }).sort({ score: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching college leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch overall leaderboard
const getOverallLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching overall leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCollegeLeaderboard, getOverallLeaderboard };
