import React from 'react';
import { View, Text, ActivityIndicator , StyleSheet, Button ,TextInput ,ScrollView , FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useEffect , useState } from 'react';
import { fetchTopVictory_Users } from '../api/api_user';

export default function LeaderBoard({ navigation }) {

    const [rank,SetRank] = useState('10')
    const [Top_10,SetTop] = useState('10')

    const Goback = () => { 
        navigation.navigate('Home');
    };

    useEffect(() => {
    
        fetchTopUsers();
      }, []);

    const fetchTopUsers = async () => {
    try {
        const data = await fetchTopVictory_Users();
        SetTop(data);
    } catch (error) {
        console.error('Error fetching flashcard sets:', error);
    }
    };

    const getStyleNumber = (index) => {
        switch(index) {
          case 0: return styles.itemNumber1;
          case 1: return styles.itemNumber2;
          case 2: return styles.itemNumber3;
          default: return styles.itemNumber4;
        }
      };

    const Icon_color = (index) => {
        switch(index) {
          case 0: return '#D0A859';  // Gold
          case 1: return '#B0B0B0';  // Silver (corrected from '#B0B0B')
          case 2: return '#D3785C';  // Bronze
          default: return '#517fa4'; // Default color
        }
      };
    
      const renderItem = ({ item, index }) => (
        <View style={[styles.item, getStyleNumber(index)]}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{index + 1}</Text>
            
          </View>
          <View style={styles.next}>
            <Text style={styles.username}>{item.username}</Text>
            {index < 3 && (
                <Icon
                    name='workspace-premium'
                    type='material'
                    size={40}
                    color={Icon_color(index)}
                />
                )}
            </View>
          <Text style={styles.victory}>Victories: {item.Victory}</Text>
          <Text style={styles.level}>Level: {item.level}</Text>
        </View>
      );
    
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
                    <Text style={Title.header}>Leaderboard</Text>
                    {/* <Text style={Title.content}>Your Rank : {rank}</Text> */}
                </View>

            </View>

            <ScrollView style={styles.scrollview}>
                <View style={styles.display}>
                
                    <FlatList
                        data={Top_10}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
                </View>
            </ScrollView>
            

        </View>
    );
}

const styles = StyleSheet.create({ 
    Screen:{
        backgroundColor : "#DED6FF",
        width : "100%",
        height : "100%",
        paddingTop : 80,
        alignItems : 'center', 
        display : 'flex',
        flexDirection : 'column',
        gap : 10, 
    },
    header : {
        display : 'flex' ,
        flexDirection : "row",
        height : "auto",
        // backgroundColor : 'red',
        width : "90%",
    },  
    helloworld : {
        width : "100%" , 
        height : "80%" , 
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        height : 75,
      },
      scrollview : { 
        flex: 1,
        display : 'flex' , 
        width : "100%" , 
        paddingLeft : "10%",
        gap : 20, 
      },
      display : {
        marginTop : 20,
        width : "90%" ,
        flex: 1,
        display : "flex",
        flexDirection : "row",
        justifyContent : "center" , 
        gap : 20 ,
      },
      rank: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 30,
      },
      username: {
        fontSize: 16,
      },
      victory: {
        fontSize: 14,
        color: '#888',
      },
      level: {
        fontSize: 14,
        color: '#888',
        marginLeft: 10,
      },
      error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
      },
      itemNumber1 : {
        backgroundColor : '#FFEBB7'
      },
      itemNumber2 : {
        backgroundColor : '#F1F1F1'
      },
      itemNumber3 : {
        backgroundColor : '#EFC4AB'
      },
      itemNumber4 : {
        backgroundColor : '#F7F4FF'
      },
      next: { 
        flexDirection : 'row',
        flex : 1,
        alignItems : 'center', 
      }
      
    

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
        fontSize : 25  
    }
})
