import { SelectProficiency } from "@voxify/app/profile-setup/components/SelectProficiency";
import { StartFreeTrial } from "@voxify/app/profile-setup/components/StartFreeTrial";
import { useAppContext } from "@voxify/appContext";
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from "@voxify/hooks/profile";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { YStack } from "tamagui";

export default function ProfileSetup() {
  const { profile } = useAppContext();
  const currentProfileStep = useGetCurrentProfileStep(
    profile
  ) as ProfileCompletionStep;

  useEffect(() => {
    if (currentProfileStep === ProfileCompletionStep.COMPLETE) {
      router.replace("/");
    }
  }, [currentProfileStep]);

  return (
    <YStack>
      {currentProfileStep === ProfileCompletionStep.SELECT_PROFICIENCY ? (
        <SelectProficiency />
      ) : currentProfileStep === ProfileCompletionStep.SELECT_MEMBERSHIP ? (
        <StartFreeTrial />
      ) : null}
    </YStack>
  );
}
