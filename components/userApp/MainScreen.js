import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, KeyboardAvoidingView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";


export default function MainScreen({ navigation }) {

  let [fontloaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'myfont': require('./nazwafonta.ttf'),
      });
      setFontLoaded(true)
    }

    async function createAdmin() {
      let obj = {
        pass: '1234',
        acces: 'admin'
      }
      await AsyncStorage.setItem('admin', JSON.stringify(obj))
    }

    createAdmin()
    loadFont()
  });

  return (
    <View style={{ flex: 1 }}>
      {
        fontloaded
          ?
          <View style={styles.conteiner}>
            <TouchableOpacity
              onPress={() => { navigation.navigate("loginScreen") }}
            ><Text style={styles.h1}>User App</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Basic user management</Text>
            <Text style={styles.text}>Admin Log:admin</Text>
            <Text style={styles.text}>Admin Log:1234</Text>
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
    backgroundColor: 'green'
  },
  h1: {
    fontFamily: 'myfont',
    fontSize: 90,
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontSize: 38,
    textAlign: 'center',
    color: 'white'

  }
}