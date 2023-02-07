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
    setVal(eval(val)/100  )
  }

  let equal = () => {
    setVal(eval(val))
  }

  let addOperator = (c) => {
    setVal(val += c)
  }

  let addDot = (c) => {
    setVal(val += c)
  }

  return (
    <View style={styles.container}>

      <View style={{
        flex:2,
        justifyContent:'center'
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
        backgroundColor:'blue',
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
                      return <Button  content={elm.val} f={ () => write(elm.val)}/>
                    case 'c':
                      return <Button  content={elm.val} f={ () => clear()}/>
                    case 'b':
                      return <Button  content={elm.val} f={ () => back()}/>
                    case 'p':
                      return <Button  content={elm.val} f={ () => getPercentage()}/>
                    case 'e':
                      return <Button  content={elm.val} f={ () => equal()}/>
                    case 'o':
                      return <Button  content={elm.val} f={ () => addOperator(elm.val)}/>
                    case 'd':
                      return <Button  content={elm.val} f={ () => addDot(elm.val)}/>
                    default:
                      return <Button  content={elm.val} f={ () => {}}/>

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
    backgroundColor: 'blue',
  },
});
