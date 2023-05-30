import { Text, View, Image } from 'react-native';
import React from 'react';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import { Dimensions } from "react-native";

import MyButton from './MyButton';

export default function BigPhoto({ route, navigation }) {

  function refresh() { route.params.refresh() }
  const item = route.params.item;
  const width = Dimensions.get("window").width
  const height = Dimensions.get("window").height

  let sharePhoto = () => {
    Sharing.shareAsync(item.uri)
  }

  let deletePhoto = async () => {
    await MediaLibrary.deleteAssetsAsync([item.id]);
    refresh()
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

