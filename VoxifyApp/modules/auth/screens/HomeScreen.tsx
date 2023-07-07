import React from 'react';
import { H1, YStack } from 'tamagui';
import Config from 'react-native-config';

export const HomeScreen = () => {
  return (
    <YStack>
      <H1>{Config.TEST}</H1>
    </YStack>
  );
};
