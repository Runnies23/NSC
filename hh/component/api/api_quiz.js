import axios from 'axios';

const API_URL = 'https://yhlqvrfmem5gubk25e3kxrvsua0kqygv.lambda-url.ap-southeast-2.on.aws/quiz';

// Function to add a flashcard set

const addFlashcardClass = async (setName) => {
    try {
      const response = await axios.post(`${API_URL}/stage`, { setName });
      return response.data;
    } catch (error) {
      console.error('Error creating flashcard set:', error);
      throw new Error('Failed to create flashcard set. Please try again later.');
    }
  };
// export 
const addFlashcardSet = async (setName) => {
  try {
    const response = await axios.post(`${API_URL}/stage`, { setName });
    return response.data;
  } catch (error) {
    console.error('Error creating flashcard set:', error);
    throw new Error('Failed to create flashcard set. Please try again later.');
  }
};

// Function to add a flashcard to a specific set

// export 
 const addFlashcard = async (setId, question, choices) => {
  try {
    const response = await axios.post(`${API_URL}/stage/${setId}/quiz`, { question, choices });
    return response.data;
  } catch (error) {
    console.error('Error adding flashcard:', error);
    throw new Error('Failed to add flashcard. Please try again later.');
  }
};

export const getQuizClass = async () => {
    try {
      const response = await axios.get(`${API_URL}/class`);
      return response.data;
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  }; 

export const getQuizSet = async (classid) => {
  try {
    const response = await axios.get(`${API_URL}/class/${classid}/stage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};

export const getQuiz = async (classid,StageId) => {
  try {
    const response = await axios.get(`${API_URL}/class/${classid}/stage/${StageId}/quiz`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};


export const updatePlayedCount_Quiz = async (classid,StageId) => {
  try {
    const response = await axios.put(`${API_URL}/class/${classid}/stage/${StageId}/play`);
    return response.data; // Return the updated flashcard set data
  } catch (error) {
    console.error('Error updating played count:', error);
    throw new Error('Failed to update played count. Please try again later.');
  }
};
