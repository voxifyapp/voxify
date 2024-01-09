import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { useAppContext } from '@voxify/context/AppContext';
import { YStack } from '@voxify/design_system/layout';
import { H3 } from '@voxify/design_system/typography';
import { useEditProfileMutation } from '@voxify/modules/auth/screens/ProfileSetup/hooks/useEditProfileMutation';
import React, { useEffect } from 'react';
import { Spinner } from 'tamagui';

export const BasicInformation = () => {
  const { profile, user } = useAppContext();

  const editProfileMutation = useEditProfileMutation();

  useEffect(() => {
    editProfileMutation.mutate({
      fullName: profile?.fullName ? profile.fullName : user?.displayName,
      email: profile?.email ? profile.email : user?.email,
    });
  }, [profile, editProfileMutation, user?.displayName, user?.email]);

  return (
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
      }
    />
  );
};
