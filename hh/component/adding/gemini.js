import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Adding_AI = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [amount, setAmount] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handlePress = () => {
    // Your handlePress function implementation
  };

  const sendDataToPython = async () => {
    if (prompt.trim() !== '' && amount.trim() !== '') {
      setIsLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.post('https://1a3c-2001-fb1-18-bbe5-b581-9d64-9489-b7ec.ngrok-free.app/generate-flashcards', {
          prompt,
          amount: parseInt(amount),
        });
        const generatedFlashcards = response.data;
        const formattedFlashcards = generatedFlashcards.map(card => ({
          question: card.question,
          answer: card.answer
        }));
        navigation.navigate('Adding_manual', { flashcards: formattedFlashcards });
      } catch (error) {
        console.error('Error generating flashcards:', error);
        Alert.alert('Error', 'Failed to generate flashcards. Please try again.');
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    } else {
      Alert.alert('Input Error', 'Please enter both prompt and amount.');
    }
  };

  return (
    <View style={styles.Screen}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Generating flashcards...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.Title}>Generate With AI</Text>
            <View style={styles.beta_2}>
              <Text style={styles.beta}>Beta</Text>
            </View>
          </View>

          <View style={styles.prompt_input}>
            <TextInput
              style={styles.Text_input}
              placeholder="Text your content here..."
              placeholderTextColor="#868686"
              value={prompt}
              onChangeText={setPrompt}
            />
          </View>

          <View style={styles.Amount_input}>
            <TextInput
              style={styles.Text_input}
              placeholder="How many flashcards do you want?"
              placeholderTextColor="#868686"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.submitbutton_view}>
            <Pressable style={styles.submitbutton} onPress={sendDataToPython}>
              <Text style={styles.submitbutton_text}>Submit</Text>
            </Pressable>
          </View>

          {flashcards.map((card, index) => (
            <View key={index}>
              <Text>{card.question}</Text>
              <Text>Answer: {card.answer}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: "#DED6FF",
    width: "100%",
    height: "100%",
    paddingTop: 80,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: "80%",
    marginBottom: 20,
  },
  Title: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  beta_2: {
    width: "15%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  beta: {
    backgroundColor: "#4B94E2",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  prompt_input: {
    backgroundColor: "white",
    height: "40%",
    width: "80%",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  Amount_input: {
    backgroundColor: "white",
    height: "10%",
    width: "80%",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  submitbutton_view: {
    width: "80%",
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  submitbutton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "black",
    borderRadius: 18,
  },
  submitbutton_text: {
    color: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default Adding_AI;
