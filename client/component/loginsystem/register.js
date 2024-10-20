  // RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text , StyleSheet , Image , Pressable} from 'react-native';
import { auth } from '../../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Register_User } from '../api/api_user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUID = userCredential.user.uid;

      const response = await Register_User(firebaseUID, username);
      console.log('User created:', response);

      // Store user login state
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('userId', firebaseUID);

      navigation.replace('Application'); // Navigate to main app screen
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message || 'Failed to create user. Please try again later.');
    }
  };

  return (
    <View style={style.screen}>

      <View style={style.container}>
        <Text style={style.purpletitle}>FLASHCHEM</Text>
        <Text style={style.blacktitle}>Register</Text>

        <View style={style.imageContainer}>

          <View style={style.inputContainer}>

            <View style={style.textinput}>
              <Text style={style.inputtext}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={style.input}
              />
              <Text style={style.inputtext}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={style.input}
              />
              <Text style={style.inputtext}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={style.input}
              />
            </View>

        </View>
        

        </View>

        {error ? <Text>{error}</Text> : null}
                <Pressable title="Register" onPress={handleRegister} style={style.button}>
                  <Text>Register</Text>
                </Pressable>

          <View style={style.sameline}>
          <Text>Don't have an account ?</Text>
          <Pressable onPress={() => navigation.navigate('Login')} >
            <Text style={{color : "#BA6AE3"}}>Sign in</Text>
          </Pressable>
          
          </View>

        <Image
        source={require('../../assets/Shinobu_loading.png')}
        style={style.Shinobu}
        />


      </View>

      
    </View>
  );
}

const style = StyleSheet.create ( { 
  screen : {
    paddingTop : 80, 
    width : "100%", 
    height : "100%" , 
    backgroundColor : "#FBF3FF",
    alignItems : "center",
  },
  container : {
    width : "90%", 
    height : "100%" , 
    alignItems : "center",
    gap : 10,
  },
  title: { 
    display : "flex" , 
    flexDirection : 'col'
  },
  blacktitle : {
    fontSize : 50,
    fontWeight : 'bold'
  },
  purpletitle : {
    fontSize : 50,
    fontWeight : 'bold',
    color  : "#BA6AE3"
  }, 
  Shinobu_background : {
    width: 316,
    height: 250,
    position : ''
  },
  inputContainer: {
    width : "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 2,
    paddingLeft : 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  imageContainer: {
    width : "85%" , 

    justifyContent : "center",
    alignItems : 'center',
  },
  textinput:  { 
    marginTop : 30,
  },
  inputtext : { 
    paddingLeft : 20
  },
  sameline : { 
    flexDirection : "row" , 
    gap : 10 ,
  },
  button : {
    width : "80%" , 
    backgroundColor : "#BA6AE3",
    padding : 10,
    justifyContent : 'center' ,
    alignItems : 'center' , 
    borderRadius : 10,
  }
})
