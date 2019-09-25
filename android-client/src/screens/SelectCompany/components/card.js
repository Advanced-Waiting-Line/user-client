import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'

const LocationCard = ({ onPress, active, uniqueKey,company }) => (
  <TouchableOpacity onPress={onPress}>
    <Card containerStyle={[ styles.card, active == uniqueKey && styles.active ]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.2 }}>
          <Ionicons name='md-cash' size={36} color='#888888'/>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>{ company.name }</Text>
          <Text style={{ fontSize: 14, fontFamily: 'nunito', color: '#888888' }}>{ company.address }</Text>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    height: 72,
    width: 300,
    borderRadius: 10
  },
  active: {
    borderColor: '#0095FE',
    borderWidth: 1
  }
})

export default LocationCard;