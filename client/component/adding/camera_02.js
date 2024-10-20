import React from 'react';
import { View, Text , StyleSheet, Pressable, TextInput , ScrollView , Button , Image } from 'react-native';
import { useState , useEffect } from 'react';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
// import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Icon } from 'react-native-elements';

const API_URL = 'http://your-backend-url.com/process_image';

const Camera_OCR2 = ({ navigation}) => {

    const Go_back_adding = () => {
        navigation.navigate('Adding_manual');
      }; 

      const [image, setImage] = useState(null);
      const [result, setResult] = useState(null);
    
      const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Camera Permission",
                message: "App needs camera permission to take pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        }
        return true;
      };
    
      const takePhoto = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          console.log('Camera permission denied');
          return;
        }
    
        const options = {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            const source = { uri: response.assets[0].uri };
            setImage(source);
            processImage(response.assets[0].base64);
          }
        });
      };

      const processImage = async (base64Image) => {
        try {
          const response = await axios.post(API_URL, { image: base64Image });
          setResult(response.data);
        } catch (error) {
          console.error('Error processing image:', error);
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
            onPress={Go_back_adding}
          />
        </Pressable>
        <Pressable style={arrowback.setting}>
            <Icon
            name="help-outline"
            type="material"
            color="#000"
            size={30}
          />
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a Photo" onPress={takePhoto} />
      {image && <Image source={image} style={{ width: 200, height: 200 }} />}
      {result && (
        <View>
          <Text>Original Text: {result.original_text}</Text>
          <Text>Question: {result.question}</Text>
          <Text>Answer: {result.answer}</Text>
        </View>
      )}
    </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
    Screen:{
        backgroundColor : "#DED6FF",
        width : "100%",
        height : "100%",
        paddingTop : 80,
        alignItems : 'center', 
        display : 'flex',
        flexDirection : 'column',
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

// export default Camera_OCR;
