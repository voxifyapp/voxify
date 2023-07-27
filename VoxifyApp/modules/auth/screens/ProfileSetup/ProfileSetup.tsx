import { useAppContext } from '@voxify/context/AppContext';
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from '@voxify/hooks/profile';
import React from 'react';
import { H1, YStack } from 'tamagui';

export const ProfileSetup = () => {
  const { profile } = useAppContext();
  const currentProfileStep = useGetCurrentProfileStep(
    profile,
  ) as ProfileCompletionStep;
  return (
    <YStack>
      {currentProfileStep === ProfileCompletionStep.SELECT_PROFICIENCY ? (
        <H1>Select Proficiency!</H1>
      ) : currentProfileStep === ProfileCompletionStep.SELECT_MEMBERSHIP ? (
        <H1>SELECT_MEMBERSHIP!</H1>
      ) : null}
    </YStack>
  );
};

// const { mutate, isLoading, error, reset } = useMutation(
//   ({
//     resmanAccountId,
//     resmanApiKey,
//     resmanPartnerId,
//   }: {
//     resmanApiKey: string;
//     resmanPartnerId: string;
//     resmanAccountId: string;
//   }) => {
//     return saveSettings({ resmanApiKey, resmanAccountId, resmanPartnerId });
//   },
//   {
//     onSuccess: () => {
//       notifications.show({
//         title: "Resman integration",
//         message:
//           "Resman details have been updated successfully! You may need to wait for a few minutes before you can see the renter data.",
//         color: "green",
//         icon: <IconCheck color={theme.colors.green[0]} />,
//       });
//       queryClient.invalidateQueries({ queryKey: [QUERY_SETTINGS] });
//       onClose();
//     },
//   }
// );
