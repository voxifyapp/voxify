import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

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
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEBiAQQBEOB9SqjgNoAGALqJQABwD2sXABdcU-OJAAPRAE4hJIQGYAjACYALBv0BWAOyXDANkOGANCACeifdZIbLB3bqHGJkJCdgC+oc5oWHiEpHz0zCxUAKIAshQAasm81IKiKtKyCkoq6gj6uoYk5gYm+hoAHPrGug16zm4ITdX1Ghq2Hv31hg3hkRg4BMTk1AmsAMIAEsnzNNxsDADKZMlUwmJIIIXyisqHZf5VI1rm5ra3+gP6HYiGlg1ednZ9Qub6TSYxiAopNYiQlis1httrsWPsCjITiVzoh-MYvA1bLpzMZbA1brZLL8XghbITqhpKn9dMZzIZ9PUgSCYtMIat1lsdlQ4foDpJEcUzqAytSSP8GsZmuYApTWiSyZYKVT3mZgmTwhEQPgpBA4CpmVMiAiiqdSohbCSALTmLyWPoaaWGGqWUyMzUGsHxRhMY1IoVqdxCD4NSohSzmRr6X5CSwkt4aEiBey2H5-AHGJkTFmkNlQzm7X2Cs0IKwknG2T5Yiy6Sz1amZ6KGkgpTYAVQAMgAVTaF00okvGEkSitJvyBO19dXurNNlsd7vg6gpeadjkwqi95HCwNOVyaPyVvwBCMDcyjaeNsFzrubchUCjMNdczf+spR3edPpVUeqvwNTHnuEQA */
      initial: 'WORKING',
      schema: {
        events: {} as AddWordEvent | RemoveWordEvent | CheckAnswerEvent,
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
                target: 'CHECK_ANSWER',
              },
            ],
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
};
