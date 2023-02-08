import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      backgroundColor: 'green'
      }}>
        <Text style={{
          textAlign:'center',
          fontSize:22,
        }}>
        USER APP
        </Text>
    </View>
  );
}

