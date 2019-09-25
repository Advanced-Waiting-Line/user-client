import React, { useState } from 'react';
import { View, Text, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../component/Button';
import CloudAnimation from '../../component/CloudAnimation';
import db from '../../utils/firestore';

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    token @client
  }
`;

const GET_QUEUE_BY_USERID = gql`
  query getQueueByUserId($token: String){
    getQueueByUserId(
        token: $token
    ) {
      _id
      companyId {
        name
      }
      checkIn
      problem {
        name
      }
    }
  }	
`;


const Done = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataQueue, refetch } = useQuery(GET_QUEUE_BY_USERID, { variables: { token: data.token }})
  

  const { estimationTime } = navigation.state.params;

  const [queueTime, setQueueTime] = useState('...')

  db.collection('awansub')
    .onSnapshot(_ => {
      console.log('SUBSCRIBE')
      refetch().then(data => {
        console.log('INIIIIIII', data.data.getQueueByUserId[0].checkIn)
        let formatedTime = new Date(data.data.getQueueByUserId[0].checkIn)
        formatedTime = formatedTime.toLocaleString()
        console.log('FORMATED', formatedTime)
        setQueueTime(formatedTime)
      })
    });

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View  style={{ alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 300, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <CloudAnimation size={250}/>
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito-bold'}}>Antrian Sudah Terdaftar</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#888888', fontFamily: 'nunito'}}>Siap-siap untuk berangkat ke lokasi tujuan...</Text>
          <Card containerStyle={{ height: 120, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Waktu Datang</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{queueTime}</Text>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Estimasi Perjalanan</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{estimationTime}</Text>
            </View>
          </Card>
          <View style={{ height: 10 }} />
          <Button title='Selesai' onPress={() => navigation.navigate('HomePage')}/>
        </View>
      </ImageBackground>
    )
  }
}

export default Done;