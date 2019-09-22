import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../component/Button';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
  }
`;

const SelectProblem = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 60, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24 }}>Pilih Layanan</Text>
          <Card containerStyle={{ height: 60, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.8 }}>
                <Text>Bank Kaya Raya</Text>
                <FontAwesome name='time'/>
                <Text>Jalan Cendrawasih</Text>
              </View>
            </View>
          </Card>
        </View>
      </ImageBackground>
    )
  }
}

export default SelectProblem;