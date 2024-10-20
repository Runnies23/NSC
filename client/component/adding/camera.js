import React, { useState } from 'react';
import { View, Text, Touchable, StyleSheet, Dimensions, Image, Platform, PermissionsAndroid , Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');
const CAPTURE_SIZE = Math.floor(width * 0.7);

const API_URL = 'http://your-backend-url.com/process_image';

const Camera_OCR = ({ navigation, route }) => {
  const { flashcardIndex, type } = route.params;
  const [result, setResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isQuestionSelected, setIsQuestionSelected] = useState(true);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
          return true;
        } else {
          console.log("Camera permission denied");
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const selectPicture = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage({ uri: response.assets[0].uri });
        processImage(response.assets[0].uri);
      }
    });
  };

  const processImage = async (imageUri) => {
    try {
      const imageBase64 = await convertImageToBase64(imageUri);
      const response = await axios.post(API_URL, { 
        image: imageBase64,
        type
      });
      setResult(response.data);
      navigation.navigate('Adding_manual', { flashcardIndex, text: response.data.text, type });
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imageUri, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.send();
    });
  };

  const Goback = () => { 
    navigation.navigate('Adding_manual');
};

  const toggleSelection = () => {
    setIsQuestionSelected(!isQuestionSelected);
  }; 

  const Shoot_photo = () => {
    
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
      <View style={styles.camera}>
        {/* the image capture right here */}
      </View> 
      
      <View style={styles.section_button}>

      <View style={styles.toggleContainer}>
        <Pressable onPress={toggleSelection} style={[styles.toggleButton, isQuestionSelected && styles.selectedButton]}>
          <Text style={styles.toggleText}>Question</Text>
        </Pressable>
        <Pressable onPress={toggleSelection} style={[styles.toggleButton, !isQuestionSelected && styles.selectedButton]}>
          <Text style={styles.toggleText}>Answer</Text>
        </Pressable>
      </View>
      
     
        <View style={styles.interaction}>

        <Pressable style={styles.selectButton} onPress={selectPicture}>
            <Icon
                name="image"
                type="material"
                color="white"
                size={30}
            />

        </Pressable>  

        <Pressable style={styles.selectCamera} onPress={Shoot_photo}>
        <Icon
              name="photo-camera"
              type="material"
              color="white"
              size={30}
          />
        </Pressable>

        <Pressable style={styles.selectButton_visible}>
          
          <Icon
                name="photo-camera"
                type="material"
                color="#FBF3FF"
                size={30}
            />

        </Pressable>

        </View>
        

        {selectedImage && (
          <Image source={selectedImage} style={styles.image} />
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Recognized Text: {result.text}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    margin: 20,
    padding: 10,
    height : 50,
    width : 50 , 
    justifyContent : 'center' , 
    alignItems : "center" , 
    backgroundColor: '#4F43AA',
    borderRadius: 5,
  },

  selectButton_visible: {
    margin: 20,
    padding: 10,
    height : 50,
    width : 50 , 
    justifyContent : 'center' , 
    alignItems : "center" , 
    backgroundColor: '#FBF3FF',
    borderRadius: 5,
  },
  selectButtonText: {
    color: 'white',
  },
  selectButtonText_invisible: {
    color: '#FBF3FF',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  camera : { 
    marginTop : 60 , 
    width  : "85%" , 
    height : "15%",
    borderWidth : 2 ,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    width : "80%" , 
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    width : '50%',
    justifyContent : 'center' , 
    alignItems : 'center'
  },
  selectedButton: {
    backgroundColor: '#998EEA',
  },
  toggleText: {
    fontSize: 16,
  },
  interaction : { 
    flexDirection : 'row',
    marginTop : 20,
  },
  selectCamera : { 
    position : "relative" , 
    bottom : 20 , 
    margin: 20,
    padding: 20,
    backgroundColor: '#4F43AA',
    borderRadius: 50,
  },
  section_button: { 
    width : "100%",
    height : "60%",
    justifyContent : 'flex-end',
    alignItems : "center"
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
    
  }
})

export default Camera_OCR;