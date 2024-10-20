import React from 'react';
import { View, Text , StyleSheet, Pressable , FlatList , ActivityIndicator , TouchableOpacity } from 'react-native';
import { getQuiz } from '../api/api_quiz';
import { useState , useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { updatePlayedCount_Quiz } from '../api/api_quiz';
import { updateExperience } from '../api/gainexp';
import { getUserId_Asyc } from '../api/getuserdata';

const Quiz_playing = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();

    
  const Go_back = () => {
    navigation.navigate('Quiz_home');
    }; 



    const [quizData, setQuizData] = useState([]);
    const [randomizedQuizData, setRandomizedQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const { userId } = getUserId_Asyc ();

    useEffect(() => {
        fetchQuizset();
    }, []);

    useEffect(() => {
        if (quizData.length > 0) {
            randomizeChoices();
        }
    }, [quizData]);

    const fetchQuizset = async () => {
        try {
            const quiz = await getQuiz(item.classId, item._id);
            setQuizData(quiz);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quiz sets:', error);
            setLoading(false);
        }
    };

    const randomizeChoices = () => {
        const randomized = quizData.map(question => {
            const shuffledChoices = [...question.choices].sort(() => Math.random() - 0.5);
            return { ...question, choices: shuffledChoices };
        });
        setRandomizedQuizData(randomized);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        
        if (currentQuestionIndex < randomizedQuizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            endGame();
        }
    };

    const endGame = () => {
        setGameOver(true);
    };

    if (loading) {
        return (
            <View style={styles.Screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (gameOver) {
        

        updatePlayedCount_Quiz(item.classId , item._id)
        updateExperience(userId,50)

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
                <Text style={styles.text}>Game Over!</Text>
                <Text style={styles.text}>Your score: {score} out of {randomizedQuizData.length}</Text>
            </View>
        );
    }

    if (randomizedQuizData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No questions available.</Text>
            </View>
        );
    }

    const currentQuestion = randomizedQuizData[currentQuestionIndex];

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

            <View  style={styles.container}>
            <Text style={styles.timer}>{currentQuestionIndex+1}/{randomizedQuizData.length}</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            {currentQuestion.choices.map((choice, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.choiceButton}
                    onPress={() => handleAnswer(choice.isCorrect)}
                >
                    <Text style={styles.choiceText}>{choice.text}</Text>
                </TouchableOpacity>
            ))}
            </View>
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      width : '70%'
    },
    timer: {
      fontSize: 18,
      marginBottom: 20,
    },
    question: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    choiceButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      margin: 5,
      borderRadius: 5,
      width: '100%',
    },
    choiceText: {
      color: 'white',
      textAlign: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
    },
  });
  
const styles_02 = StyleSheet.create({ 
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


export default Quiz_playing;
