import React from 'react';
import { NavigationContainer , useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState , useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//login firebase 

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig.js';
import LoginScreen from './component/loginsystem/login.js';
import RegisterScreen from './component/loginsystem/register.js';

// login 
import Login from './component/loginsystem/login_save.js';
// import LoadingScreen from './src/loadingscreen';

//Homepage
import Homepage from './src/page/homepage.js';
import LeaderBoard from './component/homepage/leaderboard.js';

//flashcard 
import Flashcard from './src/page/flashcard.js';
import Custom_flashcard from './component/flashcard/custom/select.js';
import Flashcard_custom_Playing from './component/flashcard/custom/playing.js';
import Singleplayer_select from './component/flashcard/singleplayer.js/select.js';
import Multiplayer_select from './component/flashcard/multiplayer.js/select.js';
import Flashcard_Playing from './component/flashcard/singleplayer.js/playing.js';
import Playing_MultiplayerFlashcardGame from './component/flashcard/multiplayer.js/playing_multiple.js';

//adding 
import Adding_page from './src/page/adding.js';
import Adding_manual from './component/adding/manual.js';
import Adding_AI from './component/adding/gemini.js';
import Camera_OCR from './component/adding/camera.js';

//Quiz 
import Quiz from './src/page/quiz.js';
import Quiz_stage from './component/quiz/select.js';
import Quiz_playing from './component/quiz/playing.js';

//Profile 
import Profile_Home from './src/page/profile.js';
import Avatar_setting from './component/profile/avatar_setting.js';
import Quiz_Progress from './component/quiz/quest_progress.js';
import Setting from './component/profile/setting.js';

//testing 
import SplashScreen from './src/page/spalshscreen.js';
import AuthLoadingScreen from './src/page/AsyncStorage.js';
// import LoginScreen from './component/loginsystem/login_save.js';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={Homepage} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
    </Stack.Navigator>
  );
}

function FlashCard_Stack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Flash_card_Home" component={Flashcard} />
      <Stack.Screen name="Custom_flashcard_select" component={Custom_flashcard} />
      <Stack.Screen name="Custom_Playing" component={Flashcard_custom_Playing} />
      <Stack.Screen name="Flashcard_singleplayer_select" component={Singleplayer_select} />
      <Stack.Screen name="Flashcard_multiplayer_select" component={Multiplayer_select} />
      <Stack.Screen name="Flashcard_Playing_signleplayer" component={Flashcard_Playing} />
      <Stack.Screen name="Flashcard_Playing_multiplayer" component={Playing_MultiplayerFlashcardGame} />
    </Stack.Navigator>
  );
}

function Adding_Stack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Adding_Home" component={Adding_page} />
      <Stack.Screen name="Adding_manual" component={Adding_manual} />
      <Stack.Screen name="Adding_AI" component={Adding_AI} />
      <Stack.Screen name="Camera_OCR" component={Camera_OCR} />
    </Stack.Navigator>
  );
}

function Quiz_Stack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Quiz_home" component={Quiz} />
      <Stack.Screen name="Quiz_stage" component={Quiz_stage} />
      <Stack.Screen name="Quiz_playing" component={Quiz_playing} />
    </Stack.Navigator>
  );
}

function Profile_Stack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Profile_Home" component={Profile_Home} />
      <Stack.Screen name="Avatarsetting" component={Avatar_setting} />
      <Stack.Screen name="Quest_progress" component={Quiz_Progress} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}



function Application() {
  return (

      <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (route.name === 'Flashcard') {
                            iconName = focused ? 'school' : 'school-outline';

                        } else if (route.name === 'Adding') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';

                        } else if (route.name === 'Quiz') {
                            iconName = focused ? 'help' : 'help-outline';

                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        // Return any component that you like here!
                        return <Icon name={iconName} size={size} color={color} />;
                        
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen 
                      name="Home" 
                    component={MainStack} 
                    options={{ title: 'Main' }} />
                <Tab.Screen 
                      name="Flashcard" 
                      component={FlashCard_Stack} 
                      options={{ title: 'Flashcard' }} />
                <Tab.Screen 
                      name="Adding" 
                      component={Adding_Stack}
                      options={{ title: 'Adding' }} />
                <Tab.Screen 
                      name="Quiz" 
                      component={Quiz_Stack} 
                      options={{ title: 'Quiz' }} />
                <Tab.Screen 
                      name="Profile" 
                      component={Profile_Stack} 
                      options={{ title: 'Profile' }} />
                      
            </Tab.Navigator>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn === 'true') {
          setInitialRoute('Application');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking user login state:', error);
        setInitialRoute('Login'); // Fallback to Login screen in case of error
      }
    };

    checkUserLoggedIn();
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Application" component={Application} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
              

export default App;