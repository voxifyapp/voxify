import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "appContext";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TamaguiProvider,
  Theme,
  getTokenValue
} from "tamagui";

import tamaguiConfig from "tamagui.config";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEBCLIENT_ID,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();
function RootLayoutNav() {
  const backgroundColor = getTokenValue("$color.blue");
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={backgroundColor} />

      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <Theme name="base">
              <Slot />
            </Theme>
          </TamaguiProvider>
        </AppContextProvider>
      </QueryClientProvider>

    </SafeAreaView>
  );
}
