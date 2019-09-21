import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

const Landing = () => {
  return (
    <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
      <View>
        <Text>Landing</Text>
      </View>
    </ImageBackground>
  )
}

export default Landing;