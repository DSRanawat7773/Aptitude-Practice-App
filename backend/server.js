// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const cors = require('cors');

console.log("Server is up and running");

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Import rankScheduler to execute the scheduled task
require('./cron/rankScheduler');
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error. Please try again later.' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
