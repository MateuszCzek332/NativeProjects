import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function FotoItem(props) {

  return (
    <TouchableOpacity style={{
      backgroundColor: 'red',
      width: props.width,
      height: props.height,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      margin: 14,
    }}
      onPress={props.f}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  )

}