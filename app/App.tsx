import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContextProvider, useAppContext } from '@voxify/context/AppContext';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import { LoginScreen } from '@voxify/modules/auth/screens/LoginScreen';
import { ProfileSetup } from '@voxify/modules/auth/screens/ProfileSetup/ProfileSetup';
import { HomeScreen } from '@voxify/modules/main/screens/HomeScreen';
import { LessonScreen } from '@voxify/modules/main/screens/LessonScreen/LessonScreen';
import tamaguiConfig from '@voxify/tamagui.config';
import React from 'react';
import Config from 'react-native-config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TamaguiProvider, Text, Theme } from 'tamagui';

GoogleSignin.configure({
  webClientId: Config.FIREBASE_WEBCLIENT_ID,
});

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const Routes = () => {
  const { user, profile, loading } = useAppContext();

  const currentProfileStep = useGetCurrentProfileStep(profile);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {user ? (
        <AppStack.Navigator>
          {currentProfileStep !== ProfileCompletionStep.COMPLETE ? (
            <AuthStack.Screen name="Profile Setup" component={ProfileSetup} />
          ) : (
            <>
              <AuthStack.Screen name="Home" component={HomeScreen} />
              <AuthStack.Screen
                name="Lesson"
                component={LessonScreen}
                options={({ route }) => ({ title: route.params.title })}
              />
            </>
          )}
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
