import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from './Button';
import Header from './Header';

export default function ProfilScreen({ navigation }) {


  // let [val, setVal] = useState('User APP');

  return (
    <View style={styles.container}>
      <Header/>
      <View style={{
        flex:9,

      }}>
        
        <Text>Profil</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
