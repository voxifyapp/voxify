import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ArrowBigRight } from '@tamagui/lucide-icons';
import { useMutation } from '@tanstack/react-query';
import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { Button } from '@voxify/design_system/button';
import { Screen, XStack, YStack } from '@voxify/design_system/layout';
import { H2, Paragraph, SizableText } from '@voxify/design_system/typography';
import { firebaseAnalyticsAfterLogin } from '@voxify/modules/auth/screens/ProfileSetup/analytics';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Spacer } from 'tamagui';

export const LoginScreen = () => {
  const loginMutation = useMutation({
    mutationFn: async () => {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const user = await auth().signInWithCredential(googleCredential);
      firebaseAnalyticsAfterLogin({
        isNewUser: !!user.additionalUserInfo?.isNewUser,
        uid: user.user.uid,
      });
    },
  });

  return (
    <Screen noPadding>
      <YStack flex={1}>
        <LottieView
          autoPlay
          style={styles.lottieAnimation}
          source={require('@voxify/assets/lottie/communication.json')}
        />
      </YStack>
      <YStack backgroundColor="white" p="$6" elevation="$6">
        <H2 maxWidth="$size.24" fontWeight="bold">
          Learn how to speak better
        </H2>
        <Paragraph mt="$space.1">
          Master everyday English with real world scenarios
        </Paragraph>
        <Spacer size="$6" />
        <LoadingWithErrorContainer
          isLoading={loginMutation.isPending}
          error={loginMutation.error}>
          <Button
            size="$5"
            alignSelf="flex-end"
            onPress={() => {
              loginMutation.mutate();
            }}>
            <XStack space="$2" alignItems="center">
              <SizableText fontWeight="bold" col="white">
                Start learning now
              </SizableText>

              <ArrowBigRight scale={1.2} />
            </XStack>
          </Button>
        </LoadingWithErrorContainer>

        <Spacer height="$1" />
      </YStack>
    </Screen>
  );
};

const styles = StyleSheet.create({
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
});
