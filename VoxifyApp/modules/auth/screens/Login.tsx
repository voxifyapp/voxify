import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Button, H1, YStack } from 'tamagui';

export const Login = () => {
  useEffect(() => {}, []);

  return (
    <YStack>
      <H1>Hello World 2!</H1>
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo);
        }}
        theme="green">
        Hello World
      </Button>
    </YStack>
  );
};
