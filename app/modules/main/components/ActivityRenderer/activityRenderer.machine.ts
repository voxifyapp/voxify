import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

export type ActivityRendererMachinContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
  userAnswer: any | null;
  answerError: any | null;
  result: ActivityResponseResultType;
};

export type ActivityRendererMachineRestoreDataType = Omit<
  ActivityRendererMachinContextType,
  'startTimeInMillis' | 'totalTimeSpentInMillis'
>;
export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgDM9kgEYALOoBstgKwAaEACedt4A7CRe3uqeIQCcMSHOziGuAL4p-mhYeISklLSMrJw8-ILCRWIqklS8nNS8LOI8XBraSCAGRqbmljYIDk5unj7+QQj2tuok6g6us7ZxCUmp6SCZOATE5NT0zCLFW-nMkgoMsorKalqWHSZmFm29Pk7erh4x6t7eSaEAHM62I0Qzm8HnCPiiHli8USyTSGQw6xyBx2hW4fGRBUkADMCLhYNgWtdDLdug9EB51M4phFgT4fiEfjFnICEM4PK4SLYQvZZq55tClnDVgjsps8ii9uiAApcJSVM5yy6tPTErr3UCPRwudwRFkTML-SLRBYw5bwrIbXLbAqS-jSRh0NgACUqsDAxhYACc4ABXAA2xkJbRuap6iEZthI9MitO89MZzMCQPZnO5vP5i1hKzWotICoutpIJ3z8vkiqDKs6dzDfR8JB1wyTCA8wPrIQ8IJiGZhQpzlpIJfEhcHx1OZYuFfaqurZNr3nrQz8TZBHPiHbe3aSaRW+H0EDglj7OSJVdJGsQAFpbK4WVeOVEH4+nyFeyL++KbUU+CeSerrHYbybDwnFcOI4m8ewflsNlITNYULSRD9di-EohD2CpxB-UNZxCAEm1sFMXjZNMPGAhk4KPMVrWQtF+CQpgsJnc8EFcZxJhiCDBjpBl3g8FlgSpJ9IRNQVszfRDqNRfYZUVRiz3-Vk3BcdQYnsbx4lY6CVMA0Y2UjEJ1B+HlKUcdRXC+V8EKow4pPRe0GEdF1MODad5N6dsYijVx7HbbxuITfj6RII0IShTMKPE6yJRQkhqjYBQABkODkv9ejYrkoxCGM-LjHj+JiDksofYSBSzc1EU2QdbRSmtrxZbywjXTtNzK+CKrzccVELYtOucytfxrXCWVCQT1PeAjTPM5xLPagdeuHXqatnSDIz+a8flcZJ-jYgrhu5YKxumYD7DMiztyAA */
    context: {
      startTimeInMillis: 0,
      totalTimeSpentInMillis: 0,
      userAnswer: null,
      answerError: null,
    } as ActivityRendererMachinContextType,
    tsTypes: {} as import('./activityRenderer.machine.typegen').Typegen0,
    states: {
      WORKING_STATE: {
        initial: 'NOT_STARTED',
        states: {
          NOT_STARTED: {
            on: {
              FOCUSED: {
                target: 'WORKING',
              },
              RESTORE_DATA: {
                target: 'RESULT',
                actions: 'restoreData',
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
          RESULT: {},
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
        | { type: 'finish'; userAnswer: any }
        | {
            type: 'RESTORE_DATA';
            restoreData: ActivityRendererMachineRestoreDataType;
          },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      startTimer: assign(_ => {
        return { startTimeInMillis: dayjs().valueOf() };
      }),
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
      restoreData: assign((_, { restoreData }) => ({ ...restoreData })),
    },
    services: {},
    // guards: { Focused: () => false },
    delays: {},
  },
);
