import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContextProvider, useAppContext } from '@voxify/context/AppContext';
import { HomeScreen } from '@voxify/modules/auth/screens/HomeScreen';
import { LoginScreen } from '@voxify/modules/auth/screens/LoginScreen';
import tamaguiConfig from '@voxify/tamagui.config';
import React from 'react';
import Config from 'react-native-config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TamaguiProvider, Theme } from 'tamagui';

GoogleSignin.configure({
  webClientId: Config.FIREBASE_WEBCLIENT_ID,
});

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const Routes = () => {
  const { user } = useAppContext();

  return (
    <NavigationContainer>
      {user ? (
        <AppStack.Navigator>
          <AuthStack.Screen name="Home" component={HomeScreen} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

function App(): JSX.Element {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Theme name="light">
            <Routes />
          </Theme>
        </AppContextProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

export default App;
