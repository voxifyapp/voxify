import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from '@voxify/design_system/button';
import { Screen } from '@voxify/design_system/layout';
import { H1, Paragraph } from '@voxify/design_system/typography';
import React from 'react';
import { Spacer } from 'tamagui';

export const LoginScreen = () => {
  return (
    <Screen justifyContent="center" alignItems="center">
      <H1 maxWidth="$size.24" fontWeight="bold" textAlign="center">
        Learn how to speak better
      </H1>
      <Paragraph mt="$space.3" textAlign="center">
        Master Everyday English with Practical Scenarios
      </Paragraph>
      <Spacer height="$4" />
      <Button
        alignSelf="stretch"
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
        Get started
      </Button>
      <Spacer height="$1" />
    </Screen>
  );
};
