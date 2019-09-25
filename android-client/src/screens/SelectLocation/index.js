import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Card } from 'react-native-elements';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Button from '../../component/FloatingButton';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    location @client {
      lat
      lng
    }
  }
`;

const SelectLocation = ({ navigation }) => {
  const state = useApolloClient()
  const { data } = useQuery(GET_LOCAL_STATE);

  const [active, setActive] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [detailedLocation, setDetailedLocation] = useState('');

  const  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Cannot access location')
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords)
  };

  useEffect(() => {
   _getLocationAsync()
  }, [])

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 60, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Pilih Lokasi Keberangkatan</Text>
          
          <TouchableOpacity onPress={() => {
            setActive(1)
            setSelectedLocation(data.location)
            setDetailedLocation('Alamat Rumah Anda')
          }}>
            <Card containerStyle={[ styles.card, active == 1 && styles.active ]}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Ionicons name='md-home' size={36} color='#888888'/>
                </View>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Alamat Rumah Anda</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setActive(2)
            setSelectedLocation({
              lat: currentLocation.latitude,
              lng: currentLocation.longitude
            })
            setDetailedLocation('Posisi Anda Saat Ini')
          }}>
            <Card containerStyle={[ styles.card, active === 2 && styles.active ]}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Ionicons name='md-pin' size={36} color='#888888'/>
                </View>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Posisi Anda Saat Ini</Text>
                  <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#888888' }}>Menggunakan GPS</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
          <Button title='Lanjut' onPress={() => {
            state.writeData({ data: {
              selectedLocation: {...selectedLocation, "__typename": "Location"},
              detailedLocation: detailedLocation
            }})
            navigation.navigate('SelectCompany')
          }}
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 72,
    width: 300,
    borderRadius: 10
  },
  active: {
    borderColor: '#0095FE',
    borderWidth: 1
  }
})

export default SelectLocation;