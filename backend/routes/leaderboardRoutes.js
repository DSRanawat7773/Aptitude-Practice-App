// routes/leaderboardRoutes.js
const express = require('express');
const { getCollegeLeaderboard, getOverallLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

router.get('/college/:college', getCollegeLeaderboard);
router.get('/overall', getOverallLeaderboard);

module.exports = router;
