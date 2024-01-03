import React from 'react';
import { CheckCircle2 } from '@tamagui/lucide-icons';
import { Text, XStack } from 'tamagui';

type Props = {
  isComplete: boolean;
};

export const CompletedChip = ({ isComplete }: Props) => (
  <XStack alignItems="center" space="$2">
    <CheckCircle2 color={isComplete ? '$blue5' : '$gray3'} />
    <Text
      fontSize="$2"
      color={isComplete ? '$blue5' : '$gray3'}
      fontWeight="bold">
      COMPLETED
    </Text>
  </XStack>
);
