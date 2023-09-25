import Voice from '@react-native-voice/voice';
import {
  PronunciationActivity,
  PronunciationActivityAnswer,
} from '@voxify/common/activities/pronunciation-activity';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useCreatePronunciationContext } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.context';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React, { useCallback, useEffect } from 'react';
import { Button, H1, H3, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const contextValue = useCreatePronunciationContext({ activity });
  const {
    isWorkingState,
    setUserAnswer,
    userAnswer,
    setAnswerErrors,
    pronunciationMachineActor,
  } = contextValue;
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const onCheckAnswer = useCallback(
    (userAnswer: PronunciationActivityAnswer) => {
      pronunciationMachineActor.send('PROCESS');
      activityRendererMachineService.send({
        type: 'finish',
        userAnswer,
      });
      const answerErrors = activity.checkAnswer(userAnswer);
      setAnswerErrors(answerErrors);
      activityRendererMachineService.send({
        type: 'set_result',
        result: answerErrors?.correct
          ? ActivityResponseResultType.SUCCESS
          : ActivityResponseResultType.FAIL,
        userAnswer,
        answerError: answerErrors,
      });
    },
    [
      activity,
      activityRendererMachineService,
      pronunciationMachineActor,
      setAnswerErrors,
    ],
  );

  useEffect(() => {
    const unsubscribe = pronunciationMachineActor.subscribe(async e => {
      if (e.matches('LISTENING') && e.changed) {
        // Remove any existing listeners and attach listeners for the current activity
        await Voice.destroy();
        Voice.removeAllListeners();

        Voice.onSpeechPartialResults = result => {
          setUserAnswer({ recognizedWords: result.value?.[0] || '' });
        };

        Voice.onSpeechResults = result => {
          setUserAnswer({ recognizedWords: result.value?.[0] || '' });
          onCheckAnswer({ recognizedWords: result.value?.[0] || '' });
        };

        Voice.onSpeechError = () => {
          pronunciationMachineActor.send('VOICE_RECOGNITION_FAIL');
        };

        Voice.onSpeechEnd = error => {
          console.log('onSpeechEnd', error);
        };

        Voice.start('en-IN');
      }
    }).unsubscribe;

    return () => {
      unsubscribe();
      Voice.destroy;
      Voice.removeAllListeners();
    };
  }, [onCheckAnswer, pronunciationMachineActor, setUserAnswer]);

  useEffect(() => {
    pronunciationMachineActor.send(isWorkingState ? 'WORKING' : 'NOT_WORKING');
  }, [isWorkingState, pronunciationMachineActor]);

  const referenceStringArray = PronunciationActivity.convertStringToArray(
    activity.getPrompt().text,
  );
  const matchResults = PronunciationActivity.matchReferenceStringWithInput(
    activity.getPrompt().text,
    userAnswer.recognizedWords,
  );

  return (
    <YStack alignItems="center" p="$3" justifyContent="center" fullscreen>
      <H3>{pronunciationMachineActor.getSnapshot().value}</H3>
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
      <Button w="100%" onPress={() => {}} theme="green">
        Restart
      </Button>
    </YStack>
  );
};
