import React from 'react';
import { View, Text , StyleSheet, Pressable, TextInput } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Go_back_button = ({navigation}) => {

    const Go_back = () => {
        navigation.navigate('Profile_Home');
      }; 

  return (
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
      
    }
  })


export default Go_back_button;

