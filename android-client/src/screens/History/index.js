import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Card from './components/card';

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

const Homepage = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const { data: dataQueue } = useQuery(GET_QUEUE_BY_USERID, { variables: { token: data.token }})
  
  let queueLog = []
  if(dataQueue){
    queueLog = dataQueue.getQueueByUserId
  }

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-05.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24 }}>History</Text>
          {
            queueLog.map( queue => {
              return <Card key={queue._id} queue={queue}/>
            })
          }
        </View>
      </ImageBackground>
      )
  } else {
    return <View/>
  }
}

export default Homepage;