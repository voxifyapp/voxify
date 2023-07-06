import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { Login } from './modules/auth/screens/Login';
import tamaguiConfig from './tamagui.config';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="dark">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Theme>
    </TamaguiProvider>
  );
}

export default App;
