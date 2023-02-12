import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from './Header';
import Button from './Button';

export default function LoginScreen({ navigation }) {
  let [log, setlog] = useState('admin');
  let [pass, setPass] = useState('1234');
  let login = async () => {
    let user = await checkUser(log, pass)
    // console.log(user)
    if (user == null) {
      alert('Błędny login i/lub hasło')
      return
    }

    navigation.navigate('profilScreen', user)
  }

  let checkUser = async (login, pass) => {
    let keys = await AsyncStorage.getAllKeys();
    let stores = await AsyncStorage.multiGet(keys);
    let user = null
    let maps = await stores.map((result, i, store) => {
      let key = store[i][0];
      let value = JSON.parse(store[i][1]);
      if (login == key && pass == value.pass)
        user = {
          login: key,
          pass: value.pass,
          acces: value.acces
        }
    });
    return user;
  }

  useEffect(() => {
    createAdmin()
  });

  let createAdmin = async () => {
    let obj = {
      pass: '1234',
      acces: 'admin'
    }
    await AsyncStorage.setItem('admin', JSON.stringify(obj))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Text style={styles.h1}>LOGOWANIE</Text>
          <Image
            source={require('./userIcon.png')}
            style={styles.icon} />
          <TextInput placeholder="Username" style={styles.input} onChangeText={text => setlog(text)} />
          <TextInput secureTextEntry={true} placeholder="Password" style={styles.input} onChangeText={text => setPass(text)} />
          <Button content='Zaloguj się' f={() => login()} />
          <TouchableOpacity style={{
            // backgroundColor: 'red',
            width: 90,
            alignSelf: 'center'
          }}
            onPress={() => {
              navigation.navigate('registerScreen')
            }}>
            <Text style={{
              fontSize: 17,
              textAlign: 'center',
              borderBottomWidth: 1
            }}>Rejestracja</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 12
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
  input: {
    borderBottomWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 150,
    alignSelf: 'center',
    textAlign: 'center',
    height: 40
  }
});
