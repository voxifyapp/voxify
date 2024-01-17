import { useAppContext } from '@voxify/context/AppContext';
import { Screen } from '@voxify/design_system/layout';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import { BasicInformation } from '@voxify/modules/auth/screens/ProfileSetup/components/BasicInformation';
import { SelectProficiency } from '@voxify/modules/auth/screens/ProfileSetup/components/SelectProficiency';
import { StartFreeTrial } from '@voxify/modules/auth/screens/ProfileSetup/components/StartFreeTrial';
import React from 'react';

export const ProfileSetup = () => {
  const { profile } = useAppContext();
  const currentProfileStep = useGetCurrentProfileStep(
    profile,
  ) as ProfileCompletionStep;
  return (
    <Screen>
      {currentProfileStep === ProfileCompletionStep.BASIC_INFO ? (
        <BasicInformation />
      ) : currentProfileStep === ProfileCompletionStep.SELECT_PROFICIENCY ? (
        <SelectProficiency />
      ) : currentProfileStep === ProfileCompletionStep.SELECT_MEMBERSHIP ? (
        <StartFreeTrial />
      ) : null}
    </Screen>
  );
};
