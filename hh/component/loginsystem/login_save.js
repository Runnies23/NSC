import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const signInWithGoogle = ({navigation}) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            await AsyncStorage.setItem('userToken', token);
            navigation.replace('App');
        })
        .catch((error) => {
            console.error(error);
        });
};

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        // Replace this with your actual login logic
        if (username && password) {
            await AsyncStorage.setItem('userToken', 'dummy-token');
            navigation.replace('App');
        } else {
            console.log('Invalid username or password');
        }
    };

    return (
        <View style={styles.Screen}>
            <View style={[styles.container, { backgroundColor: '#DED6FF' }]}>
                <Text style={styles.Title}>Let's Get Start</Text>
                <View style={styles.Blank_1}></View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Enter your username"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter your password"
                    secureTextEntry
                />
                <View style={styles.login_button}>
                    <Button title="Login" onPress={handleLogin} />
                </View>
                <View style={styles.firebaselogin}>
                    <View style={styles.firebase_button}>
                        <Button title="Sign in with Google" onPress={signInWithGoogle} />
                    </View>
                    <View style={styles.firebase_button}>
                        <Button title='Google' />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Screen: {
        backgroundColor: "#DED6FF",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: 'center'
    },
    Title: {
        fontSize: 24,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 20,
        color: '#AFAFAF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '80%',
    },
    login_button: {
        marginVertical: 20,
    },
    firebaselogin: {
        width: '100%',
        height: 100,
        backgroundColor: 'black',
        marginVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    firebase_button: {
        backgroundColor: 'white',
        height: 'auto',
        width: '80%'
    },
    Blank_1: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'black',
        marginVertical: 20,
    },
});

export default LoginScreen;
