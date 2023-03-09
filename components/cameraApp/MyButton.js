import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function MyButton(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.f}>
      <Text style={{ fontSize: 20, color: 'white' }}>{props.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 20
  },
});
