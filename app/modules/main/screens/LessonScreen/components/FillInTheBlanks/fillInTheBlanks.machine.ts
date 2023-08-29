import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

enum States {
  UNFOCUSED = 'UNFOCUSED',
  FOCUSED = 'FOCUSED',
  FOCUSED_WORKING = 'WORKING',
}

enum EventTypes {
  FOCUS = 'FOCUS',
  UNFOCUS = 'UNFOCUS',
  ADD_WORD = 'ADD_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
}

type ContextType = {
  userAnswer: FillInTheBlanksActivityAnswer;
  activity: FillInTheBlanksActivity;
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

type FocusEvent = { type: EventTypes.FOCUS };
type UnfocusEvent = { type: EventTypes.UNFOCUS };
type AddWordEvent = {
  type: EventTypes.ADD_WORD;
  payload: { optionId: string };
};
type RemoveWordEvent = {
  type: EventTypes.REMOVE_WORD;
  payload: { blankId: string };
};

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFUA5AMQHkBhMgZQFEARAYlocYG0AGALqJQABwD2sXABdcY-MJAAPRADYAjCT4AWFQA4VAZgBMAVj5qDalUYA0IAJ6IjRviQCcKvkbce1JgOx8JnoAviF2aFh4hKRcTGzslHG8ggrikjJyCsoIam4mJFp81lpmlvq6JnaOCLoaZnyNWv66BgbqHmERGDgExCTJbCQA6jQASgDSAJIUAOLsAIKsrAD6o2Os-EJIIOnSsvI7OWpqRiT+Wj66Wic3blrG1YjBbu4mljd6LtpdIJG9MQG9HirBG42mc3YY2YAFkaAA1ZhrcabVI7PaZQ6gHJufyaRoEwkEtRPBDNLT4gnGPxeLwGX7-aL9JLAlgcZgANzA+CkAAIjFs0hJ9lkjogALQtUm6XQkVptAxucxGFTvC5hcIgfBiCBwBSMvpEIUZA7ZCWnFSk8UFHy2kwPNy6fxtOoMnpM0gs7hsY0irFKRBaWwORBOkgmeUGVpFPSXN1RQ1A72sX2Ys1k15ErONNRaUlRlThwm6Pj+e11IzxgH9Qag9YQ2ap01i3JGDRtExuFyO+5BIy6UkqQLuYpGB1Koe5qsekiEADuvNgUnQUjAvLUTdF2IlBgpJxUl38KmPJbHwZqBn8eLyHj4XaMzpMag1ISAA */
      initial: States.UNFOCUSED,
      schema: {
        events: {} as
          | FocusEvent
          | UnfocusEvent
          | AddWordEvent
          | RemoveWordEvent,
      },
      context: {} as ContextType,
      tsTypes: {} as import('./fillInTheBlanks.machine.typegen').Typegen0,
      states: {
        [States.UNFOCUSED]: {
          on: {
            [EventTypes.FOCUS]: {
              target: States.FOCUSED,
            },
          },
        },
        [States.FOCUSED]: {
          on: {
            [EventTypes.UNFOCUS]: {
              target: States.UNFOCUSED,
            },
          },

          initial: States.FOCUSED_WORKING,

          states: {
            [States.FOCUSED_WORKING]: {
              on: {
                [EventTypes.ADD_WORD]: {
                  target: States.FOCUSED_WORKING,
                  actions: 'addWord',
                },
                [EventTypes.REMOVE_WORD]: [
                  {
                    target: States.FOCUSED_WORKING,
                    actions: 'removeWord',
                  },
                ],
              },
            },
          },
        },
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
      },
    },
  ),
  derivedValues,
  EventTypes,
  States,
};
