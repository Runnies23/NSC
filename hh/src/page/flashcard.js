import React from 'react';
import { View, Text, ActivityIndicator , StyleSheet, Button , Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Touchable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import Flashcard_popular_card from '../../component/flashcard/Flashcard_popular_card';


const Flashcard = ({ navigation }) => {

    const Stander_learning = () => {
        navigation.navigate('Flashcard_singleplayer_select');
      };

    const Group_learning = () => {
        navigation.navigate('Flashcard_multiplayer_select');
    };

    const Custom_flashcard = () => {
        navigation.navigate('Custom_flashcard_select');
    };


    return (
    <View style={styles.Screen}>
        <Text style={styles.Title}>Flashcard</Text>

        <View style={Chapter.display}>
            <View style={Chapter.left_size}>
                <Text style={Chapter.title}>Chapter</Text>
            </View>
            
            <View style={Chapter.content}>
                <Pressable style={customFlashcardplay.main} onPress={Custom_flashcard}>
                    <Icon
                        name='library-add'
                        type='material'
                        size={100}
                        color='black'
                        style={styles.outline}
                    />
                    <Text style={customFlashcardplay.Text}>Custom</Text>
                </Pressable>

                <Pressable style={customFlashcardplay.main} onPress={Stander_learning}>
                        <Icon
                            name='person'
                            type='material'
                            size={100}
                            color='black'
                        />
                        <Text style={customFlashcardplay.Text}>Standard learning</Text>
                    </Pressable>

                <Pressable style={customFlashcardplay.main} onPress={Group_learning}>
                        <Icon
                            name='group'
                            type='material'
                            size={100}
                            color='black'
                        />
                    <Text style={customFlashcardplay.Text}>Group learning</Text>
                </Pressable>
            </View>
            
        </View>

    </View>
  );
};
const styles = StyleSheet.create({ 
    outline : { 
    },
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
    Title : {
        fontSize : 40,
        fontWeight: 'bold',
    },
    Most_popular_box: {
        width : "95%",
        height : "25%",
        marginVertical : 20,
        marginBottom : 20,
    }
  });

const popular_card  = StyleSheet.create({ 
    main : {
        width : "100%",
        height : "100%",
        marginBottom : 20,
    }
})

const customFlashcardplay = StyleSheet.create({
    main : {
        width : "100%",
        height : '28%',
        backgroundColor : '#EEBDFF' , 
        borderColor : 'black' , 
        borderRadius : 20,
        borderWidth: 2,
        marginTop : 10,
        justifyContent : 'center' , 
        alignItems : 'center',
        display : 'flex' , 
        flexDirection : 'row' , 


    }   ,
    Text : {
        fontSize : 25,
        fontWeight : 'bold'
    }
})

const Chapter = StyleSheet.create({
    display : {
        marginTop : 50,
        width : "90%",
        height : '75%',
        display : "flex " , 
        padding : 20,
        flexDirection : 'col',
        // justifyContent : 'center',
        alignItems : "center" , 
        gap : 15,
        backgroundColor : "#FFFFFF",
        borderRadius : 20,
        borderColor : 'black' , 
        borderWidth : 2 , 
    },
    title : { 
        fontSize : 25,
        fontWeight : 'bold'
    },
    left_size : {
        width : "100%" , 

    },
    content : { 
        width : "100%",
        gap : 15,
    },

})

export default Flashcard;
