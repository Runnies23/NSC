// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text , StyleSheet , Image, Pressable , Alert } from 'react-native';
import { auth } from '../../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-elements/dist/helpers';

export default function LoginScreen({ navigation }) {
  const [Userinput, setUserinput] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user login state
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('userId', user.uid);
      
      console.log('User logged in successfully');
      navigation.replace('Application'); // Navigate to main app screen
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  const handlePress = () => {
    setUserinput(true);
  };

  if (!Userinput) {
    return (
      <View style={style.screen}>
        <Pressable style={style.container} onPress={handlePress}>
            <Text style={style.blacktitle}>LOGIN TO GET EXPERIENCE WITH</Text>
            <Text style={style.purpletitle}>FLASHCHEM</Text>
          <View style={style.imageContainer}>
          <Image
            source={require('../../assets/Shinobu.png')}
            style={style.Shinobu}
          />
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={style.screen}>
      <View style={style.container}>
        <Text style={style.blacktitle}>LOGIN TO GET EXPERIENCE WITH</Text>
        <Text style={style.purpletitle}>FLASHCHEM</Text>

        <View style={style.imageContainer}>
          <Image
            source={require('../../assets/Shinobu_back.png')}
            style={style.Shinobu_background}
          />
          <View style={style.inputContainer}>
            <View style={style.textinput}>
              <Text style={style.inputtext}>Username</Text>
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

        <View style={style.sameline}>
          <Text>Don't have an account ?</Text>
          <Pressable onPress={() => navigation.navigate('Register')} >
            <Text style={{color : "#BA6AE3"}}>Sign up</Text>
          </Pressable>
          
          </View>

        {error ? <Text style={style.error}>{error}</Text> : null}
        <Pressable title="Login" onPress={handleLogin} style={style.button}>
          <Text>Login</Text>
        </Pressable>

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
    gap : 10
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
  Shinobu : {
    width: 256, 
    height: 200,
    
  },
  Shinobu_background : {
    width: 316,
    height: 250,
    position : ''
  },
  inputContainer: {
    position: 'absolute',
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
    position: 'relative',
    width: 306,
    height: 250,
    marginTop: 40,
    justifyContent : "center",
    alignItems : 'center'
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
    padding : 20,
    justifyContent : 'center' ,
    alignItems : 'center' , 
    borderRadius : 10,
  }
})
