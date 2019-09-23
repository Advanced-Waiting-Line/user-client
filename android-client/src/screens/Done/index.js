import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../component/Button';
import CloudAnimation from '../../component/CloudAnimation';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const Done = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 300, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <CloudAnimation size={250}/>
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito-bold'}}>Antrian Sudah Terdaftar</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#888888', fontFamily: 'nunito'}}>Siap-siap untuk berangkat ke lokasi tujuan...</Text>
          <Card containerStyle={{ height: 120, width: 300, borderRadius: 10, marginBottom: 20 }}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Waktu Datang</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>09.00 WIB, 29 September 2019</Text>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Estimasi Perjalanan</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>15 Menit</Text>
            </View>
          </Card>
          <Button title='Lihat Antrian' onPress={() => console.log('OKE')}/>
        </View>
      </ImageBackground>
    )
  }
}

export default Done;