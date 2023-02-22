import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";

import MyButton from './MyButton';
import ListItem from './ListItem';

export default function List({ route, navigation }) {

  let [tab, setTab] = useState([]);

  let getPosition = async () => {
    let pos = await Location.getCurrentPositionAsync({})
    alert(JSON.stringify(pos, null, 4))
    await AsyncStorage.setItem('geo' + pos.timestamp, JSON.stringify(pos));
  }

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    createList()
  });

  let createList = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let stores = await AsyncStorage.multiGet(keys);
    let maps = stores.map((result, i, store) => {
      let key = store[i][0];
      let value = store[i][1];
      if (key.startsWith('geo'))
        return JSON.parse(value)
      return null
    }).filter(el => el != null);
    setTab(maps)
    // console.log(maps)
  }

  return (
    <View>
      <View>
        <MyButton content="Add Current Location" f={() => getPosition()} />
      </View>
      <Text>LISTA</Text>
      <FlatList
        data={tab}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={item => item.timestamp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
