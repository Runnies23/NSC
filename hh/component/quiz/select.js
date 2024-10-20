import React from 'react';
import { View, Text , StyleSheet, Pressable , FlatList, ScrollView} from 'react-native';
import { getQuiz , getQuizSet  } from '../api/api_quiz';
import { useState , useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Quiz_stage = ({ route }) => {
  const { item } = route.params;
  
  const navigation = useNavigation()

  const Go_back = () => {
    navigation.navigate('Quiz_home');
    }; 


  const [Quiz_Class_id, setQuiz_Class_id] = useState(item._id);
  const [Quiz_Class_Name, setQuiz_Class_Name] = useState(item._id);
  const [Quiz_Stage, setQuiz_Stage] = useState([]);

    const handlePress = () => {
        navigation.navigate('Flashcard_singleplayer_select');
        // Add your desired functionality here
      };


    useEffect(() => {
      fetchQuizset();
    }, []);
  
    const fetchQuizset = async () => {
      try {
        const Stage = await getQuizSet(Quiz_Class_id);
        setQuiz_Stage(Stage);
      } catch (error) {
        console.error('Error fetching quiz sets:', error);
      }
    };
  
    const QuizStage_card = ({ item, index }) => {
      const flashcard_dynamic_route = () => { 
        navigation.navigate('Quiz_playing', { item });
      };
  
      const isLeft = index % 2 === 0;
  
      return (
        <View style={[flashcard.Card, isLeft ? flashcard.leftCard : flashcard.rightCard]}>
          <Pressable onPress={flashcard_dynamic_route} style={flashcard.content}>
            <Text style={flashcard.Text}>บทที่ {item.stageName}</Text>
          </Pressable>
        </View>
      );
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

      <View style={styles.header}> 
   
        <View style={styles.center}>
          <Text style={styles.Title}>Quiz</Text>
          <Text style={styles.subtitle}>{item.ClassName}</Text>
        </View>

      </View>

      <ScrollView style={styles.fullwidth}>
        <FlatList
          data={Quiz_Stage}
          renderItem={({ item, index }) => <QuizStage_card item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>

    </View>
  );
};
const styles = StyleSheet.create({ 
      flatListContent: {
        width: '100%',
        paddingHorizontal: 20,
      },
      fullwidth : {
         width : "100%" ,
         marginTop : 30
      },  
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
        backgroundColor : 'red'
    },
    Gobackbutton : {
        width : 20,
        height : 20,
        backgroundColor : 'black'
    },
    Title : {
        fontSize : 35,
        fontWeight : 'bold' , 
        color : '#000000',
    },
    subtitle : {
      fontWeight : 'bold' , 
      fontSize : 15,
    }
  });

  const flashcard = StyleSheet.create({
    Card: { 
      width: '100%',
      height: 'auto',
      marginBottom: 20,
    },
    leftCard: {
      alignItems: 'flex-start',
    },
    rightCard: {
      alignItems: 'flex-end',
    },
    content: {
      backgroundColor: "#979EF9",
      width: '40%',
      justifyContent: 'center', 
      alignItems: "center",
      paddingVertical: 30,
      borderRadius: 100,
      height: 150,
      borderWidth : 2,
      borderColor : 'white'
    },
    Text: {
      fontSize: 30, 
      fontWeight : 'bold',
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
      
    },
    setting : {
      width : "50%",
      alignItems : 'flex-end' ,
      paddingHorizontal : 20,
      paddingVertical : 10,
    }
  })

export default Quiz_stage;
