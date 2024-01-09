import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContextProvider, useAppContext } from '@voxify/context/AppContext';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import { LoginScreen } from '@voxify/modules/auth/screens/LoginScreen';
import { ProfileSetup } from '@voxify/modules/auth/screens/ProfileSetup/ProfileSetup';
import { HomeScreen } from '@voxify/modules/main/screens/HomeScreen/HomeScreen';
import { LessonScreen } from '@voxify/modules/main/screens/LessonScreen/LessonScreen';
import tamaguiConfig from '@voxify/tamagui.config';
import React from 'react';
import Config from 'react-native-config';

import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { Screen } from '@voxify/design_system/layout';
import { TamaguiProvider, Theme } from 'tamagui';

GoogleSignin.configure({
  webClientId: Config.FIREBASE_WEBCLIENT_ID,
});

export type AppStackParamList = {
  Home: undefined;
  Lesson: { lessonId: string; unitId: string };
};

export type AppStackNavigationProp = NavigationProp<AppStackParamList>;

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const queryClient = new QueryClient();

export const Routes = () => {
  const { user, profile, loading } = useAppContext();

  const currentProfileStep = useGetCurrentProfileStep(profile);

  if (loading) {
    return (
      <Screen>
        <LoadingWithErrorContainer isLoading={loading}>
          <></>
        </LoadingWithErrorContainer>
      </Screen>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {currentProfileStep !== ProfileCompletionStep.COMPLETE ? (
            <AuthStack.Screen name="Profile Setup" component={ProfileSetup} />
          ) : (
            <>
              <AppStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <AppStack.Screen
                name="Lesson"
                component={LessonScreen}
                options={{ headerShown: false }}
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
          <Theme name="base">
            <Routes />
          </Theme>
        </AppContextProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

export default App;
