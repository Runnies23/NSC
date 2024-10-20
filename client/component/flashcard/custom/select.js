import React from 'react';
import { View, Text, ActivityIndicator , StyleSheet, Button ,TextInput , FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { getFlashcardSet } from '../../api/api';
import { useEffect , useState } from 'react';


export default function Custom_flashcard() {

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
        const sets = await getFlashcardSet();
        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    

  const Flashcardset_card = ({ item  }) => {
    //dynamic route 
    const flashcard_dynamic_route = () => { 
            navigation.navigate('Custom_Playing' , {item});
        };

    return ( 
      <View style={flashcard.Card}>
        <Pressable  onPress={flashcard_dynamic_route} style={flashcard.content}>
        
            <Text style={flashcard.Text}>{item.setName}</Text>
            {item.Create_Author ? (
        <Text>Create by {item.Create_Author}</Text>
      ) : null}
      {/* <Text style={flashcard.Text_author}>create by Author</Text> */}
        
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
        width : "70%",
        display : "flex" , 
        flexDirection : 'row' , 
        justifyContent : 'flex-start', 
        alignItems : "center",
        gap : 15,
    },
    searchbar : { 
        width : '70%' ,
        backgroundColor  : "green"
    }
})

const flashcard = StyleSheet.create({
    display : {
      marginTop : 20,
      width : "90%" ,
      flex: 1,
      display : "flex",
      flexDirection : "row",
      justifyContent : "center" , 
      gap : 20 ,
    },
    Card : { 
      width : "100%" , 
      height : "auto",
      color : 'red',
      flexDirection : "row",justifyContent : 'center' , 
      alignItems : "center",
    },
    Text : {
      color : 'black',
      flexDirection : "row",
      fontSize : 20, 
      fontWeight : 'bold',
        textDecorationColor: 'black',
        textDecorationStyle: 'solid', 
        borderBottomWidth: 2,
        borderBottomColor: 'black' 
    },
    Text_author : {
      color : 'black',
      flexDirection : "row",
      fontSize : 12, 
      fontWeight : 'bold',
    },
    content : {
      backgroundColor : "white" , 
      width : '90%',
      padding : 15,
      borderRadius : 15,
      height : 120,
      marginBottom : 20,
      borderWidth : 2, 

    }
    
})

