import React from 'react';
import { View, Text , StyleSheet, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';

const Adding_page = ({navigation}) => {

  const Create_manual = () => { 
    navigation.navigate('Adding_manual');
  };

  const Create_AI = () => { 
    navigation.navigate('Adding_AI');
  };

    return (
    <View style={styles.Screen}>
      <View style={styles.header}> 
   
        <View style={styles.center}>
          <Text style={styles.Title}>Create your flashcard</Text>
          <Text>Find Out</Text>
        </View>
    
      </View>

      <Pressable style={styles.Card} onPress={Create_manual}>
          <Icon
            name='web-stories'
            type='material'
            size={100}
            color='black'
          />
          <Text style={styles.card_text}>Create</Text>
      </Pressable>

      <Pressable style={styles.Card} onPress={Create_AI}>
          <Icon
            // name='app-store' 
            name='smart-toy' 
            type='material'
            size={100}
            color='black'
          />
          <Text style={styles.card_text}>AI (beta)</Text>
      </Pressable>

    </View>
    )
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
        gap : 10
    },
    header : {
        display : 'flex' , 
        flexDirection : 'row' ,
        width : "100%",
        justifyContent : 'center',
    },  
    center : {
        display : 'flex' , 
        justifyContent : 'center' , 
        alignItems : 'center',
    },
    topleft : {
        alignItems : 'stretch',
    },
    Title : {
        fontSize : 35,
        fontWeight : 'bold' , 
        color : '#000000',
    },
    Card : {
        height : "40%" , 
        width : "60%" , 
        backgroundColor : "#EEBDFF" ,
        marginTop : 20,
        borderRadius : 20,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        justifyContent : 'center' , 
        alignItems : 'center',
        borderWidth : 2,
    },
    card_text : {
      fontSize : 25,

    }
  });

export default Adding_page;
