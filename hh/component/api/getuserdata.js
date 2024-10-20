import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserId_Asyc  = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId !== null) {
                    setUserId(storedUserId);
                } else {
                    console.log('User ID not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error getting user ID:', error);
            }
        };
        getUserId();
    }, []);

    return { userId };
};