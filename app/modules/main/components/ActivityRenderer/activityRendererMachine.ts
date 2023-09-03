import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

type ContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
  userAnswer: any | null;
  result: ActivityResponseResultType;
};

export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgDM9kgEYALOoBs72wFYAHADsfgCcngA0IACedj62JOoJCfZ+bh7BAbYBAL5ZEWhYeISklLSMrJw8-CX0zJIKDLKKympalgZGpuaWNggOTm6e3v5BoR4R0QjOPs7xierJqemZOXkYOATE5NQ15dx8W6W1AGYEuLDYGtpIIO0mZhbXPf7qJB4+HrZvvoEhzuOIzhSJEy9lcrmc9kWGWyuRA+XWRQOOxElRIAAUuEoVDJ5FiWlc9IY7l1HnZHC53F51N8RuEonZ1DMfHMFq40tCVnC1oVNtUyij9tJGHQ2AAJbGwMDGFgAJzgAFcADbGS5tImdB6gHqBOJswJfYa-f6TIEgsEQqHLWHwnmkRp4gX8er25o4poqVXXW4a7p2XwkSm+Y1suLMxKs9lW1YFDZ23HNR0kF3Y53xj2tL3q+6+3r+wM+YPOOJzeYpNlLGGw-D6CBwSw22NqjrZ0kIAC0tlcxo7rk5DcRfOYjqbxM11jsXfpCA8Th8fe5saR-Iq+0EwgqYhUI59rYyxt8oZZZcjMOjCN522Xeyql+Y25bWsQ9lCJB8etCNJCdImzg8flm4bHhW84xgOt67KiGJ4veJKPpMbguOowTPtShqjMaUwBPEfiOPYARuH48zqP4IHnsU4GJkKDAiuK4gwWOPQBK4wQBnh0yxGhfxTrY6iuK+R6WqeXKgRehwQfsVC8GwCgADIcPRObOAkWF6gEBo-MEXETDxfFhkkQEctaC6Ism4jDpmzaweOvSThM9idvxgGCaRtpJmmZkrk6DTuQpu62IW-7qDhjj4a4hH2J4LmLqZlE+RZo45skcQpL4UyfuhU6uDxr7BXhBFER4OQ5EAA */
    context: {
      startTimeInMillis: 0,
      totalTimeSpentInMillis: 0,
      userAnswer: null,
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
      setResult: assign((_, { result, userAnswer }) => ({
        result,
        userAnswer,
      })),
    },
    services: {},
    // guards: { Focused: () => false },
    delays: {},
  },
);
