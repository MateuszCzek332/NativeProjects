import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./components/userApp/MainScreen"
import LoginScreen from "./components/userApp/LoginScreen"
import RegisterScreen from "./components/userApp/RegisterScreen"
import ProfilScreen from "./components/userApp/ProfilScreen"
import ProfilEditScreen from "./components/userApp/ProfilEditScreen"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="mainScreen" component={MainScreen} options={headerStyles.main} />
        <Stack.Screen name="loginScreen" component={LoginScreen} options={headerStyles.other} />
        <Stack.Screen name="registerScreen" component={RegisterScreen} options={headerStyles.other} />
        <Stack.Screen name="profilScreen" component={ProfilScreen} options={headerStyles.other} />
        <Stack.Screen name="profilEditScreen" component={ProfilEditScreen} options={headerStyles.other} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyles = {
  main: {
    headerShown: false,
  },
  other: {
    title: 'USER APP',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 30,
    },
  }
}

export default App;
