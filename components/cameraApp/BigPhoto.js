import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import * as Sharing from 'expo-sharing';

import MyButton from './MyButton';

export default function BigPhoto({ route, navigation }) {

  const item = route.params.item;
  const width = Dimensions.get("window").width
  const height = Dimensions.get("window").height

  let sharePhoto = () => {
    Sharing.shareAsync(item.uri)
  }

  let deletePhoto = async () => {
    await MediaLibrary.deleteAssetsAsync([item.id]);
    route.params.refresh()
    navigation.navigate("galleryScreen")
  }

  return (
    <View >
      <Image
        style={{
          width: width * 0.9,
          height: height * 0.65,
          margin: width * 0.05,
          borderRadius: 20,
        }}

        source={{ uri: item.uri }}
      >
      </Image>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>{item.width} x  {item.height}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <MyButton styles={{ backgroundColor: "red" }} text={"SHARE"} f={() => sharePhoto()} />
        <MyButton styles={{ backgroundColor: "red" }} text={"DELETE"} f={() => deletePhoto()} />
      </View>
    </View>
  )

}

