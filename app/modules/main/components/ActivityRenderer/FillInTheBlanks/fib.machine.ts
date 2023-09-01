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

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDEBJAGSoH0KA5WgFQAkBRWgISoEEGA0gGUAxLwAi42gHUA8gCVxAbQAMAXUSgADgHtYuAC64d+TSAAeiACwBGEgE5HT504AcANgA0IAJ6IbAOwBJFYArADMNgBM4fYqAa4BNu4AvineaFh4hKSUNPRMbJw8-MIi8uwAsrIAapxyiqoaSCC6+kYmZpYIrlYhzlb24SoqoVZB3n49doPOQYOu4VFWaekg+DoQcGaZOATEZm2GxqYt3QC07iQjN7e3NlaTiJdpGRh7OeTUdIwsHNx8QRCQ56Y6dM6IdxXVyhGyhKFQ1y9VxRVxPBBRBIhFTuZauFRWeKpVZAA */
      initial: 'FILL_IN_THE_BLANKS',
      schema: {
        events: {} as AddWordEvent | RemoveWordEvent,
      },
      predictableActionArguments: true,
      context: {} as ContextType,
      tsTypes: {} as import('./fib.machine.typegen').Typegen0,
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
      guards: {
        canAddWords: context =>
          derivedValues(context).nextUserBlank !== undefined,
      },
    },
  ),
  derivedValues,
  EventTypes,
};
