import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { H1, TamaguiProvider, Theme } from 'tamagui';
import tamaguiConfig from './tamagui.config';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <NavigationContainer>
          <View>
            <H1>Hello World</H1>
          </View>
        </NavigationContainer>
      </Theme>
    </TamaguiProvider>
  );
}

export default App;
