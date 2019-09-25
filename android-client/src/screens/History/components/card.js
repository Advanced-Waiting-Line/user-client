import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'

const LocationCard = ({ queue }) => {
  let company, date, problem;
  if(queue){
    company = queue.companyId.name
    date = queue.checkIn
    date = new Date(date).toLocaleString()
    problem = queue.problem.name
  }


  return (
  <Card containerStyle={{ height: 80, width: 300, borderRadius: 10 }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.2 }}>
        <Ionicons name='md-filing' size={44} color='#888888'/>
      </View>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontSize: 14, fontFamily: 'nunito-bold' }}>{ company }</Text>
        <Text style={{ fontSize: 12, color: '#0095FE', fontFamily: 'nunito'}}>{ date }</Text>
        <Text style={{ fontSize: 12, fontFamily: 'nunito', color: '#888888' }}>{ problem }</Text>
      </View>
    </View>
  </Card>
)};

export default LocationCard;