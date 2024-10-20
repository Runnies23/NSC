import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initialize fade animation value

  useEffect(() => {
    // Function to fade in the text on SplashScreen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Function to check user login status
    const checkUserLoggedIn = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        const userId = await AsyncStorage.getItem('userId');
        
        if (userLoggedIn === 'true' && userId) {
          navigation.replace('Application'); // Navigate to Application if user is logged in
        } else {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              AsyncStorage.setItem('userLoggedIn', 'true');
              AsyncStorage.setItem('userId', user.uid);
              navigation.replace('Application');
            } else {
              navigation.replace('Login');
            }
          });
        }
      } catch (error) {
        console.error('Error checking user login state:', error);
        navigation.replace('Login'); // Fallback to Login screen in case of error
      }
    };

    checkUserLoggedIn();
  }, [navigation, fadeAnim]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Animated text with fade-in effect */}
      <Animated.Text style={{ opacity: fadeAnim, fontSize: 30 }}>Welcome!</Animated.Text>
    </View>
  );
};

export default SplashScreen;