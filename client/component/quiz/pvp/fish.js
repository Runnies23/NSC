import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

const WalkingAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frames = [
    require('../../../assets/prachill/Asset 1.png'),
    require('../../../assets/prachill/Asset 2.png'),
    require('../../../assets/prachill/Asset 3.png'),
    require('../../../assets/prachill/Asset 4.png'),
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, 250); // Change frame every 250ms (4 frames per second)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      <Image
        source={frames[currentFrame]}

      />
    </View>
  );
};

export default WalkingAnimation;