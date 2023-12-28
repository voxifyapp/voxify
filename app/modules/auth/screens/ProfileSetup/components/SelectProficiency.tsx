import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  setProficiency,
} from '@voxify/api/auth/profile';
import { ProficiencyLevel } from '@voxify/types/auth/profile';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, View } from 'tamagui';
import { Button } from '@voxify/design_system/button';

export const SelectProficiency = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (proficiency: ProficiencyLevel) => {
      return setProficiency(proficiency);
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

  const onProficiencySelected = async (proficiency: ProficiencyLevel) => {
    // Make HTTP POST call to set Proficiency
    mutate(proficiency);
  };

  return (
    <View>
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.BEGINNER)}>
        Beginner
      </Button>
      <Stack padding={10} />
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.MEDIUM)}>
        Medium
      </Button>
      <Stack padding={10} />
      <Button
        onPress={onProficiencySelected.bind(this, ProficiencyLevel.ADVANCED)}>
        Advanced
      </Button>
    </View>
  );
};
