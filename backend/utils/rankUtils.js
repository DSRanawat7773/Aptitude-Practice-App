const User = require('../models/User');

const calculateRanks = async () => {
  try {
    // Fetch all users
    const users = await User.find();

    // Calculate each user's average score and find the highest average score
    users.forEach((user) => {
      user.averageScore = user.cumulativeScore / user.numTestsGiven;
    });
    const highestAvgScore = Math.max(...users.map(user => user.averageScore));

    // Calculate overall rank, college rank, and rank percentage
    const collegeUsersMap = new Map();

    // Sort users by average score in descending order for overall ranks
    users.sort((a, b) => b.averageScore - a.averageScore).forEach((user, index) => {
      user.overallRank = index + 1;

      // Calculate rank percentage based on highest average score
      user.rankPercentage = (user.averageScore / highestAvgScore) * 100;

      // Group users by college
      if (!collegeUsersMap.has(user.college)) {
        collegeUsersMap.set(user.college, []);
      }
      collegeUsersMap.get(user.college).push(user);
    });

    // Calculate college ranks for each college group
    collegeUsersMap.forEach((collegeUsers) => {
      // Sort college users by average score within each college
      collegeUsers.sort((a, b) => b.averageScore - a.averageScore);

      // Assign college ranks
      collegeUsers.forEach((user, index) => {
        user.collegeRank = index + 1;
      });
    });

    // Prepare bulk operations for efficient database updates
    const bulkOperations = users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: {
          overallRank: user.overallRank,
          collegeRank: user.collegeRank,
          rankPercentage: user.rankPercentage.toFixed(2), // Format percentage to 2 decimal places
        },
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
