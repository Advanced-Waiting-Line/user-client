import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Divider } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '../../component/FloatingButton';
import Axios from 'axios'

const GET_LOCAL_STATE = gql`
  {
    fontLoaded @client
    token @client
    userId @client
    selectedLocation @client {
      lat
      lng
    }
    selectedCompany @client
    selectedProblem @client
    detailedLocation @client
    detailedCompany @client {
      name
      address
    }
    detailedProblem @client {
      name
      duration
    }
  }
`;

const CREATE_QUEUE = gql`
  mutation createQueue(
  $companyId: String
  $token: String
  $problemId: String
  $userId: String
  ){
  createQueue(
      companyId: $companyId
      token: $token
      problemId: $problemId
      userId: $userId
    ){
      companyId
      userId
      problem
      checkIn
      duration
    }
  }
`;

const Review = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  const [createQueue] = useMutation(CREATE_QUEUE, { variables: {
    companyId: '',
    token: '',
    problemId: '',
    userId: ''
  }})

  console.log(data)

  // useEffect(() => {
    // Axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=Bandung&destination=Jakarta&key=AIzaSyC8MMkbDo_v6ZjOTGw3-N7iJr8RZmaxn4s')
    //   .then(({ data }) => {
    //     console.log(data)
    //   })
    //   .catch(console.log)
  // }, [])

  if(data && data.fontLoaded){
    return (
      <ImageBackground source={require('../../../assets/bg-04.jpg')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
          <View style={{ width: 300, backgroundColor: '#dddddd', height: 12, borderRadius: 6, marginBottom: 20 }}>
            <View style={{ width: 240, backgroundColor: '#0095FE', height: 12, borderRadius: 6 }}/>
          </View>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 24, color: '#0095FE' }}>Peninjauan</Text>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 18, color: '#666666' }}>Dari</Text>
          <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }}>
                <Ionicons name='md-pin' size={36} color='#888888'/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>{ data.detailedLocation }</Text>
              </View>
            </View>
          </Card>
          <Text style={{ textAlign: 'left', width: 300, fontSize: 18, color: '#666666', marginTop: 10 }}>Ke</Text>
          <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }}>
                <Ionicons name='md-cash' size={36} color='#888888'/>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>{ data.detailedCompany.name }</Text>
                <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#888888' }}>{ data.detailedCompany.address }</Text>
              </View>
            </View>
          </Card>
          <Divider style={{ height: 20, borderColor: '#0095FE' }}/>
          <View style={{ width: 300, borderTopColor: '#dddddd', borderTopWidth: 1, paddingTop: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>{ data.detailedProblem.name }</Text>
            <Ionicons name='md-clock' color='#666666' size={14}>
              <Text style={{ fontFamily: 'nunito'}}> {data.detailedProblem.duration} Menit</Text>
            </Ionicons>
          </View>
          <Card containerStyle={{ height: 120, width: 300, borderRadius: 10 }}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Waktu Datang</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>09.00 WIB, 29 September 2019</Text>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Estimasi Perjalanan</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>15 Menit</Text>
            </View>
          </Card>
          <Button title='Setuju' onPress={() => navigation.navigate('Done')}/>
        </View>
      </ImageBackground>
    )
  } else {
    return <View/>
  }
}

export default Review;