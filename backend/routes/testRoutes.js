const express = require('express');
const { startTest } = require('../controllers/testController');
const { authenticateUser } = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Protect the start test route
router.get('/practice', authenticateUser, startTest);

module.exports = router;
