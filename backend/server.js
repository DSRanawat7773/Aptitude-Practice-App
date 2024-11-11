// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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


require('./cron/rankScheduler');
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error. Please try again later.' });
});

let otpStore = {}; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dalpatsaranawat@gmail.com',  
    pass: 'xwxg hnhs moyi btki',  
  },
});

const sendOtpEmail = (email, otp, userName) => {
  const mailOptions = {
    from: 'dalpatsaranawat@gmail.com',
    to: email,
    subject: 'Your OTP for Registration',
    text: `Dear ${userName},

Thank you for registering with AptiQ!

To complete your registration process, we need to verify your email address. Please enter the OTP (One-Time Password) below on the registration page:

Your OTP: ${otp}

This OTP is valid for the next 10 minutes. If you did not request this verification, please ignore this email.

Should you face any issues or have any questions, feel free to reach out to us at www.AptiQ.com.

Best regards,
The AptiQ Team
www.aptiQ.com
dalpatsaranawat@gmail.com
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('OTP sent: ' + info.response);
    }
  });
};

app.post('/api/send-otp', (req, res) => {
  const { email, username } = req.body;
  const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
  otpStore[email] = otp;

  sendOtpEmail(email, otp, username);
  res.json({ success: true });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === parseInt(otp)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
