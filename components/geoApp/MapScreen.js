import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function Map({ route, navigation }) {

  let tab = route.params
  useEffect(() => {
    // console.log(route.params)
  });

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: tab[0].coords.latitude,
        longitude: tab[0].coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      {
        tab.map((item, i) => {
          return <Marker
            key={i}
            coordinate={{
              latitude: item.coords.latitude,
              longitude: item.coords.longitude,
            }}
            title={"Marker " + (i + 1)}
          // description={''}
          />
        })
      }
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
