import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function FotoItem(props) {
  return (
    <View>
      <ImageBackground
        style={{
          width: props.width,
          height: props.height,
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}

        source={{ uri: props.item.uri }}
      >
        {/* {
                        this.state.selected ? <Text style={{ fontSize: 50, color: 'red' }}>+</Text> : null
                    } */}
        {/* <Text style={styles.imageText}>{this.props.item.id}</Text> */}
      </ImageBackground>
    </View >
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  info: {
    flex: 6,
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 65,
    height: 65,
    margin: 10,
  },
  delIcon: {
    width: 40,
    height: 40,
  },
});
