import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CloudAnimation from '../../component/CloudAnimation';
import Button from '../../component/Button';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    userId @client
  }
`;

const GET_USER_DATA = gql`
  query findOneUser($userId:String){
    findOneUser(userId:$userId){
      firstName
      lastName
      email
      image
      password
      location {
        lat
        lng
      }
    }
  }
`;

const Homepage = ({ navigation }) => {
  const state = useApolloClient()
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataUser } = useQuery(GET_USER_DATA, { variables: { userId: data.userId }})

  if(dataUser){
    state.writeData({ data: { 
      firstName: dataUser.findOneUser.firstName,
      lastName: dataUser.findOneUser.lastName,
      email: dataUser.findOneUser.email,
      image: dataUser.findOneUser.image,
      password: dataUser.findOneUser.password,
      location: dataUser.findOneUser.location
     }})
  }

  return (
    <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
        {
          data && data.fontLoaded ? <Text style={{ textAlign: 'center', width: 300, fontSize: 32, fontFamily: 'nunito-bold', color: '#0095FE' }}>Advanced Waiting Line</Text> : null
        }
        <CloudAnimation size={380}/>
        {
          data && data.fontLoaded ? (
            <View>
              <Text style={{ textAlign: 'left', width: 300, fontSize: 24, fontFamily: 'nunito-bold' }}>Halo Adit!</Text>
              <Text style={{ textAlign: 'left', width: 300, fontSize: 18, marginBottom: 20, color: '#666666', fontFamily: 'nunito' }}>Mari kita ke tempat tujuan mu, tanpa harus antri...</Text>
            </View>
          ) : null
        }
        {/* <Card containerStyle={{ height: 80, width: 300, borderRadius: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.2 }}>
              <Ionicons name='md-filing' size={44} color='#888888'/>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={{ fontSize: 14, fontFamily: 'nunito-bold' }}>Bank Kaya Raya</Text>
              <Text style={{ fontSize: 12, color: '#0095FE', fontFamily: 'nunito'}}>09.00 WIB, 29 September 2019</Text>
              <Text style={{ fontSize: 12, fontFamily: 'nunito', color: '#888888' }}>Pembuatan Rekening</Text>
            </View>
          </View>
        </Card> */}
        <View style={{ height: 30 }} />
        <Button title='Mari' onPress={() => navigation.navigate('SelectLocation')} />
      </View>
    </ImageBackground>
  )
}

export default Homepage;