import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'

const LocationCard = () => (
  <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.2 }}>
        <Ionicons name='md-cash' size={36} color='#888888'/>
      </View>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Bank Kaya Raya</Text>
        <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#888888' }}>Jalan Mangga No. 5</Text>
      </View>
    </View>
  </Card>
);

export default LocationCard;