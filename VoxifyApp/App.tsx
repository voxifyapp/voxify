import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <View>
        <Text>Hello World!</Text>
      </View>
    </NavigationContainer>
  );
}

export default App;
