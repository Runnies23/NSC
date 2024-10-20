import React from 'react';
import { View, Text, ActivityIndicator , StyleSheet, Button ,TextInput , FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useEffect , useState } from 'react';
import { getFlashcardSet_offcial } from '../../api/api_flashcard_official';


export default function Singleplayer_select() {

    const navigation = useNavigation()

    const Goback = () => { 
        navigation.navigate('Flash_card_Home');
    };
    
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
      // Fetch existing flashcard sets on component mount
      fetchFlashcardSets();
    }, []);
  
    const fetchFlashcardSets = async () => {
      try {
        const sets = await getFlashcardSet_offcial();
        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    

  const Flashcardset_card = ({ item  }) => {
    //dynamic route 
    const flashcard_dynamic_route = () => { 
            navigation.navigate('Flashcard_Playing_signleplayer' , {item});
        };

    return ( 
      <View style={flashcard.Card}>
        <Pressable  onPress={flashcard_dynamic_route} style={flashcard.content}>
        
            <Text style={flashcard.Text}>{item.setName}</Text>
        
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
                    onPress={Goback}
                />
                </Pressable>
            </View>
            <View style={styles.header}>
               
                <View style={Title.display}>
                    <Text style={Title.header}>Flashcard</Text>
                    <Text style={Title.content}>Standard</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollview}>
            <View style={flashcard.display}>
             
                <FlatList
                    data={flashcardSets}
                    renderItem={Flashcardset_card}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContent}
                    numColumns={2}
                  />
                
            </View>
            </ScrollView>
        </View>
    );
}

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
        flexDirection : "row",
        height : "auto",
        width : "90%",
    },  
    scrollview : { 
      flex: 1,
      display : 'flex' , 
      width : "90%" , 
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
      
    }
  })


const Title = StyleSheet.create({
    display:{
        display : 'flex' ,
        width : '100%' ,
        justifyContent : "center" ,
        alignItems : "center" , 
    },
    header : { 
        fontSize : 40,
        fontWeight : "bold"
    },
    content : {
        fontSize : 25  ,
        color : "#7563AC",
        fontWeight : 'bold'
    }
})

const content = StyleSheet.create ({
    head : { 
        height : "5%" ,
        width : "90%",
        display : "flex" , 
        flexDirection : 'row' , 
        justifyContent : 'center', 
        alignItems : "center",
        gap : 15,
    },
    searchbar : { 
        width : '70%' ,
    }
})

const flashcard = StyleSheet.create({
    display : {
      marginTop : 20,
      width : "100%" ,
      flex: 1,
      display : "flex",
      flexDirection : "row",
      justifyContent : "center" ,
      alignItems  :"center",
    },
    Card : { 
      width : "50%" , 
      height : "auto",
      color : 'red',
      flexDirection : "row",
      justifyContent : 'center' , 
      alignItems : "center",
    },
    Text : {
      color : 'black',
      flexDirection : "row",
      fontSize : 20, 
      fontWeight : "bold" , 

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
      borderWidth : 2 , 
      borderColor : 'black',
    }
})

