import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { LoginScreen } from './modules/auth/screens/LoginScreen';
import {
  AppContextProvider,
  useAppContext,
} from './modules/context/AppContext';
import tamaguiConfig from './tamagui.config';
import { HomeScreen } from './modules/auth/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  const { user } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
      <AppContextProvider>
        <Theme name="light">
          <Routes />
        </Theme>
      </AppContextProvider>
    </TamaguiProvider>
  );
}

export default App;
