import React from 'react';
import { View, Text , StyleSheet , Dimensions , FlatList , Animated, Pressable , ActivityIndicator  } from 'react-native';
import { useEffect , useState , useRef } from 'react';
import { getFlashcardSet } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const Popular_card = () => {

  const navigation = useNavigation()

  const [flashcardSets, setFlashcardSets] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true); //============================

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
      }finally {
        setLoading(false); //============================
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

    const renderItem = ({ item , index }) => {
      const to_flashcard = () => { 
        navigation.navigate('Custom_Playing' , {item});
      };

      return (
      <Pressable onPress={to_flashcard}>
        <View style={styles.renderItem}>
          <View style={styles.topLeft}>
            <Text style={styles.font}>{index+1}</Text>
          </View>
          <Text style={styles.font}>{item.setName}</Text>
        </View>
      </Pressable>
      )
      
    };

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F43AA" />
        </View>
      );
    }
  
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
      backgroundColor: '#EEBDFF',
      borderRadius: 10,
      height: "100%",
      width: Dimensions.get('window').width * 0.5,
      // padding: 50,
      marginLeft: 15,
      marginRight: 5,
      // justifyContent: 'center',
      alignItems: 'center',
      borderBlockColor : 'black',
      borderWidth : 2,
    },
    font: {
      fontSize: 30,
      fontWeight : 'bold'
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
    topLeft : { 
      paddingHorizontal : 20,
      paddingVertical : 10 , 
      width : "100%",
      marginBottom : 5 , 
    }
  });

export default Popular_card;
