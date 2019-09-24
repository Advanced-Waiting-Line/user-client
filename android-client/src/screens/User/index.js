import React from 'react';
import { View, Text, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const GET_USER_DATA = gql`
  query findOneUser($userId:String){
    findOneUser(userId:$userId){
      firstName
      lastName
      email
      password
      location {
        lat
        lng
      }
    }
  }
`;

const UserPage = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Image source={{ uri: 'https://via.placeholder.com/300'}} style={{  width: 240, height: 240, marginVertical: 30, borderRadius: 120 }}/>
          <Text style={{ fontSize: 32, fontFamily: 'nunito-bold' }}>Aditya Pradana</Text>
          <Text style={{ fontSize: 18, fontFamily: 'nunito' }}>adityabpradana@email.com</Text>
          <TouchableHighlight onPress={() => navigation.navigate('EditProfile')}>
            <View style={{ alignItems: 'center'}}>
              <Ionicons name='md-create' style={{ color: '#888888', marginTop: 10, marginBottom: 20 }}> Edit Profil</Ionicons>
            </View>
          </TouchableHighlight>
          <View style={{ width: 300 }}>
          <Text style={{ fontSize: 24, fontFamily: 'nunito-bold', marginVertical: 10 }}>Lokasi Asal</Text>
            <MapView style={{ width: 300, height: 150 }} initialRegion={{
              latitude: -6.260181,
              longitude: 106.780505,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
              <Marker coordinate={{
                latitude: -6.260181,
                longitude: 106.780505,
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