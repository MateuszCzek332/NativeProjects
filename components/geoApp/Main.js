import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from "expo-font";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      fontloaded: false,
    }

    this.componentDidMount()
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      'myfont': require('./nazwafonta.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    this.setState({ fontloaded: true })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.fontloaded
            ?
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'blue' }}>
              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate("listScreen") }}
              ><Text style={{
                fontFamily: 'myfont',
                fontSize: 80,
                textAlign: 'center',
                color: 'white'

              }}>Geo App</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 40,
                  textAlign: 'center',
                  color: 'white'

                }}>Find and save your position by using Google Maps</Text>
            </View>
            :
            null
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});