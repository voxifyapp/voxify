import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello World!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
