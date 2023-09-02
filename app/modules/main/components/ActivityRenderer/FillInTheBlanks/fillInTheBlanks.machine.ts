import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

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
  type: 'add_word';
  payload: { optionId: string };
};
type RemoveWordEvent = {
  type: 'remove_word';
  payload: { blankId: string };
};

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDEBJAGSoH0KA5WgFQAkBRWgISoEEGA0gGUAxOggRaAdwD2AJwgBtAAwBdRKAAOM2LgAuuGfg0gAHogAsAJgA0IAJ6IAjAHYXJCwFYAzE6sAOAE5lFwtlK2VvAF8ouzQsPEJSShp6JjZOHn5hETkwVBkANzBpeSU1E21dAyMTcwR-dytrJ39-MP8rbxdA-ztHBqcST2VR0YA2ceULLz8Y2JB8GQg4E3icAmJKnX1DYyQzRABacf7jzxJAq+ubm+iF9cTicmo6RhYObj5BIW3qvbqiE8gRIoWuXnaQW8nn8njOCCsLn8HmU4ysnicyicI088yiQA */
      initial: 'FILL_IN_THE_BLANKS',
      schema: {
        events: {} as AddWordEvent | RemoveWordEvent,
      },
      predictableActionArguments: true,
      context: {} as ContextType,
      tsTypes: {} as import('./fillInTheBlanks.machine.typegen').Typegen0,
      states: {
        FILL_IN_THE_BLANKS: {
          on: {
            add_word: {
              cond: 'canAddWords',
              target: 'FILL_IN_THE_BLANKS',
              actions: 'addWord',
            },
            remove_word: [
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
};
