import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const LocationCard = () => (
  <Card containerStyle={{ height: 72, width: 300, borderRadius: 10 }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>Buat Rekening Baru</Text>
        <Ionicons name='md-clock' color='#888888' size={14}>
          <Text style={{ fontFamily: 'nunito', fontSize: 14 }}> Estimasi 40 Menit</Text>
        </Ionicons>
      </View>
    </View>
  </Card>
);

export default LocationCard;