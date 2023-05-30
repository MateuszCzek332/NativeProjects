import { Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import { Animated } from "react-native";

import CircleButton from './CircleButton';

export default function CameraScreen({ route, navigation }) {

  function refresh() { route.params.refresh() }
  let camera;
  let [hasCameraPermission, setHasCameraPermission] = useState(null);
  let [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    getPermission()
  }, []);

  let getPermission = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status == 'granted')
  }

  let toggleCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  }

  let makePhoto = async () => {

    let foto = await camera.takePictureAsync();
    let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
    refresh()
    //alert(JSON.stringify(asset, null, 4))
  }

  return (
    <View style={{ flex: 1 }}>
      {
        hasCameraPermission == null || !hasCameraPermission ?
          <Text>brak dostępu do kamery</Text>
          :
          <Camera type={type} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            ref={ref => {
              camera = ref; // Uwaga: referencja do kamery używana później
            }}
          >
            <View style={{ flexDirection: 'row', }} >
              <CircleButton text="Sett" f={() => toggleCameraType()} width={70} height={70} />
              <CircleButton text="Make" f={() => makePhoto()} width={90} height={90} />
              <CircleButton text="Flip" f={() => toggleCameraType()} width={70} height={70} />
            </View>
          </Camera>
      }
    </View>
  );
}
