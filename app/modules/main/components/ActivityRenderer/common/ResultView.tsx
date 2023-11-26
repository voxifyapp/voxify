import { CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import { YStack } from '@voxify/design_system/layout';
import { H3, H4 } from '@voxify/design_system/typography';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import React from 'react';
import { XStack, styled } from 'tamagui';

type Props = {
  correctAnswerView?: React.ReactNode;
};

// Used to show the result of activities
export const ResultView = ({ correctAnswerView }: Props) => {
  const { activityResponseResult } = useActivityRendererContext();

  if (activityResponseResult === ActivityResponseResultType.SUCCESS) {
    return (
      <ResultContainer backgroundColor="$color.green1">
        <XStack alignItems="center" space="$2">
          <CheckCircle2 color="$color.green5" />
          <H3 color="$color.green5">Correct!</H3>
        </XStack>
      </ResultContainer>
    );
  }
  if (activityResponseResult === ActivityResponseResultType.FAIL) {
    return (
      <ResultContainer backgroundColor="$color.orange1">
        <XStack alignItems="center" space="$2">
          <XCircle color="$color.orange5" />
          <YStack>
            <H4 color="$color.orange5">That's incorrect!</H4>
            {correctAnswerView}
          </YStack>
        </XStack>
      </ResultContainer>
    );
  }
};

const ResultContainer = styled(YStack, {
  name: 'ResultContainer',
  width: '100%',
  padding: '$2',
  minHeight: '$8',
  justifyContent: 'center',
  paddingHorizontal: '$4',
  borderRadius: '$4',
});
