import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import Button from '../../component/Button';
import Input from '../../component/TextInput';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SIGNIN = gql`
  mutation login(
    $email: String
    $password: String
  ){
  loginUser
    (
        email: $email
        password: $password
    ){
      _id
      email
      token
    }
  }
`;

const SignIn = ({ navigation }) => {
  const state = useApolloClient()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useQuery(GET_LOCAL_STATE);

  const [login] = useMutation(SIGNIN, {
    variables: {
      email,
      password
    }
  });

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
          <Button title='Masuk' onPress={ ()=> login()
            .then(({data}) => {
              state.writeData({ data: { userId: data.loginUser._id, token: data.loginUser.token }})
              navigation.navigate('Home', { userId: data.loginUser._id })
            })
            .catch(() => {
              ToastAndroid.show('Cannot Login, Please Input Valid Data', ToastAndroid.LONG, ToastAndroid.CENTER)
            })
          }/>
        </View>
      </ImageBackground>
    )
  } else {
    return <View/>
  }
}

export default SignIn;