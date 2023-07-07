import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { HomeScreen } from '@voxify/modules/auth/screens/HomeScreen';
import { LoginScreen } from '@voxify/modules/auth/screens/LoginScreen';
import Config from 'react-native-config';
import { useAppContext, AppContextProvider } from '@voxify/context/AppContext';
import tamaguiConfig from '@voxify/tamagui.config';

GoogleSignin.configure({
  webClientId: Config.FIREBASE_WEBCLIENT_ID,
});
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
