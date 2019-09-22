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
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24 }}>History</Text>
          <Card containerStyle={{ height: 90, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.3 }}>
                <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 60, height: 60, borderRadius: 30 }}/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text>Bank Kaya Raya</Text>
                <Text>19 September 2019</Text>
              </View>
            </View>
          </Card>
        </View>
      </ImageBackground>
    )
  }
}

export default Homepage;