import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, ImageBackground } from 'react-native';
import Button from '../../component/Button';
import CloudAnimation from '../../component/CloudAnimation';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const Landing = ({ navigation }) => { 
  const { data } = useQuery(GET_LOCAL_STATE);

  return (
    <ImageBackground source={require('../../../assets/bg-01.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
      <View style={{  flex: 1, alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 40 }}>
        {
          data && data.fontLoaded ? <Text style={{ fontSize: 80, color: '#0095FE', fontFamily: 'comfortaa-bold' }}>awan</Text> : null
        }
        <CloudAnimation size={500}/>
        <Button title='Mulai' onPress={() => navigation.navigate('Signup')}/>
      </View>
    </ImageBackground>
  )
}

export default Landing;