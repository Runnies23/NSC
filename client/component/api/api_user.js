import axios from 'axios';

const API_URL = 'https://yhlqvrfmem5gubk25e3kxrvsua0kqygv.lambda-url.ap-southeast-2.on.aws/user';

const Getdata = 'https://yhlqvrfmem5gubk25e3kxrvsua0kqygv.lambda-url.ap-southeast-2.on.aws/getdata'

// Function to add a flashcard set

export const Register_User = async (firebaseUID, username) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      firebaseUID,
      username,
      level: 1,  // Default value
      exp: 0,    // Default value
      coin: 0,    // Default value,

    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getUserdata = async (firebaseUID) => {
  try {
    const response = await axios.get(`${API_URL}/${firebaseUID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};

export const fetchTopVictory_Users = async () => {
  try {
    const response = await axios.get(`${Getdata}/top_victory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
  } 
};


// export const update_user_level_exp = async (classid,StageId) => {
//   try {
//     const response = await axios.put(`${API_URL}/class/${classid}/stage/${StageId}/play`);
//     return response.data; // Return the updated flashcard set data
//   } catch (error) {
//     console.error('Error updating played count:', error);
//     throw new Error('Failed to update played count. Please try again later.');
//   }
// };



export const User_Earn_daily_login = async (firebaseUID) => {
  try {
    const response = await axios.get(`${Getdata}/dailylogin/${firebaseUID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};
