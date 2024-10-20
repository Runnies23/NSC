import axios from 'axios';

const API_URL = 'https://yhlqvrfmem5gubk25e3kxrvsua0kqygv.lambda-url.ap-southeast-2.on.aws/flashcard';

// Function to add a flashcard set
export const addFlashcardSet = async (setName,username) => {
  try {
    const response = await axios.post(`${API_URL}/sets`, { setName , Create_Author: username  });
    return response.data;
  } catch (error) {
    console.error('Error creating flashcard set:', error);
    throw new Error('Failed to create flashcard set. Please try again later.');
  }
};

// Function to add a flashcard to a specific set
export const addFlashcard = async (setId, question, answer) => {
  try {
    const response = await axios.post(`${API_URL}/sets/${setId}/flashcards`, { question, answer });
    return response.data;
  } catch (error) {
    console.error('Error adding flashcard:', error);
    throw new Error('Failed to add flashcard. Please try again later.');
  }
};

export const getFlashcardSet = async () => {
  try {
    const response = await axios.get(`${API_URL}/sets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};

export const getFlashcards = async (setId) => {
  try {
    const response = await axios.get(`${API_URL}/sets/${setId}/flashcards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }
};

export const updatePlayedCount_Flashcards = async (setId) => {
  try {
    const response = await axios.put(`${API_URL}/sets/${setId}/play`);
    return response.data; // Return the updated flashcard set data
  } catch (error) {
    console.error('Error updating played count:', error);
    throw new Error('Failed to update played count. Please try again later.');
  }
};