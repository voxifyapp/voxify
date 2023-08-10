import { useAppContext } from '@voxify/context/AppContext';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import React from 'react';
import { YStack } from 'tamagui';
import { SelectProficiency } from '@voxify/modules/auth/screens/ProfileSetup/components/SelectProficiency';
import { StartFreeTrial } from '@voxify/modules/auth/screens/ProfileSetup/components/StartFreeTrial';

export const ProfileSetup = () => {
  const { profile } = useAppContext();
  const currentProfileStep = useGetCurrentProfileStep(
    profile,
  ) as ProfileCompletionStep;
  return (
    <YStack>
      {currentProfileStep === ProfileCompletionStep.SELECT_PROFICIENCY ? (
        <SelectProficiency />
      ) : currentProfileStep === ProfileCompletionStep.SELECT_MEMBERSHIP ? (
        <StartFreeTrial />
      ) : null}
    </YStack>
  );
};
