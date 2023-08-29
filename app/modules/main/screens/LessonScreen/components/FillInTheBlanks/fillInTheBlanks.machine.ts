import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { flattenDeep, omit } from 'lodash';
import { assign, createMachine } from 'xstate';

export enum States {
  UNFOCUSED = 'UNFOCUSED',
  FOCUSED = 'FOCUSED',
}

export enum EventTypes {
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

export const fillInTheBlanksMachine = {
  machine: createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFUA5AMQHkBhMgZQFEARAYlocYG0AGALqJQABwD2sXABdcY-MJAAPRAEYAnAFYSAFj4A2AEwaANCACeiAwHYtuwwGZtV7SoMq+a7QF8vptFjxCUi4mNnZKEN5BBXFJGTkFZQR1W30jUwsEAwNtEjU0x2dXd08fPwwcAmISSLCAQVZWAH0AdRoAJVZ+ISQQWOlZeV6kx3sSDSsADlcTc1UrKx0NexKitw9vXxB-SqCa+lCOduYAWRoANWZWjq7o3v74odAR6xJJg2n0uYRp8Z8t-BiCBwBQ7QLEGISAYJYaIAC0egy8L0ZW2FXBpAiBxYrEhcUGiUQ2gMSKyekW7wM+RUuimCxRWzBVWC2LYeOhTyUiHsGgMJHsHxmpOskx0BScLnWpX+QA */
      initial: States.UNFOCUSED,
      schema: {
        events: {} as
          | { type: EventTypes.FOCUS }
          | { type: EventTypes.UNFOCUS }
          | { type: EventTypes.ADD_WORD; payload: { optionId: string } }
          | { type: EventTypes.REMOVE_WORD; payload: { blankId: string } },
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
            [EventTypes.ADD_WORD]: {
              target: States.FOCUSED,
              actions: assign((context, event) => {
                const { nextUserBlank } = derivedValues(context);
                return {
                  userAnswer: {
                    ...context.userAnswer,
                    [nextUserBlank!]: event.payload.optionId,
                  },
                };
              }),
            },
            [EventTypes.REMOVE_WORD]: {
              target: States.FOCUSED,
              actions: assign((context, event) => {
                return {
                  userAnswer: omit(context.userAnswer, event.payload.blankId),
                };
              }),
            },
          },
        },
      },
    },
    {
      actions: {},
    },
  ),
  derivedValues,
};
