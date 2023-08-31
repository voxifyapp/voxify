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
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAQQBEOB9SqjgNoAGALqJQABwD2sXABdcU-OJAAPRABYAHAGYSARn0B2fVoBsATiEAmIxZ1aANCACeiffZI7rFk1ts6FlpBGgC+oc5oWHiEpHz0zCxUAKIAshQAasm81IKiKtKyCkoq6ggArNblJGbG+rVVQvoaQc5uCL5eRmblur7+2uGRGDgExOTUCawAwgASydM03GwMAMpkyVTCYkgghfKKyrtlxhZeFr5mOkJ29eVCGm2a+noPGtZXtc0PFkMgUaNYhNaIxWABVBgAMQo0zBq2SeR2khkBxKx3ctRIQh0+msGm05XK9jMRieCC0+hI9yENOx1h0PTMWi0fwBMXGcwWSxW602LG2BRRxSOoDKHzMXlx5UM2KMhIuj1ciB6lLMQgsGhsPgsUpZEX+I3ZpE5i2Waw2VH5+iReyFh1KiHFkqqMp0cqJGrJJiEBnVDh0Gm6zJ05VZhrGpAh0Nh8I4LGjcIRAt2+2FDoQHh9mrM9MsWjlRiMDLJARI2aqWm0fRuYeiEZIAAU2Im4wnY8nkUV7eiM5jsbj8Vp5QzSUqM4Wy+UcS9ur0Lvpwvr8FIIHAVGyI4Ku2jRYgALRmMl76oXU+Fok58pGd61wHjeKgreokVqTQ3Eje+zSwlV0ftHwaCQ1j+JW1jND4FJDreRokCa3LmpsT5pj2V5kiSPpql++JmBo5SWNB9YpKsYIADIACqrEh3a7gg+J6PofpBmYObMX+iB4dYXhEpq3gMcy9IEUCRGkRRsHUCk0xkWavJUFRO6vrROq+vYTEsSSaEtCQQ72PYDGFsEYT6huQnJMR5GrOQVAUMw0kWnJL5lC0lIMSpTLMeKbEIEYQhaFxKnvEO5SBtYgnjFGMItvZ6bvCWFgSlcwEQQGNJGFBRnhkCTaRSmdryY51hkh4nEXiGzSBDhi6hEAA */
      initial: 'UNFOCUSED',
      schema: {
        events: {} as
          | AddWordEvent
          | RemoveWordEvent
          | CheckAnswerEvent
          | FocusedEvent
          | UnFocusedEvent,
      },
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
                actions: 'pauseTimer',
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
          entry: 'checkAnswer',
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

        UNFOCUSED: {
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
