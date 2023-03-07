import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";

import MyButton from './MyButton';
import ListItem from './ListItem';

export default function List({ navigation }) {

  let [tab, setTab] = useState([]);
  let [isEnabledAll, setIsEnabled] = useState(false);

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
      for (let i = 0; i < tab.length; i++)
        tab[i].isEnabled = false;
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

  let toogle = (i) => {
    let t = tab
    t[i].isEnabled = !t[i].isEnabled
    setTab([...t])
  }

  let toogleAll = () => {
    let t = tab;
    for (let i = 0; i < tab.length; i++)
      t[i].isEnabled = !isEnabledAll
    setIsEnabled(!isEnabledAll)
    setTab([...t])

  }

  let goToMap = () => {
    let t = [];
    for (let i = 0; i < tab.length; i++)
      if (tab[i].isEnabled)
        t.push(tab[i])


    if (t.length > 0)
      navigation.navigate("mapScreen", t)
    else
      alert('You have to choise at least one position')
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <MyButton content="Add Current Location" f={() => getPosition()} />
        <MyButton content="Delete All" f={() => delAll()} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <MyButton content="Go to Map" f={() => goToMap()} />
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabledAll ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toogleAll()}
          value={isEnabledAll}
        />
      </View>
      <Text>LISTA </Text>
      {
        !tab ?
          null
          :
          <FlatList
            data={tab}
            renderItem={({ item, index }) => <ListItem item={item} toogle={() => toogle(index)} del={() => delPosition(item.timestamp)} />}
            keyExtractor={item => item.timestamp}
          />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
