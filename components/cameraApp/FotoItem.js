import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableHighlight, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function FotoItem(props) {

  let [selected, setSelected] = useState(false);

  let onHold = () => {
    props.onHold(selected, props.item.id)
    setSelected(!selected)
  }

  return (
    <TouchableHighlight
      onLongPress={() => onHold()}
      onPress={() => props.onClick()}
    >
      <ImageBackground
        style={{
          width: props.width,
          height: props.height,
          justifyContent: 'center',
          alignItems: 'center'
        }}

        source={{ uri: props.item.uri }}
      >
        {
          selected ?
            <Text style={{ color: 'red', fontSize: 60 }} >X</Text>
            :
            null
        }

      </ImageBackground>
    </TouchableHighlight >
  )

}