import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import dayjs from 'dayjs';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

enum EventTypes {
  ADD_WORD = 'ADD_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
  CHECK_ANSWER = 'CHECK_ANSWER',
  FOCUSED = 'FOCUSED',
  UNFOCUSED = 'UNFOCUSED',
}

type ContextType = {
  userAnswer: FillInTheBlanksActivityAnswer;
  activity: FillInTheBlanksActivity;
  answerErrors: FillInTheBlanksAnswerErrorsType | null;
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
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
type FocusedEvent = { type: EventTypes.FOCUSED };
type UnFocusedEvent = { type: EventTypes.UNFOCUSED };

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAQQBEOB9SqjgNoAGALqJQABwD2sXABdcU-OJAAPRABYAHAGYSARn0B2AExCTG-SYCsOgJxGANCACeiY0ZIajOq3a3e+na2AL4hzmhYeISkfPTMLFQAogCyFABqSbzUgqIq0rIKSirqCNY2JABsxvo6lXYN5Vpazm4IWvok5UI9JrUmzSamYREYOATE5NTxrADCABJJszTcbAwAymRJVMJiSCAF8orK+6WV1p52QtV2Fr7WxpWtiEOXJpXvRv5aNh06IyBIuMYlNaIxWABVBgAMQoswh6ySuT2khkR2KpxeGmsJDMvh0PQcWgutWeCEMnSEdnOxJ0NkqlSMlQBQOikwWSxWa022xYu3yaKKJ1ApXelRIvgs32sDyMMp0ZMqPxIcoGVP03XeGhZYzZpA5y1WGy2VD5+hRB0FxxKLwZEqsGmlsvlZKMllx5S+ZjsdKE1jsOqiE1IDAoABVuOsw2wqGGkSxYfDEciBYVrZiEHiDBprmZzv7dMEyTZPNZHUZrjmvlSA+FAbrgyQAApsBHxxNtlP7Q5Cm2Z7G4oT4wlGYlGUmudzVLrUi5aeo6f1usJ1-BSCBwFSs4Op9HCtSIAC0T0nCEPOP8PSv156dMDwMmcXBu97GY0lQ0Xmx930AR81mLUcvHeEtrGqawhC+e89RIA0uWNbYX3TEVEAuRUAi8IINA0AZjGsH5mTrbcQWSdYIQAGTDdYkIxFCEGwvR9CpHRTBMOkmJYjQyTLcUINwuklVY6DG1IiiqNg6hklmCNuRNGj91KR1OiYn1WPYoc3XQylzC+fwLkqOlrGEkikjIyj1nIKgKGYI0eSoeS+yUgxmLUvoNK408fDsLodJ+L5misfRjMmUMIyjGM4w4By3xMYstCEFUmXeXRGVMD5gtIFtO2iuicLJfQBxzD8mSZOcNS0FcQiAA */
      initial: 'NOT_STARTED',
      schema: {
        events: {} as
          | AddWordEvent
          | RemoveWordEvent
          | CheckAnswerEvent
          | FocusedEvent
          | UnFocusedEvent,
      },
      predictableActionArguments: true,
      context: {} as ContextType,
      tsTypes: {} as import('./fillInTheBlanks.machine.typegen').Typegen0,
      states: {
        WORKING: {
          on: {
            [EventTypes.ADD_WORD]: {
              cond: 'canAddWords',
              target: 'WORKING',
              actions: 'addWord',
            },
            [EventTypes.REMOVE_WORD]: [
              {
                target: 'WORKING',
                actions: 'removeWord',
              },
            ],
            [EventTypes.CHECK_ANSWER]: [
              {
                cond: context =>
                  derivedValues(context).nextUserBlank === undefined,
                target: 'CHECK_ANSWER',
              },
            ],
            [EventTypes.UNFOCUSED]: {
              target: 'PAUSED',
            },
          },
        },

        CHECK_ANSWER: {
          entry: ['pauseTimer', 'checkAnswer'],
          always: [
            {
              target: 'RESULTS.CORRECT_ANSWER',
              cond: 'correctAnswer',
            },
            'RESULTS.WRONG_ANSWER',
          ],
        },

        RESULTS: {
          states: {
            CORRECT_ANSWER: {},
            WRONG_ANSWER: {},
          },
          invoke: {
            src: 'onActivityCompleted',
          },
        },

        NOT_STARTED: {
          on: {
            [EventTypes.FOCUSED]: {
              target: 'WORKING',
              actions: ['startTimer'],
            },
          },
        },

        PAUSED: {
          entry: ['pauseTimer'],
          on: {
            [EventTypes.FOCUSED]: {
              target: 'WORKING',
              actions: ['startTimer'],
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
        checkAnswer: assign(context => {
          return {
            answerErrors: context.activity.checkAnswer(context.userAnswer),
          };
        }),
        startTimer: assign({ startTimeInMillis: dayjs().valueOf() }),
        pauseTimer: assign(context => {
          return {
            totalTimeSpentInMillis:
              context.totalTimeSpentInMillis +
              (Date.now() - context.startTimeInMillis),
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
};
