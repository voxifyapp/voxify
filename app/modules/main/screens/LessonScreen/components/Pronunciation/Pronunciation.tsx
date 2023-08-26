import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import {
  convertStringToArray,
  matchReferenceStringWithInput,
} from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation/intersection';
import React, { useEffect, useState } from 'react';
import { Button, H2, XStack, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  const [started, setStarted] = useState(false);
  const [recognized, setRecognized] = useState<string>('');

  const referenceStringArray = convertStringToArray(activity.getPrompt().text);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setStarted(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setRecognized(e.value![0]);
  };

  // Hi, how are you doing? (i/p)
  // ["Hi", "how", "are", "you", "doing?"]

  // op
  // ["Hi", "how", "are", "you", "doing?"]
  // ["Hey", "how", "are", "you", "doing?"]
  // ["This", "is", "you", "test", "Hi", "how", "are", "you", "doing?"]

  // Let's skip the leading and trailing words
  // Once there is a match of N words, we'll start matching

  // longest intersection between 2 string arrays
  // Hi how is you doing

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

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
          if (started) {
            Voice.stop();
          } else {
            Voice.start('en-IN');
          }
        }}
        theme="green">
        {started ? 'Stop' : 'Start'} Recording
      </Button>
    </YStack>
  );
};
