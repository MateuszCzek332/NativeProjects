import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, TextInput, Picker, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown'

import Button from './Button';

export default function ProfilScreen({ route, navigation: { goBack } }) {

  const { login, pass, acces } = route.params;
  let [log, setLog] = useState(login);
  let [password, setPassword] = useState(pass);
  let [acc, setAcc] = useState(acces);

  let changeData = async () => {
    if (log == '' || password == '') {
      alert('Nie można zmienic danych')
      return;
    }

    let keys = await AsyncStorage.getAllKeys();
    if (keys.includes(log)) {
      alert('Taki użytkownik już istnieje')
      return
    }

    let obj = {
      pass: password,
      acces: acc
    }

    await AsyncStorage.removeItem(login)
    await AsyncStorage.setItem(log, JSON.stringify(obj))
    goBack()
  }

  let deleteUser = async () => {
    await AsyncStorage.removeItem(login)
    goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{
        flexGrow: 6
      }}>

        <Text style={styles.h1}>EDIT USER {login} </Text>
        <Image
          source={require('./userProfileIcon.png')}
          style={styles.icon} />

        <Text style={styles.h1}>EDIT DATA</Text>
        <TextInput defaultValue={login} placeholder="Login" style={styles.input} onChangeText={text => setLog(text)} />
        <TextInput defaultValue={pass} placeholder="Password" style={styles.input} onChangeText={text => setPassword(text)} />

        <SelectDropdown
          data={['admin', 'user']}
          defaultValue={acces}
          buttonStyle={{
            alignSelf: 'center'
          }}
          onSelect={(selectedItem, index) => {
            setAcc(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />

        <Button content='Save' f={() => changeData()} />
        <Text style={styles.h1}>DELETE USER</Text>
        <Button content='DELETE' f={() => deleteUser()} />

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    margin: 10,
  },
  h1: {
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
  },
  h2: {
    paddingLeft: 40,
    fontSize: 20,
    margin: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 150,
    alignSelf: 'center',
    textAlign: 'center',
    height: 40
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 2,
  },
  firstCell: {
    flex: 1
  }
});
