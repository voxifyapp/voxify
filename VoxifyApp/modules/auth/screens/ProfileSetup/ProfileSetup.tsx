import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  setProficiency,
} from '@voxify/api/auth/profile';
import { useAppContext } from '@voxify/context/AppContext';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import { ProficiencyLevel } from '@voxify/types/auth/profile';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, H1, View, YStack } from 'tamagui';

export const ProfileSetup = () => {
  const { profile } = useAppContext();
  const queryClient = useQueryClient();
  const currentProfileStep = useGetCurrentProfileStep(
    profile,
  ) as ProfileCompletionStep;

  const { mutate } = useMutation(
    (proficiency: ProficiencyLevel) => {
      return setProficiency(proficiency);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [FETCH_OR_CREATE_PROFILE_QUERY],
        });
      },
    },
  );

  function selectProficiencyHandler(proficiency: ProficiencyLevel) {
    // Make HTTP POST call to set Proficiency
    mutate(proficiency);
  }

  return (
    <YStack>
      {currentProfileStep === ProfileCompletionStep.SELECT_PROFICIENCY ? (
        <View>
          <Button
            onPress={selectProficiencyHandler.bind(
              this,
              ProficiencyLevel.BEGINNER,
            )}
            theme={'green'}>
            Beginner
          </Button>
          <Button
            onPress={selectProficiencyHandler.bind(
              this,
              ProficiencyLevel.MEDIUM,
            )}
            theme={'green'}>
            Medium
          </Button>
          <Button
            onPress={selectProficiencyHandler.bind(
              this,
              ProficiencyLevel.ADVANCED,
            )}
            theme={'green'}>
            Advanced
          </Button>
        </View>
      ) : currentProfileStep === ProfileCompletionStep.SELECT_MEMBERSHIP ? (
        <H1>SELECT_MEMBERSHIP!</H1>
      ) : null}
    </YStack>
  );
};
