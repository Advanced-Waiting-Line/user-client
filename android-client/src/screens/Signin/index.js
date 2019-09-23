import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, ImageBackground } from 'react-native';
import Button from '../../component/Button';
import Input from '../../component/TextInput';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-02.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100}}>
          <Text style={{ fontFamily: 'comfortaa-bold', fontSize: 80, color: '#ffffff' }}>masuk</Text>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Email</Text>
          <Input width={300} onChangeText={ text => setEmail(text)} value={email} />
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Password</Text>
          <Input width={300} onChangeText={ text => setPassword(text)} value={password} password={true}/>
          <View style={{ height: 20 }} />
          <Button title='Masuk' onPress={ ()=> navigation.navigate('Home')}/>
        </View>
      </ImageBackground>
    )
  } else {
    return <View/>
  }
}

export default SignIn;