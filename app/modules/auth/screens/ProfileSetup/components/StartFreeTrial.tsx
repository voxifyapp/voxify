import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  startFreeTrail,
} from '@voxify/api/auth/profile';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, View, YStack } from 'tamagui';

export const StartFreeTrial = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (daysToAdd: number) => {
      return startFreeTrail(daysToAdd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [FETCH_OR_CREATE_PROFILE_QUERY],
        });
      },
      onError(err) {
        console.log(err);
      },
    },
  );

  const onStartFreeTrailClicked = async () => {
    // Make HTTP POST call to set Proficiency
    //TODO - Move the days to firebase config
    mutate(30);
  };

  return (
    <YStack>
      <View>
        <Button onPress={onStartFreeTrailClicked} theme={'green'}>
          Get started!
        </Button>
      </View>
    </YStack>
  );
};
