import React from 'react';
import { View, Text , StyleSheet , FlatList , TextInput , TouchableOpacity , PanResponder , Dimensions , Animated , Image } from 'react-native';
import { Pressable } from 'react-native';
import { useEffect , useState , useRef , useCallback} from 'react';
import { getFlashcards } from '../../api/api';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { updatePlayedCount_Flashcards } from '../../api/api';
import { Alert } from 'react-native';
import { getUserId_Asyc } from '../../api/getuserdata';
import { updateExperience , update_victory } from '../../api/gainexp';

const CustomInteractiveCard = ({ onLeftInteract, onRightInteract, onNormalClick, children }) => {
  const [pan] = useState(new Animated.ValueXY());
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const verticalLimit = screenHeight * 0.1; // 1% of screen height as vertical limit

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(Math.min(gestureState.dy, verticalLimit), -verticalLimit);
        pan.setValue({ x: gestureState.dx, y: newY });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          onNormalClick();
        } else if (gestureState.dx < -screenWidth * 0.3) {
          onLeftInteract();
        } else if (gestureState.dx > screenWidth * 0.3) {
          onRightInteract();
        }
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [children]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

const Flashcard_custom_Playing = ({ route, navigation }) => {
    const { item } = route.params;

    const Go_back = () => {
      navigation.navigate('Custom_flashcard_select');
    };
    const Go_back_home  = () => {
      navigation.navigate('Flash_card_Home');
    };
    
    const [Flashcard_id, setFlashcard_id] = useState(item._id);
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const { userId } = getUserId_Asyc ();

    useEffect(() => {
        fetchFlashcardSets();
    }, []);

    useEffect(() => {
       
    }, [flashcards]);

    const fetchFlashcardSets = async () => {
        try {
            const data = await getFlashcards(Flashcard_id);
            setFlashcards(data);
        } catch (error) {
            console.error('Error fetching flashcard sets:', error);
        }
    };

    const nextCard = useCallback(() => {
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(prevIndex => prevIndex + 1);
        setShowAnswer(false);
      } else {
        setGameOver(true);
      }
    }, [currentCardIndex, flashcards.length]);

    const previousCard = useCallback(() => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(prevIndex => prevIndex - 1);
        setShowAnswer(false);
      }
      // Optionally handle case when at the first card (currentCardIndex === 0)
    }, [currentCardIndex]);

  
    const resetGame = () => {
      setCurrentCardIndex(0);
      setScore(0);
      setShowAnswer(false);
      setGameOver(false);
    };
  
    const handleResponse = useCallback((knows) => {
      setScore(prevScore => knows ? prevScore + 1 : prevScore);
      nextCard();
    }, [nextCard]);
  
    const handleLeftInteract = useCallback(() => {
      handleResponse(false);
    }, [handleResponse]);
  
    const handleRightInteract = useCallback(() => {
      handleResponse(true);
    }, [handleResponse]);
  
    const ShowAnswer_button = useCallback(() => {
      setShowAnswer(prev => !prev);
    }, []);
  
    if (flashcards.length === 0) {
      return <Text>Loading...</Text>;
    }
  
    const update_Data = async () => {
      try {
        await updatePlayedCount_Flashcards(Flashcard_id); // Assuming Flashcard_id is available here
      } catch (error) {
        console.error('Error updating Played count:', error);
      }
    };


    //======================================================================== gain exp and coin 
    const Gain_coin_exp = async () => {
      try {
        await updateExperience(userId,10,10); // change gain exp here 
      } catch (error) {
        console.error('Error updating Played count:', error);
      }
    };
    //========================================================================
    //======================================================================== gain victory 

    const Gain_victory = async () => {
      try {
        await update_victory(userId); // change gain exp here 
      } catch (error) {
        console.error('Error updating Played count:', error);
      }
    };
    
    //========================================================================
    
  
    if (gameOver) {
      const scorePercentage = (score / flashcards.length) * 100;
      let message = '';
  
      if (scorePercentage === 100) {
        message = 'Perfect!';
      } else if (scorePercentage >= 70) {
        message = 'Keep going!';
      } else if (scorePercentage >= 30) {
        message = "Don't give up!";
      } else {
        message = 'Try again';
      }

      update_Data();
      Gain_coin_exp();
      Gain_victory();
  
      return (
        <View style={GameOver.Screen}>
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
  
          <View style={GameOver.center}>
  
            <Text style={GameOver.Text}>Great Job!!!</Text>
            <Text style={GameOver.subtext}>{message}</Text>
            <Text>เก่งมากงับ </Text>
            <Text>คราวหน้าต้องเต็มแล้ว</Text>
  
            <View style={GameOver.score}>
  
              <Text style={GameOver.result}>Result</Text>
              <View style={GameOver.correct}>
                <Text style={GameOver.score_text}>{score}</Text>
              </View>
              <View style={GameOver.incorrect}>
                <Text style={GameOver.score_text}>{flashcards.length - score}</Text>
              </View>
              
            </View>
  
            <Image
                source={require('../../../assets/Shinobu_score.png')}
                // style={style.Shinobu_background}
              />
      

            <View style={GameOver.button}>
              <Pressable style={GameOver.Icon} onPress={Go_back_home}>
                <Icon
                  name="play-circle-filled"
                  type="material"
                  color="#000"
                  size={40}
                />
                <Text style={styles.Icon_text}>Menu</Text>
              </Pressable>
  
              <Pressable style={GameOver.Icon} onPress={resetGame}>
                <Icon
                    name="refresh"
                    type="material"
                    color="#000"
                    size={40}
                  />
                <Text style={GameOver.Icon_text}>Retry</Text>
              </Pressable>
            </View>
  
          </View>
  
        </View>
      );
    }
  
    const currentCard = flashcards[currentCardIndex];  
        
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

      <Text style={Flashcard.Index}>{currentCardIndex+1} / {flashcards.length}</Text>

      <View style={Flashcard.score_container}>
        <View style={Flashcard.incorrect}><Text style={Flashcard.Text}>{flashcards.length - score}</Text></View>
        <View style={Flashcard.correct}><Text style={Flashcard.Text}>{score}</Text></View>
      </View>

      <CustomInteractiveCard
        key={currentCardIndex}
        onLeftInteract={handleLeftInteract}
        onRightInteract={handleRightInteract}
        onNormalClick={ShowAnswer_button}
      >
        <Text style={styles.text}>{showAnswer ? currentCard.answer : currentCard.question}</Text>
      </CustomInteractiveCard>

      <Pressable style={Button.Left} onPress={previousCard}>
        <Icon
          name="arrow-back"
          type="material"
          color="#000"
          size={40}
          onPress={Go_back}
        />
        <Text>Before</Text>
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
    Title : {
        fontSize : 40,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor : '#F1EEFF',
        height : "58%",
        marginTop : 20, 
        width : "70%",
        borderRadius : 20,
        borderWidth : 2, 
      },
      text: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },
      button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      leftButton: {
        backgroundColor: '#FF3B30',
      },
      rightButton: {
        backgroundColor: '#4CD964',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
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

const Flashcard = StyleSheet.create ({
  Index : {
      fontSize : 25,
      fontWeight : 'bold',
      textDecorationStyle: 'solid', // Underline style ('solid', 'double', 'dotted', 'dashed')
      borderBottomWidth: 10, // Underline width
      borderBottomColor: '#DC98FF', // Underline color
      // borderBottomEndRadius : 10,
      borderRadius : 5,
  },
  score_container:{
      width : "100%" , 
      height : "7%",
      flexDirection : "row" , 
      justifyContent : 'space-between'
  },
  correct : {
      backgroundColor  : "#75D873" , 
      width : '25%',
      height : "100%",
      justifyContent : 'center' , 
      alignItems : "center",
      borderTopLeftRadius : 10,
      borderBottomLeftRadius : 10,
      paddingRight : 20,
  },
  incorrect : {
      backgroundColor  : "#F65D5D" , 
      width : '25%',
      height : "100%",
      justifyContent : 'center' , 
      alignItems : "center",
      borderTopRightRadius : 10,
      borderBottomRightRadius : 10,
      paddingLeft : 20,
  },
  Text : { 
      color: 'white' , 
      fontSize : 30 , 
      fontWeight : 'bold'
  }
  })
  
  
  const Button = StyleSheet.create ({
    Left : {
      fontSize : 25,
      fontWeight : 'bold',
      position : 'absolute',
      backgroundColor : "#FFF19A",
      height : 130,
      width : 130,
      bottom : -10,
      left : -10,
      borderTopRightRadius : 100,
      borderBottomRightRadius : 30,
      borderTopLeftRadius : 30,
      justifyContent : 'center',
      alignItems : 'center',
      borderWidth : 2,
  },
    Right:{
      position : 'absolute',
      backgroundColor : "#B5ACDA",
      height : 130,
      width : 130,
      bottom : -10,
      right : -10,
      borderTopRightRadius : 30,
      borderBottomLeftRadius : 30,
      borderTopLeftRadius : 100,
      justifyContent : 'center',
      alignItems : 'center'
  },
    content : {
  
  }
  })
  
  const GameOver = StyleSheet.create ({
    Screen:{
      backgroundColor : "# ",
      width : "100%",
      height : "100%",
      paddingTop : 80,
      alignItems : 'center', 
      display : 'flex',
      flexDirection : 'column',
      gap : 10
    },
    Text : {
      fontSize : 35,
      fontWeight : 'bold' , 
    },
    subtext:{
      fontSize : 20,
      fontWeight : 'bold' , 
    },
    score : { 
      width : '80%',
      height : '30%',
      marginTop : 20,
      backgroundColor : "white",
      justifyContent : 'center' , 
      alignItems : 'center',
      borderRadius : 15,
      gap : 10,
      borderWidth : 2, 
    },
    center : {
      justifyContent : 'center' , 
      alignItems : 'center' , 
      height : '80%',
      width : "80%",
      // gap : 20 
    },
    button : { 
      flexDirection : 'row' , 
      justifyContent : 'center' , 
      alignItems : 'center' , 
      gap : 40,
      paddingTop : 10,
    },
    Icon : {
      justifyContent : 'center' , 
      alignItems : 'center' , 
    },
    Icon_text : {
      color:"black"
    },
    result : {
      fontSize : 20,
    },
    correct : {
      width : '50%' , 
      height : "25%" , 
      backgroundColor : '#75D873',
      borderRadius : 10,
      justifyContent : 'center' , 
      alignItems : 'center'
    },
    incorrect : {
      width : '50%' , 
      height : "25%" , 
      backgroundColor : '#F65D5D',
      borderRadius : 10,
      justifyContent : 'center' , 
      alignItems : 'center'
    },
    score_text : { 
      fontSize : 20,
      fontWeight : 'bold'
    }
  
  })
  


export default Flashcard_custom_Playing;
