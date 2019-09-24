import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Button from '../../component/FloatingButton';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client,
  }
`;

const SelectLocation = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  const [currentLocation, setCurrentLocation] = useState({
    lat: '',
    lng: ''
  })

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

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 60, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Pilih Lokasi Keberangkatan</Text>
          
          <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }}>
                <Ionicons name='md-home' size={36} color='#888888'/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Alamat Rumah Anda</Text>
                <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#888888' }}>Jalan Cendrawasih</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
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
          <View style={{ height: 30 }} />
          <Button title='Lanjut' onPress={() => navigation.navigate('SelectCompany')} />
        </View>
      </ImageBackground>
    )
  }
}

export default SelectLocation;