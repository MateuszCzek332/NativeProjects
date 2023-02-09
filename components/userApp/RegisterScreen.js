import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from './Header';
import Button from './Button';

export default function LoginScreen({ navigation }) {
  let [log, setlog] = useState('');
  let [pass, setPass] = useState('');
  let addUser = async () => {

    if (log == '' || pass == '') {
      alert('Musisz podać login i hasło')
      return;
    }

    let keys = await AsyncStorage.getAllKeys();
    console.log(keys)

    if (keys.includes(log)) {
      alert('Taki użytkownik już istnieje')
      return
    }

    let obj = {
      pass: pass,
      acces: 'user'
    }
    await AsyncStorage.setItem(log, JSON.stringify(obj))
    keys = await AsyncStorage.getAllKeys();
    console.log(keys)
    return
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Text style={styles.h1}>REJESTRACJA</Text>
          <Image
            source={require('./userAddIcon.png')}
            style={styles.icon} />
          <TextInput placeholder="Username" style={styles.input} onChangeText={text => setlog(text)} />
          <TextInput secureTextEntry={true} placeholder="Password" style={styles.input} onChangeText={text => setPass(text)} />
          <Button content='Zarejestruj się' f={() => addUser()} />
          <TouchableOpacity style={{
            // backgroundColor: 'red',
            width: 90,
            alignSelf: 'center'
          }}
            onPress={() => {
              navigation.navigate('loginScreen')
            }}>
            <Text style={{
              fontSize: 17,
              textAlign: 'center',
              borderBottomWidth: 1
            }}>Zaloguj się</Text>
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
