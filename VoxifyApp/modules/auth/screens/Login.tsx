import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button, H1, Stack, YStack } from 'tamagui';

export const Login = () => {
  return (
    <YStack>
      <H1>Hello World 2!</H1>
      <Stack flex={1} />
      <Button
        onPress={async () => {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();

          // Create a Google credential with the toaken
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          try {
            await auth().signInWithCredential(googleCredential);
          } catch (err) {
            console.error(err);
          }
        }}
        theme="green">
        Login with Google
      </Button>
    </YStack>
  );
};
