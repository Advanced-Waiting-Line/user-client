import React from 'react';
import { Input } from 'react-native-elements';

const TextInput = ({ password, value, onChangeText, width, placeholder }) => {
  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={ password }
      containerStyle={{ width: width, borderRadius: 10, backgroundColor: '#ffffff', elevation: 3, marginBottom: 10, marginTop: 5 }}
      inputContainerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#ffffff' }}
    />
  )
};

export default TextInput;