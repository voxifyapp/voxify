import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button, TamaguiProvider, Theme } from 'tamagui';
import tamaguiConfig from './tamagui.config';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <NavigationContainer>
          <View>
            <Button>Hello World</Button>
          </View>
        </NavigationContainer>
      </Theme>
    </TamaguiProvider>
  );
}

export default App;
