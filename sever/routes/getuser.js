const express = require('express');
const router = express.Router();
const Users = require("../models/user.model");

router.get('/top_victory', async (req, res) => {
    try {
      const topUsers = await Users.find().sort({ Victory: -1 }).limit(10);
      if (topUsers.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      res.status(200).json(topUsers);
    } catch (error) {
      console.error('Error fetching top users:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

router.get('/user/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    const user = await Users.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return user data without modifying
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
});
  

router.get('/dailylogin/:firebaseUID', async (req, res) => {
  try {
      const { firebaseUID } = req.params;
      const user = await Users.findOne({ firebaseUID });
      
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!user.lastRewardDate || user.lastRewardDate < today) {
          // User hasn't claimed reward today, so give the reward
          user.coin += 10;
          user.exp += 20;
          user.lastRewardDate = new Date();

          // Check if user leveled up (you can adjust the exp required per level)
          const expRequired = user.level * 100;
          if (user.exp >= expRequired) {
              user.level += 1;
              user.exp -= expRequired;
          }

          await user.save();
          res.json({ success: true, message: 'Daily reward claimed successfully' });
      } else {
          res.json({ success: false, message: 'Daily reward already claimed today' });
      }
  } catch (error) {
      console.error('Error claiming daily reward:', error);
      res.status(500).json({ success: false, message: 'Error claiming daily reward' });
  }
});

module.exports = router;