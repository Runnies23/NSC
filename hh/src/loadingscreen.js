import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

const LoadingScreen = () => {
  const [loadingDots, setLoadingDots] = useState('');
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animation for fading in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animation for loading dots
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Image
          source={require('../assets/Shinobu_loading.png')}
          style={styles.image}
        />
        <Text style={styles.loadingText}>
          Loading{loadingDots}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF3FF', // Your desired background color
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BA6AE3', // Your desired text color
  },
});

export default LoadingScreen;