import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const ProblemCard = ({ onPress, active, uniqueKey, problem}) => (
  <TouchableOpacity onPress={onPress}>
    <Card containerStyle={[ styles.card, active == uniqueKey && styles.active ]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontSize: 18, fontFamily: 'nunito-bold' }}>{ problem.name }</Text>
          <Ionicons name='md-clock' color='#888888' size={14}>
            <Text style={{ fontFamily: 'nunito', fontSize: 14 }}> { problem.duration } Menit</Text>
          </Ionicons>
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

export default ProblemCard;