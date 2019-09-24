import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Button as ButtonPicker, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../component/Button';
import Input from '../../component/TextInput';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    userId @client
  }
`;

const GET_USER_DATA = gql`
  query findOneUser($userId:String){
    findOneUser(userId:$userId){
      firstName
      lastName
      email
      image
      password
      location {
        lat
        lng
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $userId: String
    $firstName: String
    $lastName: String
    $image: String
    $email: String
    $password: String
    $location: InputLocation
  ){
    updateUser
    (
      userId: $userId
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
`;

const EditProfile = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataUser } = useQuery(GET_USER_DATA, { variables: { userId: data.userId }})
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({
    latitude: dataUser.findOneUser.location.lat,
    longitude: dataUser.findOneUser.location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [editUser] = useMutation(UPDATE_USER, { variables: {
    userId: data.userId,
    firstName: firstName,
    lastName: lastName,
    location: {
      lat: dataUser.findOneUser.location.lat,
      lng: dataUser.findOneUser.location.lng
    },
    image: image,
    email: email,
    password: password
  }})

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
        <View style={{  flex: 1, alignItems: 'center', paddingTop: 10 }}>
          <Text style={{ fontFamily: 'comfortaa-bold', fontSize: 64, color: '#ffffff' }}>edit profil</Text>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Nama</Text>
          <View style={{ flexDirection: 'row', width: 300}}>
            <View style={{ flex: 0.5 }}>
              <Input width={145} onChangeText={ text => setFirstName(text)} value={firstName} placeholder={dataUser.findOneUser.firstName}/>
            </View>
            <View style={{ flex: 0.5 }}>
              <Input width={150} onChangeText={ text => setLastName(text)} value={lastName} placeholder={dataUser.findOneUser.lastName}/>
            </View>
          </View>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: '#ffffff', textAlign: 'left', width: 300 }}>Email</Text>
          <Input width={300} onChangeText={ text => setEmail(text)} value={email} placeholder={dataUser.findOneUser.email}/>
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
          {image ? <Image source={{ uri: `data:image/jpeg;charset=utf-8;base64,${image}` }} style={{ width: 200, height: 200, resizeMode: 'cover', zIndex: 10 }} /> : <View/> }
          <Button title='Edit' onPress={() => {
            editUser()
            navigation.navigate('Profile')
          } }/>
        </View>
      </ImageBackground>
    )
  }
}

export default EditProfile;