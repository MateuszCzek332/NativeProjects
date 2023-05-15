import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as MediaLibrary from "expo-media-library";

import MyButton from './MyButton';
import FotoItem from './FotoItem';


export default function GalleryScreen({ navigation }) {

  let [tab, setTab] = useState([]);

  useEffect(() => {

    async function getTab() {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('brak uprawnień do czytania image-ów z galerii')
      }

      const album = await MediaLibrary.getAlbumAsync("DCIM")
      const photos = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 20,
        mediaType: ['photo']
      })

      setTab(photos.assets)
    }
    getTab()
  }, []);

  return (
    <View>
      <MyButton styles={{ backgroundColor: "red" }} text={"camera"} f={() => navigation.navigate("cameraScreen")} />
      <ScrollView>
        {
          !tab ?
            null
            :
            tab.map((el, i) => {
              return <FotoItem key={i} item={el} />
            })
        }
      </ScrollView>
    </View>

    // <View>
    //   <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    //     <MyButton content="Add Current Location" f={() => getPosition()} />
    //     <MyButton content="Delete All" f={() => delAll()} />
    //   </View>
    //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    //     <MyButton content="Go to Map" f={() => goToMap()} />
    //     <Switch
    //       trackColor={{ false: '#767577', true: '#81b0ff' }}
    //       thumbColor={isEnabledAll ? '#f5dd4b' : '#f4f3f4'}
    //       ios_backgroundColor="#3e3e3e"
    //       onValueChange={() => toogleAll()}
    //       value={isEnabledAll}
    //     />
    //   </View>
    //   <Text>LISTA </Text>
    //   {
    //     !tab ?
    //       null
    //       :
    //       <FlatList
    //         data={tab}
    //         renderItem={({ item, index }) => <ListItem item={item} toogle={() => toogle(index)} del={() => delPosition(item.timestamp)} />}
    //         keyExtractor={item => item.timestamp}
    //       />
    //   }

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
