import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.f}>
      <Text style={{ fontSize: 20 }}>{props.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    width: 130,
    padding: 10,
    margin: 30,
    borderRadius: 20
  },
});
