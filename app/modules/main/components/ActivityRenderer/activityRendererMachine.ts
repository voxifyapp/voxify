import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

type ContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
  userAnswer: any | null;
  answerError: any | null;
  result: ActivityResponseResultType;
};

export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgDM9kgEYALOoBs72wFYAHADsfgCcngA0IACedj62JOoJCfZ+bh7BAbYBAL5ZEWhYeISklLSMrJw8-CX0zJIKDLKKympalgZGpuaWNggOTm6e3v5BoR4R0QjOPs7xierJqemZOXkYOATE5NQ15dx8W6W1AGYEuLDYGtpIIO0mZhbXPf7qJB4+HrZvvoEhzuOIzhSJEy9lcrmc9kWGWyuRA+XWRQOOxElRIAAUuEoVDJ5FiWlc9IY7l1HnZHC53F51N8RuEonZ1DMfHMFq40tCVnC1oVNtUyij9tJGHQ2AAJbGwMDGFgAJzgAFcADbGS5tImdB6gHqBOJswJfYa-f6TIEgsEQqHLWHwnmkRp4gX8er25o4poqVXXW4a7p2WyuEgpZwBeaAoIfezG2LBEiQ4Oufw-DzqPycm0bO245qOkgu7HOrMe1pe9X3X29f2B5zB0NJhzG1xBKvxxPh9QBHw5WH4fQQOCWdNFNUdMukhAAWkrPmCCb1zlsEICIb8xsnTmCG43ni8048EbT3IzSP5FT4w+Jmusdlcxo8TmZCWcjPsnmnKYPBSPfOYOcEwgqYgqOePpjhkxq+HED5JCkbJLDCqyfoi367KiyHAaOWqIPYoQkD4eqhDSIR0hMzgeH4syJKy7JWghCK8tsJ57PwGJ4uhJKYZMbguOowTYdShqjMaUwBPEfiOPYARuH48zqP4H50cUDE-qe-BCgwIriuIbGXj0ASuDGrgSdMsQCX89K9OoAZQfMMHUfBXKIfRhwofsVC8GwCgADIcNp5ZPu2JB6gEBo-MEZkTLYlm4SytlwfJtq5oW4iOr5Y4OIFskJpCda2MEtjGthMxxgE9iRc4G6uLlnbWoeiJ5slKkkAW7paSWI7sVeCCSRleE+Nl4a2LlDZ+AGITMgEeULuV7j2YOmz1Tm9WpRxyRxAuE1kWCe7TPYPjDSJ2HjZN1Yzu2XZZEAA */
    context: {
      startTimeInMillis: 0,
      totalTimeSpentInMillis: 0,
      userAnswer: null,
      answerError: null,
    } as ContextType,
    tsTypes: {} as import('./activityRendererMachine.typegen').Typegen0,
    states: {
      WORKING_STATE: {
        initial: 'NOT_STARTED',
        states: {
          NOT_STARTED: {
            on: {
              FOCUSED: {
                target: 'WORKING',
              },
            },
          },
          WORKING: {
            on: {
              UNFOCUSED: {
                target: 'PAUSED',
              },
              finish: {
                target: 'FINISHED',
                actions: 'setUserAnswer',
              },
            },
            entry: 'startTimer',
            exit: 'pauseTimer',
          },
          PAUSED: {
            on: {
              FOCUSED: {
                target: 'WORKING',
              },
            },
          },
          FINISHED: {
            on: {
              set_result: {
                target: 'RESULT',
                actions: 'setResult',
              },
            },
          },
          RESULT: {
            // on: {
            //   RESET: {
            //     target: 'WORKING',
            //     cond: 'Focused',
            //   },
            // },
          },
        },
      },
      FOCUSED_STATE: {
        initial: 'UNFOCUSED',
        states: {
          UNFOCUSED: {
            on: {
              FOCUSED: {
                target: 'FOCUSED',
              },
            },
          },
          FOCUSED: {
            on: {
              UNFOCUSED: {
                target: 'UNFOCUSED',
              },
            },
          },
        },
      },
    },
    type: 'parallel',
    schema: {
      events: {} as
        | { type: 'FOCUSED' }
        | { type: 'UNFOCUSED' }
        | {
            type: 'set_result';
            result: ActivityResponseResultType;
            userAnswer: any;
            answerError: any | null;
          }
        // | { type: 'RESET' }
        | { type: 'finish'; userAnswer: any },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      startTimer: assign({ startTimeInMillis: dayjs().valueOf() }),
      pauseTimer: assign(context => {
        return {
          totalTimeSpentInMillis:
            context.totalTimeSpentInMillis +
            (dayjs().valueOf() - context.startTimeInMillis),
        };
      }),
      setUserAnswer: assign((_, { userAnswer }) => ({ userAnswer })),
      setResult: assign((_, { result, userAnswer, answerError }) => ({
        result,
        userAnswer,
        answerError,
      })),
    },
    services: {},
    // guards: { Focused: () => false },
    delays: {},
  },
);
