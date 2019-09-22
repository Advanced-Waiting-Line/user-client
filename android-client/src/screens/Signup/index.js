import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Button as ButtonPicker } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';
import Button from '../../component/Button';
import Input from '../../component/TextInput';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SignUp = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const [image, setImage] = useState(null)

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  }

  if(!(data && data.fontLoaded)){
    return <View/>
  } else {
    return (
      <ImageBackground source={require('../../../assets/bg-03.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{  flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Text style={{ fontFamily: 'comfortaa-bold', fontSize: 80, color: '#ffffff' }}>daftar</Text>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Nama</Text>
          <Input />
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Email</Text>
          <Input />
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Password</Text>
          <Input password={true}/>
          <ButtonPicker 
          onPress={_pickImage}
          title='Pilih Foto Profil'
          containerStyle={{
            width: 300,
            borderRadius: 5,
            marginBottom: 20,
            marginTop: 5,
            elevation: 3
          }}
          titleStyle={{
            color: '#0095FE',
            fontSize: 18
          }}
          buttonStyle={{
            backgroundColor: '#ffffff'
          }}
          />
          {image ? <Image source={{ uri: `data:image/jpeg;charset=utf-8;base64,${image}` }} style={{ width: 200, height: 200, resizeMode: 'cover', zIndex: 10 }} /> : <View/> }
          <Button title='Daftar' onPress={() => navigation.navigate('Login') }/>
        </View>
      </ImageBackground>
    )
  }
}

export default SignUp;