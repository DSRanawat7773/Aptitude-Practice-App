const User = require('../models/User');

const calculateRanks = async () => {
  try {
    // Fetch all users sorted by cumulative score in descending order
    const users = await User.find().sort({ cumulativeScore: -1 });

    // Map to hold users grouped by college
    const collegeUsersMap = new Map();

    // Assign overall ranks and group users by college
    users.forEach((user, index) => {
      user.overallRank = index + 1;

      // Group users by college
      if (!collegeUsersMap.has(user.college)) {
        collegeUsersMap.set(user.college, []);
      }
      collegeUsersMap.get(user.college).push(user);
    });

    // Calculate and assign college ranks for each college
    collegeUsersMap.forEach((collegeUsers) => {
      // Sort college users by cumulative score within each college
      collegeUsers.sort((a, b) => b.cumulativeScore - a.cumulativeScore);

      // Assign college ranks
      collegeUsers.forEach((user, index) => {
        user.collegeRank = index + 1;
      });
    });

    // Prepare bulk operations for efficient database updates
    const bulkOperations = users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { overallRank: user.overallRank, collegeRank: user.collegeRank },
      },
    }));

    // Execute batch update
    await User.bulkWrite(bulkOperations);
    console.log('Ranks calculated and updated successfully.');

  } catch (error) {
    console.error('Error calculating ranks:', error);
  }
};

module.exports = { calculateRanks };
