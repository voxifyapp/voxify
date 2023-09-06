import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { useVoiceRecognition } from '@voxify/hooks/voiceRecognition';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useCreatePronunciationContext } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.context';
import { pronunciationMachine } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.machine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';
import { H1, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const contextValue = useCreatePronunciationContext({ activity });
  const { isWorkingState, setUserAnswer, userAnswer, setAnswerErrors } =
    contextValue;
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const onCheckAnswer = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
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
  };

  const { Voice } = useVoiceRecognition({
    onResults: recognizedWords => {
      setUserAnswer({ recognizedWords });
    },
    onSpeechRealtimeRecognition: recognizedWords => {
      setUserAnswer({ recognizedWords });
    },
  });

  const [_, send, actor] = useMachine(pronunciationMachine);

  useEffect(() => {
    return actor.subscribe(e => {
      if (e.matches('LISTENING')) {
        Voice.start('en-IN');
      }
    }).unsubscribe;
  }, [Voice, actor]);

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
