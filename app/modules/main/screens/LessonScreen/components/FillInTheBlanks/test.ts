import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

enum States {
  FOCUSED_WORKING = 'WORKING',
  FOCUSED_CHECK_ANSWER = 'CHECK_ANSWER',
  FOCUSED_CORRECT_ANSWER = 'CORRECT_ANSWER',
  FOCUSED_WRONG_ANSWER = 'WRONG_ANSWER',
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
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFUA5AMQHkBhMgZQFEARAYlocYG0AGALqJQABwD2sXABdcY-MJAAPRAEYAnAFYSAFj4A2AEwaANCACeqgMwGAvjdNoseQqS5M27Sm96CF4yTJyCsoI6lq6hibmiAAcKiQadg4YOATEJN5sJADqNABKANIAkhQA4uwAgqysAPq5eaz8Qkgg-tKy8i0hKioGJADsURYIGnpqJJqWvYn2II6pLhn07qw5+cVl7HnMALI0AGrMdfmNvi1tgZ2gIWr9psPa-dpJcynO6Zmr9RvldAASzDoBRqFQojGyzDyTT8EnaQS6iAM-T6BjUehig3uiD0-T4On0Rhe83ermWLFW-0BwNB4Mh7Gh51hl2CiH6li0TzUaLU2hiBm0BnUWIQhhi+MiGj4MUMeksRLeaVJ3CylKBILBELy9JUzVETI6LIQbI52i5Y15-MFamF6L0EwJGkl0oMspUdlm+DEEDgCmJiphAQNCIQAFo9MKQ1oudGuXwNDFLI81DF5U5FeRqGS2AG4VclIgBcKMQkE5Yy+WK3LZn7Fp8c8zg6bhZZpQk+O3BRoeXoVHpUwsPlmvusSqV60HrqpBSQy13LJjoiLcfbIv2SUtlRSAWqaZrx-DJyMXTp59pzXyBULF3pHuKDImnr0VHw1Gv058SHR8ts6AAVdW0nk+55jcBhihouLshoz4tmyBg2seKijEY6Ltio-QqCm1YKrWQ45HkNBlABe6MoGB75ggahIiQMTaNoLYaIKeh8NY4bXrRJB6MhowxGhGFYXYQA */
      initial: States.FOCUSED_WORKING,
      schema: {
        events: {} as AddWordEvent | RemoveWordEvent | CheckAnswerEvent,
      },
      context: {} as ContextType,
      tsTypes: {} as import("./test.typegen").Typegen0,
      states: {
        [States.FOCUSED_WORKING]: {
          on: {
            [EventTypes.ADD_WORD]: {
              cond: 'canAddWords',
              target: States.FOCUSED_WORKING,
              actions: 'addWord',
            },
            [EventTypes.REMOVE_WORD]: [
              {
                target: States.FOCUSED_WORKING,
                actions: 'removeWord',
              },
            ],
            [EventTypes.CHECK_ANSWER]: [
              {
                cond: context =>
                  derivedValues(context).nextUserBlank === undefined,
                target: States.FOCUSED_CHECK_ANSWER,
              },
            ],
          },
        },
        [States.FOCUSED_CHECK_ANSWER]: {
          entry: 'checkAnswer',
          always: [
            {
              target: States.FOCUSED_CORRECT_ANSWER,
              cond: 'correctAnswer',
            },
            { target: States.FOCUSED_WRONG_ANSWER },
          ],
        },
        [States.FOCUSED_CORRECT_ANSWER]: {},
        [States.FOCUSED_WRONG_ANSWER]: {},
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
