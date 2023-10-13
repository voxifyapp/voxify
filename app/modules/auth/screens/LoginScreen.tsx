import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Screen } from '@voxify/design_system/layout';
import { H1 } from '@voxify/design_system/typography';
import React from 'react';
import { Button, Stack } from 'tamagui';

export const LoginScreen = () => {
  return (
    <Screen>
      <H1 fontWeight="bold" textAlign="center">
        Learn how to speak better by talking!
      </H1>
      <Stack flex={1} />
      <Button
        onPress={async () => {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          });

          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          try {
            await auth().signInWithCredential(googleCredential);
          } catch (err) {
            console.error(err);
          }
        }}>
        Login with Google
      </Button>
    </Screen>
  );
};
