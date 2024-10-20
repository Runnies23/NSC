import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Pressable } from 'react-native';
import { getFlashcards_offcial } from '../../api/api_flashcard_official';
import { updatePlayedCount_Flashcards_offcial } from '../../api/api_flashcard_official';
// import { Accelerometer } from 'expo-sensors';

const Playing_MultiplayerFlashcardGame = ({ navigation , route }) => {
    const { item } = route.params;
    const [Flashcard_id, setFlashcard_id] = useState(item._id);
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [gameOver, setGameOver] = useState(false);

    const pan = useRef(new Animated.ValueXY()).current;

    const [showAnswer, setShowAnswer] = useState(false);

    const Goback = () => { 
        navigation.navigate('Flashcard_multiplayer_select');
    };

    const handleToggle = () => {
        setShowAnswer(!showAnswer);
      };


    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const data = await getFlashcards_offcial(Flashcard_id);
            setFlashcards(data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy < -50) {
                handleResponse('dontKnow');
            } else if (gestureState.dy > 50) {
                handleResponse('know');
            }
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        },
    });

    const handleResponse = (response) => {
        if (response === 'know') {
            setScores(prevScores => ({
                ...prevScores,
                [currentPlayer]: prevScores[currentPlayer] + 1
            }));
        }
        nextCard();
    };

    const nextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        } else {
            setGameOver(true);
        }
    };

    if (flashcards.length === 0) {
        return <Text>Loading...</Text>;
    }

    const update_Data = async () => {
        try {
          await updatePlayedCount_Flashcards_offcial(Flashcard_id); // Assuming Flashcard_id is available here
        } catch (error) {
          console.error('Error updating Played count:', error);
        }
      };


    if (gameOver) {

        update_Data();

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Game Over!</Text>
                <Text style={styles.text}>Player 1 score: {scores.player1}</Text>
                <Text style={styles.text}>Player 2 score: {scores.player2}</Text>
                <Text style={styles.text}>
                    Winner: {scores.player1 > scores.player2 ? 'Player 1' : scores.player1 < scores.player2 ? 'Player 2' : 'Tie'}
                </Text>
                <Pressable onPress={Goback}><Text>Go Back</Text></Pressable>
            </View>
        );
    }

    const currentCard = flashcards[currentCardIndex];

    return (
        <Animated.View 
            style={[styles.container, { transform: [{ translateY: pan.y }] }]}
            {...panResponder.panHandlers}
        >
            <Pressable  onPress={handleToggle} style={styles.center}>
            <Text style={styles.text}>Current Player: {currentPlayer === 'player1' ? 'Player 1' : 'Player 2'}</Text>
            <Text style={styles.text}>{showAnswer ? currentCard.answer : currentCard.question}</Text>
            <Text style={styles.instruction}>Swipe up for "Don't Know"</Text>
            <Text style={styles.instruction}>Swipe down for "Know"</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width : '100%' , 
        height : '100%'
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    instruction: {
        fontSize: 14,
        color: 'gray',
        marginTop: 10,
    },
    center: { 
        justifyContent : "center" , 
        alignItems : "center",
        width : '100%' , 
        height : '100%'
    }
});

export default Playing_MultiplayerFlashcardGame