import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';

export default function LoginScreen({ navigation }) {
  let [log, setlog] = useState('');
  let [pass, setPass] = useState('');

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
      if (key.startsWith('UserApp')) {
        let value = JSON.parse(store[i][1]);
        if (login == value.login && pass == value.pass)
          user = {
            login: value.login,
            pass: value.pass,
            acces: value.acces
          }
      }
    });
    return user;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
