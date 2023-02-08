import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Header from './Header';
import Button from './Button';

export default function LoginScreen({ navigation }) {


  // let [val, setVal] = useState('User APP');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Image
            source={require('./userIcon.png')}
            style={styles.icon} />
          <TextInput placeholder="Username" style={styles.input} />
          <TextInput placeholder="Password" style={styles.input} />
          <Button content='Zaloguj się' />
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
    width: 300,
    height: 300,
    alignSelf: 'center',
    margin: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 150,
    alignSelf: 'center',
    height: 50
  }
});
