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
    console.log(maps)
    return maps
  }

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    const f = async () => {
      const tab = await createList()
      setTab(tab)
    };
    f();

  }, []);

  let getPosition = async () => {
    let pos = await Location.getCurrentPositionAsync({})
    if (tab.length == 0 || tab[tab.length - 1].timestamp != pos.timestamp) {
      alert(JSON.stringify(pos, null, 4))
      setTab([...tab, pos])
      await AsyncStorage.setItem('geo' + pos.timestamp, JSON.stringify(pos));
    }
  }

  let delPosition = async (time) => {
    await AsyncStorage.removeItem('geo' + time);
    let t = tab
    for (let i = 0; i < t.length; i++) {
      if (t[i].timestamp == time) {
        t.splice(i, 1)
        break;
      }
    }
    setTab([...t])
  }

  let delAll = async () => {
    for (let i = 0; i < tab.length; i++) {
      await delPosition(tab[i].timestamp)
    }
    setTab([])
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <MyButton content="Add Current Location" f={() => getPosition()} />
        <MyButton content="Delete All" f={() => delAll()} />
      </View>
      <Text>LISTA </Text>
      {
        !tab ?
          null
          :
          <FlatList
            data={tab}
            renderItem={({ item }) => <ListItem item={item} del={() => delPosition(item.timestamp)} />}
            keyExtractor={item => item.timestamp}
          />
        // tab.map((item, i) => {
        //   return <ListItem key={i} item={item} del={() => delPosition(item.timestamp)} />
        // })
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
