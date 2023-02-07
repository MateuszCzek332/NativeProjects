import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={props.f}>
        <Text style={{fontSize:30}}>{ props.content }</Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
