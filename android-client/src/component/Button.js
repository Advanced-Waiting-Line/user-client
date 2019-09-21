import React from 'react';
import { Button } from 'react-native-elements';

const MainButton = ({ title, onPress }) => {

  return (
    <Button title={ title } raised={ true } onPress={onPress}
        containerStyle={{ width: 300, borderRadius: 24 }}
        titleStyle={{ fontSize: 24 }}
        buttonStyle={{ backgroundColor: '#0095FE', borderRadius: 24, width: 300 }}
    />
  )
}

export default MainButton;