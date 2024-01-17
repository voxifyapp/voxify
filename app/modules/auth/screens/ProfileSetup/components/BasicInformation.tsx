import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { useAppContext } from '@voxify/context/AppContext';
import { Button } from '@voxify/design_system/button';
import { Screen, YStack } from '@voxify/design_system/layout';
import { H1, H2, H3 } from '@voxify/design_system/typography';
import { firebaseAnalyticsBasicInformationSubmitted } from '@voxify/modules/auth/screens/ProfileSetup/components/analytics';
import { useEditProfileMutation } from '@voxify/modules/auth/screens/ProfileSetup/hooks/useEditProfileMutation';
import React from 'react';
import { Input, Spinner } from 'tamagui';

export const BasicInformation = () => {
  const { user } = useAppContext();
  const [fullName, setFullName] = React.useState<string>(
    user?.displayName || '',
  );

  const editProfileMutation = useEditProfileMutation();

  const onNextClicked = () => {
    editProfileMutation.mutate({
      fullName,
      email: user?.email || '',
    });
    firebaseAnalyticsBasicInformationSubmitted();
  };

  return (
    <Screen>
      <LoadingWithErrorContainer
        isLoading={editProfileMutation.isPending}
        error={editProfileMutation.error}
        loadingView={
          <YStack
            fullscreen
            alignItems="center"
            justifyContent="center"
            space="$4">
            <Spinner color="$color.blue5" size="large" />
            <H3 textAlign="center" color="$color.blue5">
              Setting up your profile...
            </H3>
          </YStack>
        }>
        <YStack height="100%" justifyContent="center">
          <H1 fontSize="$12" mb="$2">
            👋
          </H1>
          <H2 mb="$4" fontWeight="bold">
            Hi there! What is your full name?
          </H2>
          <Input
            size="$6"
            mb="$4"
            fontSize="$8"
            value={fullName}
            onChangeText={t => setFullName(t)}
            fontWeight="bold"
            placeholder={'Enter your full name'}
          />
          <Button
            onPress={onNextClicked}
            disabled={fullName.length < 3 || editProfileMutation.isPending}
            alignSelf="flex-end">
            NEXT
          </Button>
        </YStack>
      </LoadingWithErrorContainer>
    </Screen>
  );
};
