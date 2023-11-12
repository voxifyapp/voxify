/* eslint-disable @typescript-eslint/no-shadow */
import {
  PronunciationActivity,
  PronunciationActivityAnswer,
} from '@packages/activity-builder';
import Voice from '@react-native-voice/voice';
import { Undo2 } from '@tamagui/lucide-icons';
import { Button } from '@voxify/design_system/button';
import { H4 } from '@voxify/design_system/typography';
import { PronunciationText } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/components/PronunciationText';
import { useCreatePronunciationContext } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.context';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React, { useCallback, useEffect } from 'react';
import { XStack } from 'tamagui';

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
  const { machineService: activityRendererMachineService, activityEntity } =
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

  // Subscribing to the pronunciation state machine
  useEffect(() => {
    const unsubscribe = pronunciationMachineActor.subscribe(async e => {
      // If we are in the listening state, we need to start the voice recognition
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

      // If we WERE in the listening state and moved away, lets stop the voice recognition
      if (e.history?.matches('LISTENING') && e.changed) {
        Voice.destroy();
        Voice.removeAllListeners();
      }
    }).unsubscribe;

    return () => {
      unsubscribe();
      Voice.destroy();
      Voice.removeAllListeners();
    };
  }, [
    activityEntity.id,
    onCheckAnswer,
    pronunciationMachineActor,
    setUserAnswer,
  ]);

  useEffect(() => {
    pronunciationMachineActor.send(isWorkingState ? 'WORKING' : 'NOT_WORKING');
  }, [activityEntity.id, isWorkingState, pronunciationMachineActor]);

  const referenceStringArray = PronunciationActivity.convertStringToArray(
    activity.getPrompt().text,
  );
  const matchResults = PronunciationActivity.matchReferenceStringWithInput(
    activity.getPrompt().text,
    userAnswer.recognizedWords,
  );

  useEffect(() => {
    return pronunciationMachineActor.subscribe(async e => {
      if (e.event.type === 'RESTART' && e.changed) {
        await Voice.destroy();
        setUserAnswer({ recognizedWords: '' });
        setAnswerErrors(null);
        Voice.removeAllListeners();
        pronunciationMachineActor.send('AFTER_RESTART');
      }
    }).unsubscribe;
  });

  return (
    <ActivityCardContainer space="$4" alignItems="center">
      {pronunciationMachineActor.getSnapshot().value === 'LISTENING' ? (
        <H4
          color="white"
          backgroundColor="$color.blue"
          p="$2"
          paddingVertical="$2"
          paddingHorizontal="$4"
          borderRadius="$10"
          textAlign="center">
          LISTENING
        </H4>
      ) : null}

      <XStack flex={1} flexWrap="wrap" justifyContent="center">
        {referenceStringArray.map((word, index) => {
          const hasMatched = matchResults[index];
          return (
            <PronunciationText
              hasMatched={!!hasMatched}
              fontWeight="bold"
              key={index}>
              {word}
            </PronunciationText>
          );
        })}
      </XStack>
      <Button
        onPress={() => {
          pronunciationMachineActor.send('RESTART');
        }}
        size="$7"
        circular>
        <Undo2 scale={1} strokeWidth={3} />
      </Button>
    </ActivityCardContainer>
  );
};
