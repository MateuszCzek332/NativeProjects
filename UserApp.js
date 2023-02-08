import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./components/userApp/LoginScreen"
import RegisterScreen from "./components/userApp/RegisterScreen"
import ProfilScreen from "./components/userApp/ProfilScreen"

const Stack = createNativeStackNavigator();

function App() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="loginScreen" component={LoginScreen}  />
                <Stack.Screen name="registerScreen" component={RegisterScreen}  />
                <Stack.Screen name="profilScreen" component={ProfilScreen}  />
            </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
