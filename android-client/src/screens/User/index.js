import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    firstName @client
    lastName @client
    email @client
    image @client
    password @client
    location @client {
      lat
      lng
    }
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

const UserPage = ({ navigation }) => {
  const state = useApolloClient()
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataUser } = useQuery(GET_USER_DATA, { variables: { userId: data.userId }})

  useEffect(() => {
    if(dataUser){
      state.writeData({ data: { 
        firstName: dataUser.findOneUser.firstName,
        lastName: dataUser.findOneUser.lastName,
        email: dataUser.findOneUser.email,
        image: dataUser.findOneUser.image,
        password: dataUser.findOneUser.password,
        location: dataUser.findOneUser.location
       }})
    }
  }, [dataUser])
  

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Image source={{ uri: data.image }} style={{  width: 240, height: 240, marginVertical: 30, borderRadius: 120 }}/>
          <Text style={{ fontSize: 32, fontFamily: 'nunito-bold' }}>{ data.firstName + ' ' + data.lastName }</Text>
          <Text style={{ fontSize: 18, fontFamily: 'nunito' }}>{ data.email }</Text>
          <TouchableHighlight onPress={() => navigation.navigate('EditProfile')}>
            <View style={{ alignItems: 'center'}}>
              <Ionicons name='md-create' style={{ color: '#888888', marginTop: 10, marginBottom: 20 }}> Edit Profil</Ionicons>
            </View>
          </TouchableHighlight>
          <View style={{ width: 300 }}>
          <Text style={{ fontSize: 24, fontFamily: 'nunito-bold', marginVertical: 10 }}>Lokasi Asal</Text>
            <MapView style={{ width: 300, height: 150 }} initialRegion={{
              latitude: data.location.lat,
              longitude: data.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
              <Marker coordinate={{
                latitude: data.location.lat,
                longitude: data.location.lng,
              }}/>
            </MapView>
          </View>
        </View>
      </ImageBackground>
    )
  } else {
    return null
  }
}

export default UserPage;