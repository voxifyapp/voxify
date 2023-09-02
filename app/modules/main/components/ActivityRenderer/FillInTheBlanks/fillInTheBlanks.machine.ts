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
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAYQAkBRNmgfQCCDAMpkuVANoAGALqJQABwD2sXABdcS-PJAAPRAHYATEZIAOM0csAWAKwBGe1LMA2ewBoQAT0QmAnCQGUgDM9i4GrrYmwWYAvrGeaFh4hKSUtIysAKoMAGIUbFnCXAAi0nJIIMqqGlo6+ghGdiT2Zga2UrbB7bYG3baePgj2XYFGLm7WwdZ+IX3xiRg4BMTk1PTMJLl0ADI7fIx8ACrcfABCO0I0wiwCJSV86WWyOtXqmtqVDVOmtn79Lj8HSMs3ag181gMJDsoVsbiCUj81hcCxASWWqTWGU22z2BwYx1OFyuNyoXAAshQAGpcR7UZ4VRQqd51L6ISG2EiI-p+VxImIhcHDBxcqRisJ+AwGCb2YKo9EpVacHj8ISicQscqvZm1T6gBrjFwkYJSZFtYLwvx+IxC9pGlxw4JGJy2GbGWzypaK0jK3iCERiKia+yMqo6j71XwTY2mlzmy3WoVmKSmB0uC3WexAqJ2T3JFakBgUI58YRHARUI6lFj5QrFBnamoRtmNEItaxSdMGawmMzTG3eRAmqQkcKS50xeyZkJ5jGrAAKAiK1dry4blTeusjjWarXanX6vX6QqMppIJgmUml1qalg9qPwSggcB0CoLjZZer0iAAtC4hT+RjBCQVqgWB4FygkaJegWWIbEwH5bi2MTWCQfwAkCKaggMg4IOmaFilIU6uMi1hmMis7enBmRbLs+yHCctLEgw1yIc2+rsr00IwvY0pGAYTimkK0xmCBnbjLyfxGHCKJQW+mK+qqAbiGxrIcQgvS2haIFmH44R9OJUmUbBZLCFkOxHMIqlft8UwtERvTjB2t59kKLintCnahD2iJEURxmYqZ5mWSQbDUGSbAlmqgbWduMz2PZIzGC4zlka5uHtKhszpqedhzK0AWrEFFnCOQVAUMw-rqlQsUtvFiWOSlKZpcESayp56YpcmRHSZBiz5piRYlmWFZViUtXqT2wlNC0cJWCMroxLYcRyTBmKLmuE3fggU24VOqFTk6CIgiETTxPEQA */
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
          initial: 'FILL_IN_THE_BLANKS',
          states: {
            FILL_IN_THE_BLANKS: {
              on: {
                [EventTypes.ADD_WORD]: {
                  cond: 'canAddWords',
                  target: 'FILL_IN_THE_BLANKS',
                  actions: 'addWord',
                },
                [EventTypes.REMOVE_WORD]: [
                  {
                    target: 'FILL_IN_THE_BLANKS',
                    actions: 'removeWord',
                  },
                ],
              },
            },
          },
          on: {
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
            src: 'onActivityResults',
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
