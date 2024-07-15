const express = require('express');
const router = express.Router();
const Users = require("../models/user.model");

// Route to create a new user ==================================================================
router.post('/', async (req, res) => {
  try {
    const user_data = new Users({
      firebaseUID: req.body.firebaseUID,  // Ensure this matches the request body field
      username: req.body.username,
      level: req.body.level,
      exp: req.body.exp,
      coin: req.body.coin,
      Victory: req.body.Victory
      // username: req.body.username,
    });

    const savedUser = await user_data.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});


//=====================================================================================
router.put('/:firebaseUID/playdone', async (req, res) => {
  const { firebaseUID  } = req.params;
  
  try {
    const updatedVictory = await Users.findOneAndUpdate(
      {firebaseUID: firebaseUID },
      { $inc: { Victory: 1 } },
      { new: true }
    );

    if (!updatedVictory) {
      return res.status(404).json({ error: 'firebaseUID not found or not authorized' });
    }

    res.json(updatedVictory);
  } catch (error) {
    console.error('Error updating Victory:', error);
    res.status(500).json({ error: error.message });
  }
});
//=====================================================================================


// Route to get all users ==================================================================
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:firebaseUID', async (req, res) => {
  try {
    const userData = await Users.findOne({ firebaseUID: req.params.firebaseUID });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ error: error.message });
  }
});

//=====================================================================================
// router.put('/:firebaseUID/gain_level', async (req, res) => {
//   const { firebaseUID  } = req.params;
  
//   try {
//     const updatedVictory = await Users.findOneAndUpdate(
//       {firebaseUID: firebaseUID },
//       {exp : newexp},
//       {level : newlevel},
//       { new: true }
//     );

//     if (!updatedVictory) {
//       return res.status(404).json({ error: 'firebaseUID not found or not authorized' });
//     }

//     res.json(updatedVictory);
//   } catch (error) {
//     console.error('Error updating Victory:', error);
//     res.status(500).json({ error: error.message });
//   }
// });
//=====================================================================================
router.put('/:firebaseUID/gain_level', async (req, res) => {
  const { firebaseUID } = req.params;
  const { gainedExp } = req.body;

  try {
    // Find the current user data
    const user = await Users.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let { exp, level } = user;
    exp += gainedExp;

    // Function to calculate max exp for next level
    const calculateMaxExp = (currentLevel) => {
      let baseExp = 50;
      let multiplier = 1.1;

      if (currentLevel > 50 && currentLevel <= 60) multiplier = 1.2;
      else if (currentLevel > 60 && currentLevel <= 70) multiplier = 1.3;
      else if (currentLevel > 70 && currentLevel <= 80) multiplier = 1.4;
      else if (currentLevel > 80 && currentLevel <= 90) multiplier = 1.5;
      else if (currentLevel > 90 && currentLevel <= 100) multiplier = 1.6;

      for (let i = 1; i < currentLevel; i++) {
        baseExp *= multiplier;
      }

      return Math.round(baseExp);
    };

    // Level up loop
    while (level < 100 && exp >= calculateMaxExp(level)) {
      exp -= calculateMaxExp(level);
      level++;
    }

    // Cap level at 100
    level = Math.min(level, 100);
    
    // If level 100, cap exp at max
    if (level === 100) {
      exp = Math.min(exp, calculateMaxExp(100));
    }

    // Update user data
    const updatedUser = await Users.findOneAndUpdate(
      { firebaseUID },
      { 
        $set: { 
          exp: exp,
          level: level
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Failed to update user data' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user level and experience:', error);
    res.status(500).json({ error: error.message });
  }
});

//=====================================================================================

module.exports = router;
