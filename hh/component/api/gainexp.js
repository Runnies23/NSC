import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { getUserdata } from './api_user';

const API_URL = 'https://yhlqvrfmem5gubk25e3kxrvsua0kqygv.lambda-url.ap-southeast-2.on.aws/user';

// const firebaseUID = await AsyncStorage.getItem('userId');

export const updateExperience = async (userId,gainedExp,gainCoin) => {

    
    try {
      const response = await axios.put(`${API_URL}/${userId}/gain_level`, { gainedExp, gainCoin});
      return response.data;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw new Error('Failed to update experience. Please try again later.');
    }
  };

  
export const update_victory = async (userId) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}/playdone`);
      return response.data;
    } catch (error) {
      console.error('Error updating victory:', error);
      throw new Error('Failed to update victory. Please try again later.');
    }
};