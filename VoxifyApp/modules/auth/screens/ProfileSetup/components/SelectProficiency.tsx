import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  setProficiency,
} from '@voxify/api/auth/profile';
import { ProficiencyLevel } from '@voxify/types/auth/profile';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Stack, View } from 'tamagui';

export const SelectProficiency = () => {
  const queryClient = useQueryClient();

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
      onError(err) {
        console.log(err);
      },
    },
  );

  const onProficiencySelected = async (proficiency: ProficiencyLevel) => {
    // Make HTTP POST call to set Proficiency
    mutate(proficiency);
  };

  return (
    <View>
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.BEGINNER)}
        theme={'green'}>
        Beginner
      </Button>
      <Stack padding={10} />
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.MEDIUM)}
        theme={'green'}>
        Medium
      </Button>
      <Stack padding={10} />
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.ADVANCED)}
        theme={'green'}>
        Advanced
      </Button>
    </View>
  );
};
