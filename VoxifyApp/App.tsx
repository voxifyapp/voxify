import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, TamaguiProvider, Theme } from 'tamagui';
import config from './tamagui.config';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Theme name="dark">
          <Button theme="pink">Hello World</Button>
        </Theme>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
