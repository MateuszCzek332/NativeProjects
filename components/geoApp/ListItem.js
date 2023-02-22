import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListItem(props) {

  useEffect(() => {

  });

  return (
    <Text>{props.item.timestamp}</Text>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
