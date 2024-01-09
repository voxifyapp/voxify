import { useNavigation } from '@react-navigation/native';
import { Button } from '@voxify/design_system/button';
import { YStack } from '@voxify/design_system/layout';
import { H3, Subtext } from '@voxify/design_system/typography';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

export const Results = () => {
  const navigation = useNavigation();
  return (
    <ActivityCardContainer alignContent="center" fullscreen>
      <YStack
        position="relative"
        width="100%"
        height="80%"
        flexDirection="column-reverse">
        <YStack mb="$5" style={styles.lottieViewContainer}>
          <LottieView
            autoPlay
            style={styles.lottieView}
            source={require('@voxify/assets/lottie/celebration.json')}
          />
        </YStack>

        <YStack paddingHorizontal="$4" alignItems="center">
          <H3 fontWeight="bold" textAlign="center">
            Lesson complete!
          </H3>
          <Subtext textAlign="center" mb="$4">
            You have on a path to speak better, keep it up!
          </Subtext>
          <Button w="100%" onPress={() => navigation.goBack()}>
            Done
          </Button>
        </YStack>
      </YStack>
    </ActivityCardContainer>
  );
};

const styles = StyleSheet.create({
  // Define the styles using StyleSheet.create
  lottieView: {
    width: '100%',
    height: '100%',
  },

  lottieViewContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
