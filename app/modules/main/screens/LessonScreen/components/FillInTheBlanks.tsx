import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { omit } from 'lodash';
import React, { useState } from 'react';
import { Button, H3, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const [userAnswer, setUserAnswer] = useState<FillInTheBlanksActivityAnswer>(
    {},
  );
  const question = activity.getQuestion().text;
  const options = activity.getOptions();

  // question segments is question split by the blanks with format $$blank$$
  // TODO Need to fix, it looks like because we are splitting it only by the blank format,
  // the rendering is affected (goes to a new line even if there is space)
  const questionSegments = question.split(
    new RegExp(FillInTheBlanksActivity.BLANK_FORMAT),
  );

  const blanks = questionSegments.filter(segment =>
    segment.match(FillInTheBlanksActivity.BLANK_FORMAT),
  );

  // Gets the next blank that the user has not answered
  const nextUserBlank = blanks.find(blank => !userAnswer[blank]);

  return (
    <YStack padding="$3" fullscreen>
      <XStack flexWrap="wrap">
        {questionSegments.map((segment, index) => (
          <SegmentRenderer
            setUserAnswer={setUserAnswer}
            activity={activity}
            userAnswer={userAnswer}
            key={index}
            segment={segment}
          />
        ))}
      </XStack>
      <XStack flexWrap="wrap" space="$3">
        {options
          .filter(option => !new Set(Object.values(userAnswer)).has(option.id))
          .map(option => (
            <Button
              disabled={!nextUserBlank}
              key={option.id}
              onPress={() => {
                setUserAnswer(prev => ({
                  ...prev,
                  [nextUserBlank!]: option.id,
                }));
              }}
              theme={'green'}>
              {option.text}
            </Button>
          ))}
      </XStack>
      <Stack flex={1} />
      <Button disabled={!!nextUserBlank}>Check Answer</Button>
    </YStack>
  );
};

const SegmentRenderer = ({
  segment,
  userAnswer,
  activity,
  setUserAnswer,
}: {
  segment: string;
  userAnswer: FillInTheBlanksActivityAnswer;
  activity: FillInTheBlanksActivity;
  setUserAnswer: React.Dispatch<
    React.SetStateAction<FillInTheBlanksActivityAnswer>
  >;
}) => {
  if (segment.match(FillInTheBlanksActivity.BLANK_FORMAT)) {
    if (userAnswer[segment]) {
      const optionIdForBlank = userAnswer[segment];
      const answerForBlank = activity
        .getOptions()
        .find(option => option.id === optionIdForBlank)?.text;
      return (
        <Button
          onPress={() => {
            setUserAnswer(prev => omit(prev, [segment]));
          }}
          theme="green">
          {answerForBlank}
        </Button>
      );
    }
    return <H3>____ </H3>;
  }

  return <H3>{segment} </H3>;
};
