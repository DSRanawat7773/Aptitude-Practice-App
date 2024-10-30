//authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the format 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    console.log("User authenticated:", req.user);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

module.exports = { authenticateUser };
