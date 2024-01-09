import React from 'react';

import { CheckCircle2 } from '@tamagui/lucide-icons';
import { YStack } from '@voxify/design_system/layout';
import { H3, H5 } from '@voxify/design_system/typography';
import { View, styled } from 'tamagui';

export const ProgressLine = styled(View, {
  name: 'ProgressLine',
  flex: 1,
  width: 4,
  borderRadius: 2,
  backgroundColor: '$color.gray5',
  variants: {
    completed: {
      true: {
        backgroundColor: '$color.blue5',
      },
      false: {
        backgroundColor: '$color.gray3',
      },
    },
  },
});

export const DayText = ({
  day,
  completed,
}: {
  day: number;
  completed: boolean;
}) => {
  const textColor = completed ? '$color.blue' : '$color.gray7';

  return (
    <YStack paddingVertical="$2" alignItems="center">
      <H5 color={textColor} fontWeight="bold">
        DAY
      </H5>
      <H3 color={textColor} fontWeight="bold">
        {day}
      </H3>
      <CheckCircle2 color={completed ? '$color.blue5' : '$color.gray3'} />
    </YStack>
  );
};
