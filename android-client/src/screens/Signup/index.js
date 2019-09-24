import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ToastAndroid } from 'react-native';
import { Button as ButtonPicker } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../component/Button';
import Input from '../../component/TextInput';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`

const REGISTER_USER = gql`
  mutation registerUser(
  $firstName: String
  $lastName: String
  $image: String
  $email: String
  $password: String
  $location: InputLocation
  ){
  registerUser
    (
      firstName: $firstName
      lastName: $lastName
      image: $image
      email: $email
      password: $password
      location: $location
    ){
      _id
    }
  }
`


const SignUp = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({
    latitude: -6.260181,
    longitude: 106.780505,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [register] = useMutation(REGISTER_USER, {
    variables: {
      firstName: firstName,
      lastName: lastName,
      location: {
        lat: location.latitude,
        lng: location.longitude
      },
      image: image,
      email: email,
      password: password,
    }
  })

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

  const  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Cannot access location')
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  useEffect(() => {
    _getLocationAsync()
  }, [])

  if(!(data && data.fontLoaded)){
    return <View/>
  } else {
    return (
      <ImageBackground source={require('../../../assets/bg-03.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{  flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <Text style={{ fontFamily: 'comfortaa-bold', fontSize: 80, color: '#ffffff' }}>daftar</Text>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Nama</Text>
          <View style={{ flexDirection: 'row', width: 300}}>
            <View style={{ flex: 0.5 }}>
              <Input width={145} onChangeText={ text => setFirstName(text)} value={firstName}/>
            </View>
            <View style={{ flex: 0.5 }}>
              <Input width={150} onChangeText={ text => setLastName(text)} value={lastName}/>
            </View>
          </View>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Email</Text>
          <Input width={300} onChangeText={ text => setEmail(text)} value={email}/>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Password</Text>
          <Input password={true} width={300} onChangeText={ text => setPassword(text)} value={password}/>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Lokasi</Text>
          <MapView style={{ width: 300, height: 150, marginBottom: 15 }} initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
            <Marker coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}/>
          </MapView>
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
          <Button title='Daftar'
            onPress={() => register()
            .then(() => {
              ToastAndroid.show('User Registered', ToastAndroid.SHORT, ToastAndroid.CENTER)
              navigation.navigate('Login')
            })
            .catch(err => {
             ToastAndroid.show('Cannot Register User, Please Fill with Valid Input', ToastAndroid.LONG, ToastAndroid.CENTER)
            })
            }/>
          <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#ffffff', marginTop: 10 }} onPress={() => navigation.navigate('Login')}>Sudah memiliki akun? Langsung masuk saja...</Text>
        </View>
      </ImageBackground>
    )
  }
}

export default SignUp;