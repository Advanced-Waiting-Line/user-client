import React, { useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
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

  const { checkIn, estimationTime } = navigation.state.params;

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <ScrollView style={{ alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 300, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <CloudAnimation size={250}/>
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito-bold'}}>Antrian Sudah Terdaftar</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#888888', fontFamily: 'nunito'}}>Siap-siap untuk berangkat ke lokasi tujuan...</Text>
          <Card containerStyle={{ height: 120, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Waktu Datang</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{checkIn}</Text>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Estimasi Perjalanan</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{estimationTime}</Text>
            </View>
          </Card>
          <View style={{ height: 10 }} />
          <Button title='Selesai' onPress={() => navigation.navigate('HomePage')}/>
        </ScrollView>
      </ImageBackground>
    )
  }
}

export default Done;