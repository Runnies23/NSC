import React from 'react';
import { View, Text , StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
import { useEffect , useState , UserContext , createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserdata } from '../../component/api/api_user';

const Profile_Home = ({navigation}) => {

  const Profile_picture = () => {
    navigation.navigate('Avatarsetting');
  };

  const Quest_progress = () => {
    navigation.navigate('Quest_progress');
  };

  const Setting = () => {
    navigation.navigate('Setting');
  };

  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
          setUserId(userId);
        } else {
          console.log('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await getUserdata(userId);
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <View style={styles.Screen}>
      {data && (
              <>
      <View style={arrowback.display}> 
        <Pressable style={arrowback.setting}>
            <Icon
            name="cog-outline"
            type="material-community"
            color="#000"
            size={30}
            onPress={Setting}
          />
        </Pressable>
      </View>
      <View style={Profile.display}>
          <View style={Profile.Bio}>
            <View style={Profile.Bio_picture}>
              <Pressable style={Profile.Bio_profile} onPress={Profile_picture}>
                <View style={Profile.picture}></View>
                <Text style={Profile.customize}>Customize</Text>
              </Pressable>
            </View>
            <View style={Profile.Bio_Name}>
              
                <Text style={Profile.Bio_Name_Text}>{data.username}</Text>
                <View style={{flexDirection : 'row' , gap : 15}}>
                  <Text style={Profile.Bio_level_text}>{data.coin} Coins</Text>
                  <Text style={Profile.Bio_level_text}>Lv.{data.level}</Text>
                </View>
                
              
            </View>
          </View>
          
      </View>
      <View style={Questbutton.display}>
        <Pressable style={Questbutton.Questbutton} onPress={Quest_progress}>
            <Text style={Questbutton.Text}>Quest Progress</Text>
        </Pressable>
      </View>


      <View style={Stat.display}>
        
      <View style={white_color.white}></View>
        {/* <Text style={Stat.Title}>Collection </Text>
        <View style={Stat.stat}>
          <View style={Stat.stat_box}> 
            <Text style={Stat.stat_stat_text}>{data.Victory}</Text>
            <Text style={Stat.stat_stat_subtext}>Victory</Text>
          </View>
        </View> */}
      </View>
      </>
      )}
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
    },
    header : {
        display : 'flex' , 
        flexDirection : 'row' ,
        backgroundColor : "blue",
        width : "100%",
        justifyContent : 'center',
    },  
    center : {
        display : 'flex' , 
        justifyContent : 'center' , 
        alignItems : 'center',
        backgroundColor : "green"
    },
    topleft : {
        alignItems : 'stretch',
        backgroundColor : 'red'
    },
    Gobackbutton : {
        width : 20,
        height : 20,
        backgroundColor : 'black'
    },
    Title : {
        fontSize : 35,
        color : '#000000',
    },
  });

const arrowback = StyleSheet.create ({
  display : {
    width : "90%" ,
    display : 'flex' , 
    flexDirection : 'row' , 
  },
  setting : {
    width : "100%",
    alignItems : 'flex-end' ,
    paddingHorizontal : 20,
    paddingVertical : 10,
  }
})

const Profile = StyleSheet.create ({
  display : {
    width : "80%",
    height : '25%' , 
    display : "flex",
    gap : 10,
    flexDirection : 'column',
  },
  Bio:{
    display : 'flex ' ,
    flexDirection : 'row' , 
    height : '100%'
  },
  Bio_picture : {
    width : "45%" , 
    justifyContent : 'center' , 
    alignItems : "center"
  },
  Bio_Name : {
    width : "55%" , 
    display : 'flex' , 
    justifyContent : 'center', 
    paddingLeft : 25,
    gap : 20,
  },
  Bio_profile:{
    width : "80%",
    height : "80%",
    justifyContent : 'center' , 
    alignItems : "center"
  },
  picture : {
    width : 125 , 
    height : 125 , 
    borderRadius : 200,
    backgroundColor : 'black'
  },
  customize : { 
    backgroundColor : "#9FA0FF" , 
    paddingHorizontal : 20,
    paddingVertical : 5 , 
    borderRadius : 10,
    bottom : 10,
  },
  Bio_Name_Text: { 
    fontSize : 25,
    fontWeight : 'bold'
  },
  Bio_level_text: { 
    fontSize : 17,
    paddingLeft : 4, 
    fontWeight : 'bold'
  }
})

const Stat = StyleSheet.create ({
  display : {
    height : "65%" , 
    width : "100%" ,
    backgroundColor : 'white',
    alignItems : 'center', 
    display :'flex',
  },
  Title : {
    fontSize : 25,
    fontWeight : 'bold', 
  },
  stat : { 
    paddingTop : 20,
    width : '100%', 
    display : 'flex' , 
    flexDirection : 'row' , 
    justifyContent : 'center',
    gap : 25,
  },
  stat_box : { 
    display : "flex" , 
    flexDirection : 'column',
    justifyContent : "center" , 
    alignItems : 'center' , 
  },
  stat_stat_text : {
    fontSize : 23,
    fontWeight : 'bold'
  },
  stat_stat_subtext : {
    fontSize : 13,
    fontWeight : 'bold'
  }
})

const Questbutton = StyleSheet.create({
  Questbutton : { 
    backgroundColor : "#FFEF86" , 
    height : 40,
    justifyContent : 'center' ,
    alignItems : "center" , 
    borderRadius : 50,
    display : 'flex',
    marginBottom : 25,
    borderWidth : 1, 
  },
  display : {
    height : 'auto' ,
    width : '75%',
  },
  Text: {
    color : 'black' , 
    fontSize : 17,
  }
})

const white_color = StyleSheet.create ({
  white : {
    backgroundColor : "black" , 
    width : '100%' , 
    height : 2 , 
    marginBottom : 20,
    borderRadius : 20,
  }
})

export default Profile_Home;
