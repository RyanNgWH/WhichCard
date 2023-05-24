import {StyleSheet, Text, View} from 'react-native';

function App() {
  return (
    <View style={styles.hello}>
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hello: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
