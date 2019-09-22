import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const CloudAnimation = ({ animation, size }) => {
  useEffect(() => {
    animation.play()
  }, [animation])

  return (
    <LottieView
      ref={anime => {
        animation = anime;
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: 'rgba(0,0,0,0)',
      }}
      source={require('../../assets/1298-floating-cloud.json')}
    />
  )
};

export default CloudAnimation;