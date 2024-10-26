// models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
