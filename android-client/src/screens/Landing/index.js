import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { View, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import LottieView from 'lottie-react-native'

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const Landing = ({ animation }) => {
  const state = useApolloClient()
  
  useEffect(() => {
    animation.play()
   
    state.writeData({ data: { fontLoaded: false } })
    Font.loadAsync({
      'comfortaa': require('../../../assets/fonts/comfortaa/Comfortaa-Regular.ttf'),
      'comfortaa-bold': require('../../../assets/fonts/comfortaa/Comfortaa-Bold.ttf'),
      'nunito': require('../../../assets/fonts/nunito/Nunito-Regular.ttf'),
      'nunito-bold': require('../../../assets/fonts/nunito/Nunito-Bold.ttf'),
    })
    .then( () => {
      state.writeData({ data: { fontLoaded: true } })
    })
    .catch(console.log)
  }, [])

  const { data } = useQuery(GET_LOCAL_STATE);

  return (
    <ImageBackground source={require('../../../assets/bg-01.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
      <View style={{  flex: 1, alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 40 }}>
        { data && data.fontLoaded ? <Text style={{ fontSize: 80, color: '#0095FE', fontFamily: 'comfortaa-bold' }}>awan</Text> : <View/> }
        <View>
        <LottieView
            ref={anime => {
              animation = anime;
            }}
            style={{
              width: 500,
              height: 500,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            source={require('../../../assets/1298-floating-cloud.json')}
          />
        </View>
        <Button title='Mulai' raised={ true }
        
        containerStyle={{ width: 240, borderRadius: 24 }}
        titleStyle={{ fontSize: 24 }}
        buttonStyle={{ backgroundColor: '#0095FE', borderRadius: 24, width: 240 }} />
      </View>
    </ImageBackground>
  )
}

export default Landing;