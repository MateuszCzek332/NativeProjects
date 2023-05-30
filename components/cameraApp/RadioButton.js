import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function RadioButton(props) {

  return (<View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
    <View style={{ width: 40, height: 40 }}>
      <TouchableOpacity onPress={() => props.f()} >
        <View style={{ borderColor: 'red', borderWidth: 2, borderStyle: 'solid', backgroundColor: 'grey', borderRadius: 100, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ display: props.selected ? 'flex' : 'none', backgroundColor: 'red', borderRadius: 100, width: 25, height: 25, justifyContent: 'center' }} />
        </View>
      </TouchableOpacity>
    </View>
    <Text style={{ color: props.selected ? 'red' : 'white', justifyContent: 'center', fontSize: 18, paddingLeft: 20 }}>{props.text}</Text>
  </View>
  )

}