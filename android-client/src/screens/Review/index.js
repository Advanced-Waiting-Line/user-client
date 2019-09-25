import React, { useEffect, useState } from 'react';
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
      location {
        lat
        lng
      }
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
  $distance: Int
  ){
  createQueue(
      companyId: $companyId
      token: $token
      problemId: $problemId
      distance: $distance
    ){
      companyId {
        name
      }
      userId {
        firstName
      }
      problem {
        name
      }
      checkIn
      duration
    }
  }
`;

const CREATE_PREVIEW = gql`
  mutation getPreview($companyId:String, $token: String, $problemId: String, $distance: Int){
  getPreview(
    companyId:$companyId,
    token: $token,
    problemId: $problemId,
    distance: $distance
  ){
      checkIn
      duration
    },
  }
`;

const Review = ({ navigation }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  const [createQueue, queue] = useMutation(CREATE_QUEUE, { variables: {
    companyId: data.selectedCompany,
    token: data.token,
    problemId: data.selectedProblem,
    distance: durationSecond || 300
  }})

  const [createQueuePreview, queuePreview] = useMutation(CREATE_PREVIEW, {
    variables: {
      companyId: data.selectedCompany,
      token: data.token,
      problemId: data.selectedProblem,
      distance: durationSecond || 300
    }
  })


  const [estimationTime, setEstimationTime] = useState('')
  const [durationSecond, setDurationSecond] = useState('')

  useEffect(() => {
    createQueuePreview()
    Axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${data.selectedLocation.lat},${data.selectedLocation.lng}&destination=${data.detailedCompany.location.lat},${data.detailedCompany.location.lng}&key=AIzaSyCVNjx0q6PYDHeFw1JbyPWaJHOvMX7EkLY`)
      .then(({ data }) => {
        setDurationSecond(data.routes[0].legs[0].duration.value)
        setEstimationTime(data.routes[0].legs[0].duration.text)
        console.log(data.routes[0].legs[0].duration)
      })
      .catch(console.log)
  }, [])

  let checkIn = '';
  if(queuePreview){
    if(queuePreview.data){
      checkIn = new Date(queuePreview.data.getPreview.checkIn).toLocaleString()
    }
  }
  
  console.log(queuePreview.data)
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
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{checkIn}</Text>
              <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', fontFamily: 'nunito-bold'}}>Estimasi Perjalanan</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#0095FE', fontFamily: 'nunito'}}>{estimationTime}</Text>
            </View>
          </Card>
          <Button title='Setuju' onPress={() => {
            createQueue()
            navigation.navigate('Done', { checkIn: checkIn, estimationTime: estimationTime})
            }}/>
        </View>
      </ImageBackground>
    )
  } else {
    return <View/>
  }
}

export default Review;