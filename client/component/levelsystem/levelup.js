// import { getUserdata } from "../api/api_user";
// import Users from './models/Users'; // Adjust the path to your actual Users model

// function calculateNextLevelXP(level) {
//     let baseXP = 50; // XP needed to level up from level 1 to 2
//     let increaseRate;
  
//     if (level >= 1 && level <= 50) {
//       increaseRate = 0.1;
//     } else if (level >= 51 && level <= 60) {
//       increaseRate = 0.2;
//     } else if (level >= 61 && level <= 70) {
//       increaseRate = 0.3;
//     } else if (level >= 71 && level <= 80) {
//       increaseRate = 0.4;
//     } else if (level >= 81 && level <= 90) {
//       increaseRate = 0.5;
//     } else if (level >= 91 && level <= 100) {
//       increaseRate = 0.6;
//     } else {
//       return Infinity; // Level cap reached
//     }
  
//     // Calculate the XP needed for the next level
//     for (let i = 2; i <= level; i++) {
//       baseXP += baseXP * increaseRate;
//     }
  
//     return Math.round(baseXP);
//   }
  


//   export default async function gainXP(userId, gainedXP) {
//     try {
//       const user = await Users.findOne({ firebaseUID: userId });
  
//       if (!user) {
//         console.log('User not found');
//         return;
//       }
  
//       user.exp += gainedXP;
  
//       let nextLevelXP = calculateNextLevelXP(user.level);
  
//       while (user.exp >= nextLevelXP && user.level < 100) {
//         user.exp -= nextLevelXP;
//         user.level += 1;
//         nextLevelXP = calculateNextLevelXP(user.level);
//       }
  
//       await user.save();
  
//       console.log(`User ${user.username} is now level ${user.level} with ${user.exp} XP.`);
//     } catch (error) {
//       console.error('Error updating user XP and level:', error);
//     }
//   }