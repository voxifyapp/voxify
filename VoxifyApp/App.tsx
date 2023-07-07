import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { Login } from './modules/auth/screens/Login';
import tamaguiConfig from './tamagui.config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    //TODO Change this
    GoogleSignin.configure({
      webClientId:
        '44840556270-b1g144ntduo455mcpdskm3v15i30udu7.apps.googleusercontent.com',
    });
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
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
