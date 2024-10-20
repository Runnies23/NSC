import React from 'react';
import { View, Text , StyleSheet , FlatList , TextInput , Pressable } from 'react-native';
import { useEffect , useState } from 'react';

import HomePage_popular_card from '../../component/homepage/popular_card';
import { Button } from 'react-native-elements';
import Popular_card from '../../component/homepage/popular_card';
import { Icon } from 'react-native-elements';

import { updateExperience } from '../../component/api/gainexp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId_Asyc } from '../../component/api/getuserdata';

import { User_Earn_daily_login } from '../../component/api/api_user';

import WalkingAnimation from '../../component/quiz/pvp/fish';



const Homepage = ({ navigation }) => {

    const [size,Setsize] = useState(20)
    const { userId } = getUserId_Asyc ();


    const [userData, setUserData] = useState(null);
    // const [buttonDisabled, setButtonDisabled] = useState(false);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //       try {
    //         const data = await User_Earn_daily_login(userId);
    //         setUserData(data);
    //         if (data.success) {
    //           setButtonDisabled(true); // Disable button if daily reward already claimed
    //         }
    //       } catch (error) {
    //         console.error('Error fetching user data:', error);
    //       }
    //     };
    
    //     fetchUserData();
    //   }, [userId]);
    
      const handlePress = async () => {
        try {
          const data = await User_Earn_daily_login(userId);
          setUserData(data);
          if (data.success) {
            // setButtonDisabled(true); // Disable button after claiming reward
            console.log('claiming daily reward:');
          }
        } catch (error) {
          console.error('Error claiming daily reward:', error);
        }
        // User_Earn_daily_login(userId);
      };

    const go_to_leaderboard = () => { 
        navigation.navigate('LeaderBoard');
      };

    // const go_to_Shop = () => { 
    // navigation.navigate('Flashcard_singleplayer_select');
    // };

    // const go_to_Quest = () => { 
    // navigation.navigate('Flashcard_singleplayer_select');
    // };

  return (
    <View style={styles.Screen}>
        <Text style={styles.Title}>Home</Text>
        <View style={styles.Most_popular_box}>
            <View><Text style={styles.Section_text}>Most Popular!</Text></View>
            <View><Popular_card/></View>
        </View>
        
        {/* <Text>{userData}</Text> */}

        <View style={styles.interaction}>
            <Pressable style={styles.leaderboard} onPress={go_to_leaderboard}>
                <Icon
                    name="medal"
                    type="font-awesome-5"
                    color="#000"
                    size={size}
                />
                <Text>LeaderBoard</Text>
            </Pressable>
            {/* <Pressable style={styles.Shop}>
                <Icon
                    name="shopping-cart"
                    type="font-awesome"
                    color="#000"
                    size={size}
                />
                <Text>Shop</Text>
            </Pressable>
            <Pressable style={styles.quest}>
                <Icon
                name="book"
                type="font-awesome"
                color="#000"
                size={size}
                />
                <Text>Quest</Text>
            </Pressable> */}
        </View>


      <WalkingAnimation/>

    </View>
  );
};
const styles = StyleSheet.create({ 
    Screen:{
        backgroundColor : "#FBF3FF",
        width : "100%",
        height : "100%",
        paddingTop : 80,
        alignItems : 'center', 
        display : 'flex',
        flexDirection : 'column',
        gap : 20,
    },
    Title : {
        fontSize : 40,
        fontWeight : 'bold',
        
    },
    Section_text : {
        fontSize : 25 ,
        fontWeight : 'bold',
        marginBottom : 10,
        paddingLeft : 30,
    },
    Most_popular_box : { 
        height : "25%" , 
        width : "95%",
        display : 'flex', 
        justifyContent : 'center',
        marginTop : 10,
    },
    interaction : { 
        marginTop : 15,
        width : "90%" , 
        height : "8%",
        display : "flex",
        flexDirection : 'row' , 
        backgroundColor : "#FFFFFF",
        borderWidth : 2,
        alignItems : "center",
        justifyContent : 'center' , 
        gap : 10,
        borderRadius : 15,
        marginBottom : 30 ,
    },
    leaderboard : {
        // width : "35%" , 
        width : "80%" , 
        justifyContent : "center" , 
        alignItems : 'center',
        flexDirection  : 'row',
        gap : 5,
        paddingVertical : 10,
        paddingHorizontal : 10,
        backgroundColor : "#FFEF86",
        borderRadius : 5,
    },
    Shop : { 
        width : "25%",
        justifyContent : "center" , 
        alignItems : 'center',
        flexDirection  : 'row',
        gap : 5,
        paddingVertical : 10,
        paddingHorizontal : 5,
        backgroundColor : "#FFEF86",    
        borderRadius : 5,
    },
    quest : {
        width : "25%",
        justifyContent : "center" , 
        alignItems : 'center',
        flexDirection  : 'row',
        gap : 5,
        paddingVertical : 10,
        paddingHorizontal : 5,
        backgroundColor : "#FFEF86",
        borderRadius : 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5
      },
      buttonText: {
        color: '#fff',
        fontSize: 16
      }
  });

const daily_login  = StyleSheet.create({ 
    main : {
        width : '80%' , 
        height : "20%",
        backgroundColor : 'green',
        gap : 20, 
    },
    Title : { 
        fontWeight : 'bold' , 
        fontSize : 25,
    },
    content : { 
        backgroundColor : 'red' , 
        height : '100%',
        width : "100%",
        borderRadius : 20,
    }
})

export default Homepage