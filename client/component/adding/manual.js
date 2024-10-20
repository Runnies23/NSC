import React from 'react';
import { View, Text , StyleSheet, Pressable, TextInput , ScrollView , Button} from 'react-native';
import { useState , useEffect } from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { addFlashcardSet_offcial , addFlashcard_offcial } from '../api/api_flashcard_official';
import { addFlashcardSet , addFlashcard } from '../api/api';
import { getUserId_Asyc } from '../api/getuserdata';
import { getUserdata } from '../api/api_user';


const Adding_manual = ({route , navigation }) => {

  

  const { flashcards: initialFlashcards = [] } = route.params || {};
  const { userId } = getUserId_Asyc ();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await getUserdata(userId);
          setData(response.username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  
  
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSetId, setSelectedSetId] = useState(null);

  const [setName, setSetName] = useState('');
  // const [flashcards, setFlashcards] = useState([{ question: '', answer: '' }]);
  const [flashcards, setFlashcards] = useState(initialFlashcards.length > 0 ? initialFlashcards : [{ question: '', answer: '' }]);

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { question: '', answer: '' }]);
  };

  const handleSubmit = async () => {
    try {

      if (!setName.trim()) {
        console.log('Please enter the name.');
        return; // Exit function early if setName is empty
    }

      // Create the new flashcard set
      const newSet = await addFlashcardSet(setName,data);
      setFlashcardSets([...flashcardSets, newSet]);


      
      // Add each flashcard to the set
      const addedFlashcards = [];
      for (const flashcard of flashcards) {

        if (!flashcard.question.trim() || !flashcard.answer.trim()) {
        console.log('Please enter All question , answer');
        return; // Exit function early if setName is empty
        }
        const newFlashcard = await addFlashcard(newSet._id, flashcard.question, flashcard.answer);
        addedFlashcards.push(newFlashcard);
      }
      setFlashcards([]);

      // Optionally set the selected set ID or perform any other actions
      setSelectedSetId(newSet._id);

      setSetName('');
      setFlashcards([{ question: '', answer: '' }]);
      
      // Navigate to the Flash_card_Home screen
      navigation.navigate('Flash_card_Home');
      
    } catch (error) {
      console.error('Error adding flashcards:', error);
    }
  };

  const Camera = (index, type) => {
    navigation.navigate('Camera_OCR', { flashcardIndex: index, type });
  };

  // const Camera = () => {
  //   navigation.navigate('Camera_OCR'); 
  // };

  const Go_back_adding = () => {
    navigation.navigate('Adding_Home');
  }; 

  
  return (
    <View style={styles.container}>
      <View style={arrowback.display}> 
        <Pressable style={arrowback.arrowback}>
            <Icon
            name="arrow-back"
            type="material"
            color="#000"
            size={30}
            onPress={Go_back_adding}
          />
        </Pressable>
        <Pressable style={arrowback.setting}>
            <Icon
            name="check"
            type="material-community"
            color="#000"
            size={30}
            onPress={handleSubmit}
          />
        </Pressable>
      </View>

      <View style={styles.widthfull}>
        <TextInput
          style={styles.input_title}
          value={setName}
          onChangeText={setSetName}
          placeholder="Set Name"
        />
      </View>


      <ScrollView style={styles.scrollview}>
      {flashcards.map((card, index) => (
        <View key={index} style={styles.flashcard}>
          <View style={styles.section_input}>
            <TextInput
              style={styles.input}
              value={card.question}
              onChangeText={(text) => {
                const updatedFlashcards = [...flashcards];
                updatedFlashcards[index].question = text;
                setFlashcards(updatedFlashcards);
              }}
              placeholder="Question"
            />
            <TextInput
              style={styles.input}
              value={card.answer}
              onChangeText={(text) => {
                const updatedFlashcards = [...flashcards];
                updatedFlashcards[index].answer = text;
                setFlashcards(updatedFlashcards);
              }}
              placeholder="Answer"
            />
          </View>
          <View style={styles.camera}> 
            <Pressable onPress={Camera}>
            <Icon
                style={styles.icon}
                name="camera"
                type="font-awesome"
                size={30}
                color="#55699B"
            />
            </Pressable>
        </View>
        </View>
      ))}
      </ScrollView>
      <View style={styles.bottomRightButton}>
        <Icon
            name="add"
            type="material"
            color="white"
            size={30}
            onPress={handleAddFlashcard}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor : "#FBF3FF",
    width : "100%",
    height : "100%",
    paddingTop : 80, 
    display : 'flex',
    flexDirection : 'column',
    gap : 10 
  },
  section_input: { 
    width : "80%",
    justifyContent : 'center' , 
    alignItems : 'center',
    gap : 20
  },
  input_title :{
    borderBlockStartColor : 'black',
    borderColor: '#7563AC',
    borderBottomWidth: 1,
    color : 'black',
    paddingLeft : 10,
    width : "70%",
    fontSize :  30, 
    fontWeight : "bold",
    marginBottom : 20
  },
  camera :{
    width : "20%",
    justifyContent : 'flex-end',
    alignItems : 'center',
  } , 
  icon : { 
    paddingVertical : 20,
  },
  input: {
    width : "80%",
    height: 40,
    borderColor: '#7563AC',
    borderBottomWidth: 1,
    color : 'black',
    paddingLeft : 10,
  },
  flashcard: {
    width : "85%" , 
    height : 160, 
    backgroundColor : '#FFFFFF' , 
    borderRadius : 10  ,
    display : 'flex' , 
    flexDirection : 'row',
    marginBottom : 20,
    borderWidth : 2 , 

  },
  scrollview : { 
    flex: 1,
    display : 'flex' , 
    width : "100%" , 
    paddingLeft : "10%",
    gap : 20, 
  },
  widthfull:  {
    width : '80%',
  },
  scroll_01 : {
    backgroundColor : "blue" ,
    width : "80%" 
  },
  bottomRightButton : {
    position: 'absolute',
    bottom: 25,
    right: 25, // Adjust this value for desired right margin
    backgroundColor: '#7563AC', // Example background color
    width: 70,
    height: 70,
    borderRadius: 35, // To make it round
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const styles_save = StyleSheet.create({ 
      Screen:{
        backgroundColor : "#DED6FF",
        width : "100% ",
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
    Title : {
        fontSize : 35,
        color : '#000000',
    },
    scrollView : {
      flex: 1,
      display : 'flex' , 
      width : "100%" , 
      paddingLeft : "10%",
      gap : 20,
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

export default Adding_manual;
