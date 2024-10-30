const cron = require('node-cron');
const { calculateRanks } = require('../utils/rankUtils');

// Schedule rank calculation every 15 minutes with error handling
cron.schedule('*/15 * * * *', async () => {
  try {
    await calculateRanks();
    console.log('Ranks updated successfully.');
  } catch (error) {
    console.error('Error updating ranks in cron job:', error);
  }
});
