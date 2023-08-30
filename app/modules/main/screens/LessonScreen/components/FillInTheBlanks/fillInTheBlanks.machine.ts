import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

enum States {
  WORKING = 'WORKING',
  CHECK_ANSWER = 'CHECK_ANSWER',
  CORRECT_ANSWER = 'CORRECT_ANSWER',
  WRONG_ANSWER = 'WRONG_ANSWER',
}

enum EventTypes {
  ADD_WORD = 'ADD_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
  CHECK_ANSWER = 'CHECK_ANSWER',
}

type ContextType = {
  userAnswer: FillInTheBlanksActivityAnswer;
  activity: FillInTheBlanksActivity;
  answerErrors: FillInTheBlanksAnswerErrorsType | null;
};

const derivedValues = (context: ContextType) => {
  const activity = context.activity;
  const userAnswer = context.userAnswer;

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

type AddWordEvent = {
  type: EventTypes.ADD_WORD;
  payload: { optionId: string };
};
type RemoveWordEvent = {
  type: EventTypes.REMOVE_WORD;
  payload: { blankId: string };
};
type CheckAnswerEvent = { type: EventTypes.CHECK_ANSWER };

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAQQBEOB9SqjgNoAGALqJQABwD2sXABdcU-OJAAPRABYATCSF79B-QEYNAGhABPREYDsNkhoCsAZiNabR5wE5HXm84BfAPM0LDxCUj56ZhYqAFEAWQoANTjeakFRFWlZBSUVdQQADg0HL3KfLw0qoqKtI3MrYqMSR0MjIqMANm1HRyCQjBwCYnJqaNYAYQAJOMmabjYGAGUyOKphMSQQHPlFZW3C5yEdLS8uopsur2c2s67GxHd7LyEurQ0NY+8bDTeBkChYYREgzOYLJardYsTbZGR7fKHRBXRwkGxtE4uXxaa42R4ILS3Eivd59dE47r9YKAobhUZg+aLFZrKgwoxbSTwvIHUCFFFojFaLFeHF+fFnUp-d4aIwnQkaGxBan4KQQOAqIF0ohw3L7AqIAC0qIqJtNXiKD0shq6AM1I0i40YTB1CJ5amsQiKJCKtyqQkcnR6PQaVoJNi9UqFfz8fS0-tttPtoNmjMhLJd3P1CD6XQczl+fmcXzOfXFjlKJKF5SEry0Hy0CbCScm1HikwAKkyoVQM3qkQgfKjy9durYq25xUWSEZHKSND04zKfY3gaMyFQKMwu+ntrtM-3B61515RzZx1pxSKSF1Z1XqkURUUXEqAkA */
      initial: States.WORKING,
      schema: {
        events: {} as AddWordEvent | RemoveWordEvent | CheckAnswerEvent,
      },
      context: {} as ContextType,
      tsTypes: {} as import('./fillInTheBlanks.machine.typegen').Typegen0,
      states: {
        [States.WORKING]: {
          on: {
            [EventTypes.ADD_WORD]: {
              cond: 'canAddWords',
              target: States.WORKING,
              actions: 'addWord',
            },
            [EventTypes.REMOVE_WORD]: [
              {
                target: States.WORKING,
                actions: 'removeWord',
              },
            ],
            [EventTypes.CHECK_ANSWER]: [
              {
                cond: context =>
                  derivedValues(context).nextUserBlank === undefined,
                target: States.CHECK_ANSWER,
              },
            ],
          },
        },
        [States.CHECK_ANSWER]: {
          entry: 'checkAnswer',
          always: [
            {
              target: States.CORRECT_ANSWER,
              cond: 'correctAnswer',
            },
            { target: States.WRONG_ANSWER },
          ],
        },
        [States.CORRECT_ANSWER]: {},
        [States.WRONG_ANSWER]: {},
      },
    },
    {
      actions: {
        addWord: assign((context, event: AddWordEvent) => {
          const { nextUserBlank } = derivedValues(context);
          return {
            userAnswer: {
              ...context.userAnswer,
              [nextUserBlank!]: event.payload.optionId,
            },
          };
        }),
        removeWord: assign((context, event: RemoveWordEvent) => {
          return {
            userAnswer: omit(context.userAnswer, event.payload.blankId),
          };
        }),
        checkAnswer: assign(context => {
          return {
            answerErrors: context.activity.checkAnswer(context.userAnswer),
          };
        }),
      },
      guards: {
        correctAnswer: context =>
          context.answerErrors!.wrongBlanks.length === 0,
        canAddWords: context =>
          derivedValues(context).nextUserBlank !== undefined,
      },
    },
  ),
  derivedValues,
  EventTypes,
  States,
};
