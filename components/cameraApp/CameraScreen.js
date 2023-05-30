import { Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import { Animated } from "react-native";

import CircleButton from './CircleButton';
import RadioGroup from './RadioGroup';

export default function CameraScreen({ route, navigation }) {

  function refresh() { route.params.refresh() }
  let camera;
  let [hasCameraPermission, setHasCameraPermission] = useState(null);
  let [type, setType] = useState(Camera.Constants.Type.back);
  let [animation, setanimation] = useState({
    isHidden: true,
    pos: new Animated.Value(-300),
  })
  let [ratio, setRatio] = useState("4:3")
  let [ratios, setRatios] = useState(["4:3", "16:9"])
  let [wb, setWb] = useState(0)
  let [wbArr, setWbArr] = useState([])
  let [fm, setFm] = useState(0)
  let [fmArr, setFmArr] = useState([])
  let [sizeArr, setSizeArr] = useState([])
  let [size, setSize] = useState('')


  let getSize = async (ratio) => {
    if (camera) {
      sizeArr = await camera.getAvailablePictureSizesAsync(ratio)
      setSizeArr(sizeArr)
      size = sizeArr[sizeArr.length - 1]
      setSize(size)
    }
  }

  let onCameraReady = async () => {
    wbArr = Object.keys(Camera.Constants.WhiteBalance)
    setWbArr(wbArr)
    fmArr = Object.keys(Camera.Constants.FlashMode)
    setFmArr(fmArr)
    getSize(ratio)
  }

  let toggle = () => {

    let toPos;
    animation.isHidden ? toPos = 0 : toPos = -300;

    //animacja

    Animated.spring(
      animation.pos,
      {
        toValue: toPos,
        velocity: 1,
        tension: 0,
        friction: 10,
        useNativeDriver: true
      }
    ).start();

    animation.isHidden = !animation.isHidden
  }

  useEffect(() => {
    getPermission()
    getSize()
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
    await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
    refresh()
    //alert(JSON.stringify(asset, null, 4))
  }

  return (
    <View style={{ flex: 1 }}>
      {
        hasCameraPermission == null || !hasCameraPermission ?
          <Text>brak dostępu do kamery</Text>
          :
          <Camera
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
            ref={ref => {
              camera = ref;
            }}
            type={type}
            onCameraReady={() => { onCameraReady() }}
            ratio={ratio}
            whiteBalance={wb}
            pictureSize={size}
            flashMode={fm}
          >
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  backgroundColor: "black",
                  opacity: 0.5,
                  paddingTop: 100,
                  height: Dimensions.get("window").height,
                  width: 240
                },
                {
                  transform: [
                    { translateX: animation.pos }
                  ]
                }]} >
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 25,
              }}>SETTINGS</Text>
              <ScrollView>
                <RadioGroup title="Ratio" selected={ratio} tab={ratios} f={(x => { setRatio(x); getSize(x) })} />
                <RadioGroup title="Size" selected={size} tab={sizeArr} f={(x => setSize(x))} />
                <RadioGroup title="White Balance" selected={wbArr[wb]} tab={wbArr} f={(x => setWb(wbArr.indexOf(x)))} />
                <RadioGroup title="Flash Mode" selected={fmArr[fm]} tab={fmArr} f={(x => setFm(fmArr.indexOf(x)))} />
              </ScrollView>
            </Animated.View>
            <View style={{ flexDirection: 'row', }} >
              <CircleButton text="Flip" f={() => toggleCameraType()} width={70} height={70} />
              <CircleButton text="Make" f={() => makePhoto()} width={90} height={90} />
              <CircleButton text="Sett" f={() => toggle()} width={70} height={70} />
            </View>
          </Camera>
      }
    </View>
  );

}