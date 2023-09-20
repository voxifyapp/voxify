import {
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksActivity,
} from '@packages/activity-builder';
import { flattenDeep } from 'lodash';

export const derivedValues = ({
  activity,
  userAnswer,
}: {
  userAnswer: FillInTheBlanksActivityAnswer;
  activity: FillInTheBlanksActivity;
}) => {
  const question = activity.getQuestion().text;
  const options = activity.getOptions();

  // question segments is question split by $$blank$$ and then by spaces
  // We do this for edge cases with commas and other punctuation
  const questionSegments = flattenDeep(
    question
      .split(new RegExp(FillInTheBlanksActivity.BLANK_FORMAT))
      .map(segment => segment.split(' ')),
  );

  const blanks = questionSegments.filter(segment =>
    segment.match(FillInTheBlanksActivity.BLANK_FORMAT),
  );

  // Gets the next blank that the user has not answered
  const nextUserBlank = blanks.find(blank => !userAnswer[blank]);

  return { question, options, nextUserBlank, questionSegments, blanks };
};
