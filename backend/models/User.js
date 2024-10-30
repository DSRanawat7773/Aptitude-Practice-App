const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  password: { type: String, required: true },
  cumulativeScore: { type: Number, default: 0 },
  scores: [
    {
      category: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
  overallRank: { type: Number, default: 0 },
  collegeRank: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
