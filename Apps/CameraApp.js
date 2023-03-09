import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "../components/cameraApp/MainScreen"
import GalleryScreen from "../components/cameraApp/GalleryScreen"
import CameraScreen from "../components/cameraApp/CameraScreen"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="mainScreen" component={MainScreen} options={headerStyles.main} />
        <Stack.Screen name="galleryScreen" component={GalleryScreen} options={headerStyles.other} />
        <Stack.Screen name="cameraScreen" component={CameraScreen} options={headerStyles.other} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyles = {
  main: {
    headerShown: false,
  },
  other: {
    title: 'CAMERA APP',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 30,
    },
  }
}

export default App;
