Flashcard_popular_card

import React from 'react';
import { View, Text , StyleSheet , Dimensions , FlatList , Animated, Pressable  } from 'react-native';
import { useEffect , useState , useRef } from 'react';
// import Carousel from 'reac t-native-snap-carousel';
import { getFlashcardSet } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const Flashcard_popular_card = () => {

  const navigation = useNavigation()

  

  const [flashcardSets, setFlashcardSets] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Fetch existing flashcard sets on component mount
      fetchFlashcardSets();
    }, []);
  
    const fetchFlashcardSets = async () => {
      try {
        const sets = await getFlashcardSet();
        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };
  
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        setCurrentCardIndex(index);
        Animated.spring(animatedValue, {
          toValue: index,
          useNativeDriver: false,
        }).start();
      }
    }).current;

    const renderItem = ({ item }) => {
      const to_flashcard = () => { 
        navigation.navigate('Custom_Playing' , {item});
      };

      return (
      <Pressable onPress={to_flashcard}>
        <View style={styles.renderItem}>
          <Text style={styles.font}>{item.setName}</Text>
        </View>
      </Pressable>
      )
      
    };
  
    const renderDots = () => {
      return flashcardSets.map((_, index) => {
        const width = animatedValue.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [7, 20, 7],
          extrapolate: 'clamp',
        });
  
        const backgroundColor = animatedValue.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: ['#4F43AA', '#4F43AA', '#4F43AA'],
          extrapolate: 'clamp',
        });
  
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width,
                backgroundColor,
              },
            ]}
          />
        );
      });
    };
  


  return (
    <View style={styles.Screen}>
        <FlatList
        data={flashcardSets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>

  );
};

const styles = StyleSheet.create({ 
    Screen:{
        width : "100%",
        height : "100%",
        display : 'flex'
    },
    Title : {
        fontSize : 20,
        color : 'white',
    },
    renderItem: {
      backgroundColor: 'floralwhite',
      borderRadius: 10,
      height: "100%",
      width: Dimensions.get('window').width * 0.8,
      padding: 50,
      marginLeft: 25,
      marginRight: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    font: {
      fontSize: 30,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    dot: {
      height: 5,
      borderRadius: 5,
      marginHorizontal: 2,
      backgroundColor : "#4F43AA"
    },
  });

export default Flashcard_popular_card;
