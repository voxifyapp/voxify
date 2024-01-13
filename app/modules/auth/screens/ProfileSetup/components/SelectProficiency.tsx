import { LoadingWithErrorContainer } from '@voxify/common/components/LoadingWithErrorContainer';
import { Button } from '@voxify/design_system/button';
import { Screen, YStack } from '@voxify/design_system/layout';
import { H2, H4, Subtext } from '@voxify/design_system/typography';
import { firebaseAnalyticsProficiencySubmitted } from '@voxify/modules/auth/screens/ProfileSetup/components/analytics';
import { useEditProfileMutation } from '@voxify/modules/auth/screens/ProfileSetup/hooks/useEditProfileMutation';
import { ProficiencyLevel } from '@voxify/types/auth/profile';
import React from 'react';
import { Card, RadioGroup, ScrollView, XStack } from 'tamagui';

export const SelectProficiency = () => {
  const [selectedProficiency, setSelectedProficiency] =
    React.useState<ProficiencyLevel>(ProficiencyLevel.BEGINNER);

  const editProfileMutation = useEditProfileMutation();

  return (
    <Screen>
      <ScrollView flex={1}>
        <YStack space="$6" paddingVertical="$4">
          <H2 fontWeight="bold">How well can you currently speak?</H2>
          <RadioGroup
            disabled={editProfileMutation.isPending}
            value={selectedProficiency}
            onValueChange={e => setSelectedProficiency(e as ProficiencyLevel)}>
            <YStack space="$3">
              <ProficiencyLevelCard
                onPress={() =>
                  setSelectedProficiency(ProficiencyLevel.BEGINNER)
                }
                value={ProficiencyLevel.BEGINNER}
                title="Beginner"
                description="You know the basics, and can deal with overall meaning. You
                  mainly translate from your native language while talking."
              />
              <ProficiencyLevelCard
                value={ProficiencyLevel.MEDIUM}
                onPress={() => setSelectedProficiency(ProficiencyLevel.MEDIUM)}
                title="Intermediate"
                description="You can understand most of the things you hear. Make some mistakes while you talk and are not very confident."
              />
              <ProficiencyLevelCard
                value={ProficiencyLevel.ADVANCED}
                onPress={() =>
                  setSelectedProficiency(ProficiencyLevel.ADVANCED)
                }
                title="Advanced"
                description="You can speak confidently and understand everything you hear. You want to improve vocabulary and soft skills."
              />
            </YStack>
          </RadioGroup>
          <LoadingWithErrorContainer
            isLoading={editProfileMutation.isPending}
            error={editProfileMutation.error}>
            <Button
              onPress={async () => {
                await editProfileMutation.mutateAsync({
                  proficiencyLevel: selectedProficiency,
                });
                firebaseAnalyticsProficiencySubmitted({
                  proficiencyLevel: selectedProficiency,
                });
              }}>
              Continue
            </Button>
          </LoadingWithErrorContainer>
        </YStack>
      </ScrollView>
    </Screen>
  );
};

const ProficiencyLevelCard = ({
  title,
  description,
  onPress,
  value,
}: {
  title: string;
  description: string;
  value: ProficiencyLevel;
  onPress?: () => void;
}) => {
  return (
    <Card onPress={onPress} p="$4" backgroundColor="white">
      <XStack space="$4">
        <RadioGroup.Item mt="$2" size="$4" value={value}>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
        <YStack flex={1}>
          <H4 fontWeight="bold">{title}</H4>
          <Subtext>{description}</Subtext>
        </YStack>
      </XStack>
    </Card>
  );
};
