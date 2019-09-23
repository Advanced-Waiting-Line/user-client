import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../component/FloatingButton';
import Card from './components/card';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SelectCompany = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 120, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Pilih Lokasi Bank</Text>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Button title='Lanjut' onPress={() => navigation.navigate('SelectProblem')} />
        </View>
      </ImageBackground>
    )
  }
}

export default SelectCompany;