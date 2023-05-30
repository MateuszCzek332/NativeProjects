import { Text, View } from 'react-native';
import React from 'react';

import RadioButton from './RadioButton'

export default function RadioGroup(props) {

  return (
    <View style={{ margin: 20 }}>
      <Text style={{ color: 'white', padding: 10, fontSize: 20 }} >{props.title}</Text>
      {
        props.tab.map((el, i) => {
          return <RadioButton key={i} selected={el == props.selected} text={el} f={() => { props.f(el) }} ></RadioButton>
        })
      }
    </View>
  )

}