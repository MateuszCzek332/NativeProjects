import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';

export default function ProfilScreen({ route, navigation }) {

  let { login, pass, acces } = route.params;
  let [password, setPassword] = useState(pass);
  let [oldPass, setOldPass] = useState('');
  let [newPass, setNewPass] = useState('');
  let [adminPanel, setpanel] = useState(false);
  let [tab, setTab] = useState([]);

  useEffect(() => {
    async function getTab() {
      let keys = await AsyncStorage.getAllKeys();
      let stores = await AsyncStorage.multiGet(keys);
      let maps = stores.map((result, i, store) => {
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        return { login: key, pass: value.pass, acces: value.acces }
      });
      // console.log(maps)
      setTab(maps)
    }
    getTab()
  });


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
      {acces == 'admin' ?

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button content='Info' f={() => setpanel(false)} />
          <Button content='AdminPanel' f={() => setpanel(true)} />
        </View>
        :
        null
      }
      {!adminPanel ?
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
        :
        <ScrollView style={{
          flexGrow: 6
        }}>
          <View style={styles.row}  >
            <Text style={styles.firstCell} >LP</Text>
            <Text style={styles.cell} >LOGIN</Text>
            <Text style={styles.cell}>PASS</Text>
            <Text style={styles.cell}>ACCES</Text>
            <TouchableOpacity style={styles.cell}>
              <Text style={{ alignSelf: 'center' }}>EDIT BTN</Text>
            </TouchableOpacity>
          </View>

          {
            tab.map((el, i) => {
              return <View key={i} style={styles.row}  >
                <Text style={styles.firstCell} >{i + 1}</Text>
                <Text style={styles.cell} >{el.login}</Text>
                <Text style={styles.cell}>{el.pass}</Text>
                <Text style={styles.cell}>{el.acces}</Text>
                <TouchableOpacity style={styles.cell}
                  onPress={() => navigation.navigate('profilEditScreen', el)}>
                  <Text style={{ textAlign: 'center' }}>EDIT</Text>
                </TouchableOpacity>
              </View>
            })
          }
        </ScrollView>
      }
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
