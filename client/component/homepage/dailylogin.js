import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId_Asyc } from '../api/getuserdata';

const DailyLogin = () => {
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [streak, setStreak] = useState(0);
  const { userId } = getUserId_Asyc ();

  useEffect(() => {
    checkDailyLogin();
  }, []);

  const checkDailyLogin = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('lastLoginDate');
      const storedStreak = await AsyncStorage.getItem('loginStreak');
      
      if (storedStreak) {
        setStreak(parseInt(storedStreak));
      }

      const today = new Date().toDateString();

      if (storedDate !== today) {
        // It's a new day, update the login date and streak
        await AsyncStorage.setItem('lastLoginDate', today);
        const newStreak = storedDate === new Date(Date.now() - 86400000).toDateString()
          ? streak + 1
          : 1;
        setStreak(newStreak);
        await AsyncStorage.setItem('loginStreak', newStreak.toString());
        setLastLoginDate(today);
      } else {
        setLastLoginDate(storedDate);
      }
    } catch (error) {
      console.error('Error checking daily login:', error);
    }
  };

  return (
    <View>
      <Text>Last Login: {lastLoginDate || 'Never'}</Text>
      <Text>Current Streak: {streak} days</Text>
      <Button title="Refresh" onPress={checkDailyLogin} />
    </View>
  );
};

export default DailyLogin;