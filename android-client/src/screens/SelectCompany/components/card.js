import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const LocationCard = () => (
  <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Bank Kaya Raya</Text>
        <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#666666' }}>Jalan Cendrawasih</Text>
      </View>
    </View>
  </Card>
);

export default LocationCard;