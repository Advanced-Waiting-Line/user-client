import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CloudAnimation from '../../component/CloudAnimation';
import Button from '../../component/Button';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const Homepage = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  return (
    <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          data && data.fontLoaded ? <Text style={{ textAlign: 'left', width: 300, fontSize: 24, fontFamily: 'nunito-bold', color: '#0095FE' }}>Advanced Waiting Line</Text> : null
        }
        <CloudAnimation size={400}/>
        {
          data && data.fontLoaded ? (
            <View>
              <Text style={{ textAlign: 'left', width: 300, fontSize: 24, fontFamily: 'nunito-bold' }}>Halo Adit!</Text>
              <Text style={{ textAlign: 'left', width: 300, fontSize: 18, marginBottom: 30, color: '#666666', fontFamily: 'nunito' }}>Mari kita ke tempat tujuan mu, tanpa harus antri...</Text>
            </View>
          ) : null
        }
        <Button title='Mari' onPress={() => navigation.navigate('SelectLocation')} />
      </View>
    </ImageBackground>
  )
}

export default Homepage;