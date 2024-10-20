import React from 'react';
import { View, Text , StyleSheet, Pressable } from 'react-native';
import { useState , useEffect } from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Quiz_Progress = ({ navigation }) => {

  const Go_back = () => {
    navigation.navigate('Profile_Home');
  }; 

  const [selectedTab, setSelectedTab] = useState('Quest');

  const renderContent = () => {
    if (selectedTab === 'Quest') {
      return <Quest />;
    } else if (selectedTab === 'MedalTable') {
      return <MedalTable />;
    }
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
                onPress={Go_back}
              />
            </Pressable>

          </View>
          
          <View style={styles.navbar}>
            <Pressable
              style={[styles.navButton, selectedTab === 'Quest' && styles.activeButton]}
              onPress={() => setSelectedTab('Quest')}
            >
              <Text style={styles.navButtonText}>Quest</Text>
            </Pressable>
            <Pressable
              style={[styles.navButton, selectedTab === 'MedalTable' && styles.activeButton]}
              onPress={() => setSelectedTab('MedalTable')}
            >
              <Text style={styles.navButtonText}>Medal Table</Text>
            </Pressable>
          </View>
          {renderContent()}
        </View>
    );
};

const Quest = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>This is the Quest view</Text>
  </View>
);

const MedalTable = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>This is the Medal Table view</Text>
  </View>
);

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
      backgroundColor: '#EDE7F6',
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#B39DDB',
      padding: 10,
      width : "80%",
      height : '8%',
      borderRadius : 20,
    },
    navButton: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    navButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight : 'bold',
      borderRadius : 20,
    },
    activeButton: {
      borderBottomWidth: 2,
      borderBottomColor: '#673AB7',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: {
      fontSize: 18,
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


export default Quiz_Progress;
