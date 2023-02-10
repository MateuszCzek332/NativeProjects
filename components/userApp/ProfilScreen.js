import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';
import Header from './Header';
import LoginScreen from './LoginScreen';

export default function ProfilScreen({ route, navigation }) {

  let { login, pass, acces } = route.params;
  let [password, setPassword] = useState(pass);
  let [oldPass, setOldPass] = useState('');
  let [newPass, setNewPass] = useState('');
  // let [val, setVal] = useState('User APP');

  let changePass = async () => {
    if (newPass == '' || oldPass != password) {
      alert('nie można zmienic hasła')
      return;
    }

    setPassword(newPass)

    let obj = {
      pass: newPass,
      acces: acces
    }

    await AsyncStorage.removeItem(login)
    await AsyncStorage.setItem(login, JSON.stringify(obj))
  }

  let deleteUser = async () => {
    await AsyncStorage.removeItem(login)
    navigation.navigate('loginScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={{
        flexGrow: 6

      }}>

        <Text style={styles.h1}>WELCOME {login} </Text>
        <Image
          source={require('./userProfileIcon.png')}
          style={styles.icon} />

        <Text style={styles.h1}>INFO </Text>
        <Text style={styles.h2}>Login: {login} </Text>
        <Text style={styles.h2}>Password: {password} </Text>
        <Text style={styles.h2}>Acces: {acces} </Text>

        <Text style={styles.h1}>CHANGE PASSWORD </Text>
        <TextInput placeholder="Old password" style={styles.input} onChangeText={text => setOldPass(text)} />
        <TextInput secureTextEntry={true} placeholder="New password" style={styles.input} onChangeText={text => setNewPass(text)} />
        <Button content='Change' f={() => changePass()} />

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
  }
});
