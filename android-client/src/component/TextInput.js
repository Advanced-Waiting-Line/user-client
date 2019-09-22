import React from 'react';
import { Input } from 'react-native-elements';

const TextInput = ({ password }) => {
  return (
    <Input
      secureTextEntry={ password }
      containerStyle={{ width: 300, borderRadius: 10, backgroundColor: '#ffffff', elevation: 3, marginBottom: 20, marginTop: 5 }}
      inputContainerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#ffffff' }}
    />
  )
};

export default TextInput;