import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function CameraScreen({ navigation }) {

  // let [tab, setTab] = useState([]);

  let createList = async () => {
    // let keys = await AsyncStorage.getAllKeys();
    // let stores = await AsyncStorage.multiGet(keys);
    // let maps = stores.map((result, i, store) => {
    //   let key = store[i][0];
    //   let value = store[i][1];
    //   if (key.startsWith('geo'))
    //     return JSON.parse(value)
    //   return null
    // }).filter(el => el != null);
    // console.log(maps)
    // return maps
  }

  useEffect(() => {
    // const f = async () => {
    //   const tab = await createList()
    //   for (let i = 0; i < tab.length; i++)
    //     tab[i].isEnabled = false;
    //   setTab(tab)
    // };
    // f();

  }, []);

  return (
    <Text>Camera</Text>
    // <View>
    //   <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    //     <MyButton content="Add Current Location" f={() => getPosition()} />
    //     <MyButton content="Delete All" f={() => delAll()} />
    //   </View>
    //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    //     <MyButton content="Go to Map" f={() => goToMap()} />
    //     <Switch
    //       trackColor={{ false: '#767577', true: '#81b0ff' }}
    //       thumbColor={isEnabledAll ? '#f5dd4b' : '#f4f3f4'}
    //       ios_backgroundColor="#3e3e3e"
    //       onValueChange={() => toogleAll()}
    //       value={isEnabledAll}
    //     />
    //   </View>
    //   <Text>LISTA </Text>
    //   {
    //     !tab ?
    //       null
    //       :
    //       <FlatList
    //         data={tab}
    //         renderItem={({ item, index }) => <ListItem item={item} toogle={() => toogle(index)} del={() => delPosition(item.timestamp)} />}
    //         keyExtractor={item => item.timestamp}
    //       />
    //   }

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
