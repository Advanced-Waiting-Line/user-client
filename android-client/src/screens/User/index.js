import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const Homepage = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Image source={{ uri: 'https://via.placeholder.com/300'}} style={{  width: 240, height: 240, marginVertical: 40, borderRadius: 120 }}/>
          <Text style={{ fontSize: 32, marginBottom: 80 }}>Aditya Budi Pradana</Text>
          <View style={{ width: 300 }}>
            <Text style={{ fontSize: 18 }}>Ganti lokasi asal</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default Homepage;