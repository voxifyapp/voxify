import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  startFreeTrail,
} from '@voxify/api/auth/profile';
import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { Button } from '@voxify/design_system/button';
import { Screen, YStack } from '@voxify/design_system/layout';
import { H1, H2, Paragraph } from '@voxify/design_system/typography';
import React from 'react';

const NUMBER_OF_FREE_DAYS = 90;

export const StartFreeTrial = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (daysToAdd: number) => {
      return startFreeTrail(daysToAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_OR_CREATE_PROFILE_QUERY],
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const onStartFreeTrailClicked = async () => {
    // Make HTTP POST call to set Proficiency
    //TODO - Move the days to firebase config
    mutate(NUMBER_OF_FREE_DAYS);
  };

  return (
    <Screen alignItems="center" justifyContent="center">
      <YStack>
        <H1 fontSize="$12" mb="$2">
          ❤️
        </H1>
        <H2 fontWeight="bold">
          You get unlimited {NUMBER_OF_FREE_DAYS} days access for{'\n'}
          <H1
            textDecorationLine="line-through"
            fontWeight="bold"
            color="$color.blue5">
            ₹99
          </H1>
          <H1 fontWeight="bold" color="$color.blue5">
            {' '}
            free!
          </H1>
        </H2>
        <Paragraph fontSize="$6" mb="$6">
          You are one of our first users and we want to gift you free access for{' '}
          {NUMBER_OF_FREE_DAYS} days! Thank you for supporting us.
        </Paragraph>
        <LoadingWithErrorContainer isLoading={isPending} error={error}>
          <Button onPress={onStartFreeTrailClicked}>Get started!</Button>
        </LoadingWithErrorContainer>
      </YStack>
    </Screen>
  );
};
