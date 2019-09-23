import React from 'react';
import { Input } from 'react-native-elements';

const TextInput = ({ password, value, onChangeText, width }) => {
  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={ password }
      containerStyle={{ width: width, borderRadius: 10, backgroundColor: '#ffffff', elevation: 3, marginBottom: 10, marginTop: 5 }}
      inputContainerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#ffffff' }}
    />
  )
};

export default TextInput;