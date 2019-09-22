import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../component/FloatingButton';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SelectLocation = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 60, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Pilih Lokasi Keberangkatan</Text>
          <Card containerStyle={{ height: 70, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }}>
                <Ionicons name='md-home' size={30}/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 24, fontFamily: 'nunito' }}>Alamat Rumah Anda</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={{ height: 70, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }}>
                <Ionicons name='md-pin' size={30}/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 24, fontFamily: 'nunito' }}>Posisi Saat Ini</Text>
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