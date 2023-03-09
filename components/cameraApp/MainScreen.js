import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, KeyboardAvoidingView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from "expo-font";



export default function Main({ navigation }) {

  let [fontloaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'myfont': require('./nazwafonta.ttf'),
      });
      setFontLoaded(true)
    }

    loadFont()
  });
  return (
    <View style={{ flex: 1 }}>
      {
        fontloaded
          ?
          <View style={styles.conteiner}>
            <TouchableOpacity
              onPress={() => { navigation.navigate("galleryScreen") }}
            ><Text style={styles.h1}>Camera App</Text>
            </TouchableOpacity>
            <Text
              style={styles.text}>Show gallery and make photos</Text>
          </View>
          :
          null
      }
    </View>
  );

}

const styles = {
  conteiner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  h1: {
    fontFamily: 'myfont',
    fontSize: 90,
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  }
}