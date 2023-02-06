import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/calculator/Button';

export default function App() {

  const tab = [
    ['C','<', '%', '/'],
    ['7','8', '9', '*'],
    ['4','5', '6', '-'],
    ['1','2', '3', '+'],
    ['X','0', '.', '='],
  ]

  

  return (
    <View style={styles.container}>

      <View style={{
        flex:2,
        justifyContent:'center'
        }}>
          <Text style={{
            backgroundColor:'red',
            textAlign:'right',
            fontSize:60,
            paddingRight:20,
          }}>
          Calculator
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
                  return <Button  content={elm}/>
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
