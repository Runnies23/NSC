import React from 'react';
import { View, Text , StyleSheet, Pressable, TextInput , FlatList } from 'react-native';
import { getQuizClass } from '../../component/api/api_quiz';
import { useState , useEffect } from 'react';

const Quiz = ({navigation}) => {

  const handlePress = () => {
    navigation.navigate('Flashcard_singleplayer_select');
    // Add your desired functionality here
  };

  const [Quiz_Class, setQuiz_Class] = useState([]);

  useEffect(() => {
    fetchQuizset();
  }, []);

  const fetchQuizset = async () => {
    try {
      const Class = await getQuizClass();
      setQuiz_Class(Class);
    } catch (error) {
      console.error('Error fetching quiz sets:', error);
    }
  };

  const QuizClass_card = ({ item  }) => {
    const flashcard_dynamic_route = () => { 
            navigation.navigate('Quiz_stage' , {item});
        };

    return ( 
      <View style={flashcard.Card}>
        <Pressable  onPress={flashcard_dynamic_route} style={flashcard.content}>
            <Text style={flashcard.Text}>{item.ClassName}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.Screen}>
      <View style={styles.header}> 

        <View style={styles.center}>
          <Text style={styles.Title}>Quiz</Text>
          <Text style={styles.text}>single</Text>
        </View>
         
      </View>

      <FlatList
            data={Quiz_Class}
            renderItem={QuizClass_card}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
            numColumns={2}
          />

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
        marginBottom : 20,
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
        fontWeight : 'bold'
    },
    textinput : {
        width : "60%"
    },
    text : {
      fontSize : 20,
    }
  });

  
  const flashcard = StyleSheet.create({
    display : {
      marginTop : 20,
      width : "80%" ,
      flex: 1,
      display : "flex",
      flexDirection : "row",
      justifyContent : "center" , 
      gap : 20 
    },
    Card : { 
      width : "50%" , 
      height : "auto",
      color : 'red',
      flexDirection : "row",
      justifyContent : 'center' , 
      alignItems : "center"
    },
    Text : {
      color : 'black',
      flexDirection : "row",
      fontWeight : 'bold',
      fontSize : 20, 
    },
    content : {
      backgroundColor : "#E9BDFF" , 
      width : '90%',
      justifyContent : 'center', 
      alignItems : "center",
      paddingVertical : 30,
      borderRadius : 15,
      height : 220,
      marginBottom : 20,
      borderWidth : 2, 
      padding : 20 ,
    }
    
})


export default Quiz;
