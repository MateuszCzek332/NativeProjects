import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./components/geoApp/Main"
import ListScreen from "./components/geoApp/List"
import MapScreen from "./components/geoApp/Map"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="mainScreen" component={MainScreen} options={headerStyles.main} />
        <Stack.Screen name="listScreen" component={ListScreen} options={headerStyles.other} />
        <Stack.Screen name="mapScreen" component={MapScreen} options={headerStyles.other} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyles = {
  main: {
    headerShown: false,
  },
  other: {
    title: 'GEO APP',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 30,
    },
  }
}

export default App;
