import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";

import MyButton from './MyButton';
import FotoItem from './FotoItem';

export default function GalleryScreen({ navigation }) {

  let [tab, setTab] = useState([]);
  let [col, setCol] = useState(5);
  let [photoWidth, setPhotoWidth] = useState(Dimensions.get("window").width / col);
  let [photoHeight, setphotoHeight] = useState(col == 1 ? 200 : Dimensions.get("window").width / col);

  useEffect(() => {
    getTab()
  }, []);

  async function getTab() {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('brak uprawnień do czytania image-ów z galerii')
    }
    else {
      refreshGallery()
    }

  }

  let refreshGallery = async () => {
    const album = await MediaLibrary.getAlbumAsync("DCIM")
    const photos = await MediaLibrary.getAssetsAsync({
      album: album,
      first: 20,
      mediaType: ['photo']
    })
    setTab(photos.assets)
  }

  let changeGrid = () => {
    let ncol = col == 1 ? 5 : 1
    setCol(ncol)
    setPhotoWidth(Dimensions.get("window").width / ncol)
    setphotoHeight(col != 1 ? 190 : Dimensions.get("window").width / ncol)


  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <MyButton styles={{ backgroundColor: "red" }} text={"CAMERA"} f={() => navigation.navigate("cameraScreen")} />
        <MyButton styles={{ backgroundColor: "red" }} text={"LAYOUT"} f={() => {
          changeGrid()
        }} />
      </View>
      <View>
        {
          !tab ?
            null
            :
            <FlatList
              numColumns={col}
              key={col}
              data={tab}
              renderItem={({ item }) =>
                <FotoItem item={item} width={photoWidth} height={photoHeight} ></FotoItem>
              }

            />
          // tab.map((el, i) => {
          //   return <FotoItem key={i} item={el} />
          // })
        }
      </View>
      {/* <FlatList
          numColumns={this.state.numColumns}
          key={this.state.numColumns}
          data={this.state.items}

          renderItem={({ item }) =>
            <FotoItem addDel={(id) => { this.addToDeleteArr(id) }} remDel={(id) => { this.removeFromDeleteArr(id) }} refresh={() => { this.refreshPhotosInGallery() }} photoWidth={this.state.photoWidth} photoHeight={this.state.photoHeight} item={item} navigation={this.props.navigation}></FotoItem>
          }

        /> */}

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
