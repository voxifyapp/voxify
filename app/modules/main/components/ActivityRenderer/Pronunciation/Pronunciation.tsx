import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { useVoiceRecognition } from '@voxify/hooks/voiceRecognition';
import { useCreatePronunciationContext } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.context';
import { pronunciationMachine } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.machine';
import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';
import { H1, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const contextValue = useCreatePronunciationContext({ activity });
  const { isWorkingState, setUserAnswer, userAnswer } = contextValue;

  const { Voice } = useVoiceRecognition({
    onResults: recognizedWords => {
      setUserAnswer({ recognizedWords });
    },
    onSpeechRealtimeRecognition: recognizedWords => {
      setUserAnswer({ recognizedWords });
    },
  });

  const [_, send] = useMachine(pronunciationMachine, {
    actions: {
      startListening: () => {
        Voice.start('en-IN');
      },
      stopListening: () => {
        Voice.stop();
      },
    },
  });

  console.log(_);

  useEffect(() => {
    send(isWorkingState ? 'WORKING' : 'NOT_WORKING');
  }, [isWorkingState, send]);

  const referenceStringArray = PronunciationActivity.convertStringToArray(
    activity.getPrompt().text,
  );
  const matchResults = PronunciationActivity.matchReferenceStringWithInput(
    activity.getPrompt().text,
    userAnswer.recognizedWords,
  );

  useEffect(() => {}, []);

  return (
    <YStack alignItems="center" p="$3" justifyContent="center" fullscreen>
      <XStack flex={1} flexWrap="wrap" justifyContent="center">
        {referenceStringArray.map((word, index) => {
          const hasMatched = matchResults[index];
          return (
            <H1
              fontWeight="bold"
              color={hasMatched ? 'white' : 'black'}
              padding="$1.5"
              paddingBottom="0"
              textAlign="center"
              backgroundColor={hasMatched ? 'green' : undefined}
              key={index}>
              {word}
            </H1>
          );
        })}
      </XStack>
      {/* <Button
        onPress={() => {
          if (!started) {
            Voice.start('en-IN');
          }
        }}
        theme="green">
        {started ? 'Stop' : 'Start'} Recording
      </Button> */}
    </YStack>
  );
};
