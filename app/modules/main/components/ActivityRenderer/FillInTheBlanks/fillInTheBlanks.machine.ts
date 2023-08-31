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
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAQQBEOB9SqjgNoAGALqJQABwD2sXABdcU-OJAAPRABYAHAGYSARn0B2fQDYhRoQFYrOraYA0IAJ6J9ATgBMJHZ-fmjKy13dy17KwBfCKc0LDxCUj56ZhYqAFEAWQoANTTeakFRFWlZBSUVdQQrTysSU2N9HVMQ92qwp1cEfx8jUw0jUMDTXosomIwcAmJyamTWAGEACTT5mm42BgBlMjSqYTEkEBL5RWVDyvr9EnchU09LEI8g-Q7Ee6ESa3r3DQ8BrRsYxAsUmCRmtEYrAAqgwAGIUeZQzZpQoHSQyE7lc5ueqfHT6TwadxmTz2Iw6V4ILRXIktYy3RqEyLRYETeLTJYrNYbba7Fj7YoYspnUCVTymUw+An9LRCIRmQKUvruOpCdw6HRGDQSjxCHRAkHs0ic1brLY7Kj8-Roo5C04VN4SqWEoyy+XDKyUyxaAxqpqeQwaTVCLQGtlTUgMCgAFW4m2jbCo0ZRLHhiORqMFpXt2IQnj1Bg0t1+VjV2g0npcb3JJCLd2sGnuQ2Z4ziEZIAAU2EiU2me5nDsdhQ6EGYrnrpcS7mSKVXR0YjLXbGqARKfhoK1EWfgpBA4CpDRGs5iRWpEABaRxzy+fOV3+930lhttgpKQ4-D3O-H0b2z4-RaNq5K9JSfh6KS9xWPUViuvKC7PqCHLLKaPIWh+OaiogMFKqYPrmOq+LiiE9ymAhRokOkmxQgAMtGmzoVimEIBuej6H6ViNK65i+JSUEfDoVgEX0phQaYdhke2lE0XRJDzNQ6TzLGqG7Axp6VESVxseqHGavYeqeEq-QkAC6rNForoDOSElglJtGbOQVAUMwZq8lQqkjhpvraZxek8XOliSgJ2mkh47jwSyh5glGsbxomyYcO5X4GXOfi1GJkH2J44oeKGEXhmCXb9olTGNpSHjeIJYk6HKTRQY2W4REAA */
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
              actions: ['pauseTimer'],
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
        },

        NOT_STARTED: {
          on: {
            [EventTypes.FOCUSED]: {
              target: 'WORKING',
              actions: ['setStartTime'],
            },
          },
        },

        PAUSED: {
          on: {
            [EventTypes.FOCUSED]: {
              target: 'WORKING',
              actions: ['resumeTimer'],
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
        setStartTime: assign({ startTimeInMillis: dayjs().valueOf() }),
        pauseTimer: assign(context => {
          return {
            totalTimeSpentInMillis:
              context.totalTimeSpentInMillis +
              (Date.now() - context.startTimeInMillis),
          };
        }),
        resumeTimer: assign({
          startTimeInMillis: dayjs().valueOf(),
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
