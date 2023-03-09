import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FotoItem(props) {

  return (
    <View style={styles.container}>
      <Image
        // source={require('./icon.png')}
        style={styles.icon} />
      <View style={styles.info}>
        <View style={{ flex: 1, }} >
          <Text style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center' }} >TIMESTAMP</Text>
          <Text style={{ textAlign: 'center' }}>{new Date(props.item.timestamp).toLocaleDateString() + ' ' + new Date(props.item.timestamp).toLocaleTimeString()}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <Text style={{ color: 'blue' }} >Latitude: </Text>
          <Text>{props.item.coords.latitude}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <Text style={{ color: 'blue' }} >Longitude: </Text>
          <Text>{props.item.coords.longitude}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => props.del()}
        >
          <Image
            // source={require('./del.png')}
            style={styles.delIcon} />
        </TouchableOpacity>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={props.item.isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.toogle()}
          value={props.item.isEnabled}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  info: {
    flex: 6,
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 65,
    height: 65,
    margin: 10,
  },
  delIcon: {
    width: 40,
    height: 40,
  },
});
