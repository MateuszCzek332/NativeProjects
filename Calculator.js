import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from './components/calculator/Button';

export default function App() {

  const tab = [
    [{val:'C',
    use:'c'},
    {val:'<',
    use:'b'},
    {val:'%',
    use:'p'},
    {val:'/',
    use:'o'}],
    [
      {val:'7',
      use:'w'},
    {val:'8',
    use:'w'},
     {val:'9',
     use:'w'},
     {val:'*',
     use:'o'}],
    [{val:'4',
    use:'w'},
    {val:'5',
    use:'w'},
     {val:'6',
     use:'w'},
     {val:'-',
     use:'o'}],
    [{val:'1',
    use:'w'},
    {val:'2',
    use:'w'},
     {val:'3',
     use:'w'},
     {val:'+',
     use:'o'}],
    [{val:'X'},
    {val:'0',
    use:'w'},
     {val:'.',
     use:'d'},
     {val:'=',
     use:'e'}],
  ]

  const operators = ['+', '-', '/', '*']

  let [val, setVal] = useState('');

  let write = (c) => {
    setVal(val += c)
  }

  let clear = () => {
    setVal('')
  }
  
  let back = () => {
    setVal(val.slice(0, val.length -1))
  }

  let getPercentage = () => {
    if(val == '')
      return
    setVal(eval(val)/100  )
  }

  let equal = () => {
    if(!operators.includes(val.charAt(val.length-1)))
      setVal( eval(val).toString())
  }

  let addOperator = (c) => {

    if(val == '')
      return

    if(operators.includes(val[val.length-1])){
      let w = val
      w = w.slice(0, w.length -1)
      w+=c
      setVal(w)
      return
    }
    setVal(val += c)
  }

  let addDot = (c) => {

    let i = val.length-1

    while(i>=0){
      if(operators.includes(val[i]))
        break;
      if(val[i] == c)
        return;
      i--
    }

    setVal(val += c)
  }

  return (
    <View style={styles.container}>

      <View style={{
        flex:2,
        justifyContent:'center',
        backgroundColor: 'blue'
        }}>
          <Text style={{
            textAlign:'right',
            fontSize:60,
            paddingRight:20,
          }}>
          {val}
          </Text>
      </View>
      <View style={{
        flex:4,

      }}>
        {
          tab.map((el, i) => {
            return <View style={{
              flex:1,
              flexDirection:'row'
            }}>
              {
                el.map((elm, i) => {
                  switch(elm.use){
                    case 'w':
                      return <Button key={i} content={elm.val} f={ () => write(elm.val)}/>
                    case 'c':
                      return <Button key={i} content={elm.val} f={ () => clear()}/>
                    case 'b':
                      return <Button key={i} content={elm.val} f={ () => back()}/>
                    case 'p':
                      return <Button key={i} content={elm.val} f={ () => getPercentage()}/>
                    case 'e':
                      return <Button key={i} content={elm.val} f={ () => equal()}/>
                    case 'o':
                      return <Button key={i} content={elm.val} f={ () => addOperator(elm.val)}/>
                    case 'd':
                      return <Button key={i} content={elm.val} f={ () => addDot(elm.val)}/>
                    default:
                      return <Button key={i} content={elm.val} f={ () => {}}/>

                  }
                })
              }

            </View>
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
