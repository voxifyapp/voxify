import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { useVoiceRecognition } from '@voxify/hooks/voiceRecognition';
import {
  convertStringToArray,
  matchReferenceStringWithInput,
} from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/intersection';
import React from 'react';
import { Button, H2, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const { started, Voice, recognized } = useVoiceRecognition();

  const referenceStringArray = convertStringToArray(activity.getPrompt().text);

  const matchResults = matchReferenceStringWithInput(
    activity.getPrompt().text,
    recognized,
  );

  return (
    <YStack alignItems="center">
      <XStack flexWrap="wrap">
        {referenceStringArray.map((word, index) => {
          const hasMatched = matchResults[index];
          return (
            <H2
              color={hasMatched ? 'white' : 'black'}
              padding="$1.5"
              backgroundColor={hasMatched ? 'green' : undefined}
              key={index}>
              {word}
            </H2>
          );
        })}
      </XStack>
      <Button
        onPress={() => {
          if (!started) {
            Voice.start('en-IN');
          }
        }}
        theme="green">
        {started ? 'Stop' : 'Start'} Recording
      </Button>
    </YStack>
  );
};
