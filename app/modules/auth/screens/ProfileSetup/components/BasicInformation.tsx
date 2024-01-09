import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  editProfile,
} from '@voxify/api/auth/profile';
import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { useAppContext } from '@voxify/context/AppContext';
import { YStack } from '@voxify/design_system/layout';
import { H3 } from '@voxify/design_system/typography';
import React, { useEffect } from 'react';
import { Spinner } from 'tamagui';

export const BasicInformation = () => {
  const { profile, user } = useAppContext();
  const queryClient = useQueryClient();

  const useEditProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_OR_CREATE_PROFILE_QUERY],
      });
    },
  });

  useEffect(() => {
    useEditProfileMutation.mutate({
      fullName: profile?.fullName ? profile.fullName : user?.displayName,
      email: profile?.email ? profile.email : user?.email,
    });
  }, [profile, useEditProfileMutation, user?.displayName, user?.email]);

  return (
    <LoadingWithErrorContainer
      isLoading={true}
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
