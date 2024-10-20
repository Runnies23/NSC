import React from 'react';
import { View, Text , StyleSheet, Pressable, TextInput , FlatList } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseconfig';
import { Register_User } from '../api/api_user';
import { Button } from 'react-native-elements';
import { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Setting = ({ navigation }) => {

    const Go_back = () => {
        navigation.navigate('Profile_Home');
        }; 

    const handleLogout = async () => {
      try {
        await auth.signOut(); // Sign out user from Firebase
        await AsyncStorage.removeItem('userLoggedIn'); // Remove user session
        await AsyncStorage.removeItem('userId'); // Remove user ID
        console.log('User signed out successfully');
        navigation.replace('Splash'); // Navigate to Splash screen after logout
      } catch (error) {
        console.error('Error signing out:', error);
        Alert.alert('Logout Failed', 'An error occurred while signing out. Please try again.');
      }
    };

  return (
    <View style={styles.Screen}>
      <View style={arrowback.display}> 
        <Pressable style={arrowback.arrowback}>
            <Icon
            name="arrow-back"
            type="material"
            color="#000"
            size={30}
            onPress={Go_back}
          />
        </Pressable>
      </View>
    
        <Pressable onPress={handleLogout} style={styles.Button}>
            <Text style={styles.text}>Logout</Text>
        </Pressable>

    </View>
  );
};
const styles = StyleSheet.create({ 
      Screen:{
        backgroundColor : "#DED6FF",
        width : "100%",
        height : "100%",
        paddingTop : 80,
        alignItems : 'center', 
        display : 'flex',
        flexDirection : 'column',
        gap : 10
    },
      Button: { 
        width : "85%" , 
        height : 50,
        backgroundColor : '#A798D8',
        borderRadius : 5,
        justifyContent : "center" ,
        alignItems : 'center' ,
      },
      text : {
        color : "black",
        fontSize : 20,
        fontWeight : 'bold'
      }

  });

  const arrowback = StyleSheet.create ({
    display : {
      width : "90%" ,
      display : 'flex' , 
      flexDirection : 'row' , 
    },
    arrowback : {
      width : "50%",
      alignItems : 'flex-start',
      paddingHorizontal : 20,
      paddingVertical : 10,
      
    },
    setting : {
      width : "50%",
      alignItems : 'flex-end' ,
      paddingHorizontal : 20,
      paddingVertical : 10,
    }
  })
export default Setting;

