import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function MyButton(props) {
  let s = props.styles
  return (
    <TouchableOpacity
      style={{
        backgroundColor: s.backgroundColor,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 18
      }}
      onPress={props.f}>
      <Text style={{ fontSize: 20, color: 'white' }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
