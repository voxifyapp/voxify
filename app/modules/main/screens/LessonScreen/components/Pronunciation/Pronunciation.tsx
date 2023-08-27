import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { useVoiceRecognition } from '@voxify/hooks/voiceRecognition';
import {
  convertStringToArray,
  matchReferenceStringWithInput,
} from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation/intersection';
import React from 'react';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Button, H2, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const { started, recognized, start } = useVoiceRecognition({
    recordAudio: true,
  });

  const referenceStringArray = convertStringToArray(activity.getPrompt().text);

  const matchResults = matchReferenceStringWithInput(
    activity.getPrompt().text,
    recognized,
  );

  const startRecording = async () => {
    try {
      // TODO Refactor this into a common component
      await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

      start('en-IN');
    } catch (err) {
      console.error(err);
      return;
    }
  };

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
          startRecording();
        }}
        theme="green">
        {started ? 'Stop' : 'Start'} Recording
      </Button>

      <Button theme="red">Listen to your recording</Button>
    </YStack>
  );
};
