import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

export type ActivityRendererMachinContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
  userAnswer: any | null;
  answerError: any | null;
  result: ActivityResponseResultType | null;
};

export type ActivityRendererMachineRestoreDataType = Omit<
  ActivityRendererMachinContextType,
  'startTimeInMillis' | 'totalTimeSpentInMillis'
>;

const initialState: ActivityRendererMachinContextType = {
  startTimeInMillis: 0,
  totalTimeSpentInMillis: 0,
  userAnswer: null,
  answerError: null,
  result: null,
};

export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgAsADhIBGe+oBsAZnUu3AVkcvW38AGhAAT0R7AHZ7EliPf384v3VPGP8AXyzwtCw8QlJKWkZWTh5+QWEKsRVJKl5Oal4WcR4uDW0kEAMjU3NLGwQHZzdPHz97QOCwyMQXfw8SGa9-Nfs3WxdHFxy8jBwCYnJqemYRStPS5kkFBllFZTUtSz6TMwse4Zdt9RXFoFHABOLwxGJg2zhKIIewhEjqGK7LxgjypTz7ED5I5Fa7ncrcPh4sqSABmBFwsGwXTehg+g2+Cz+AOSjhBYIhMSh8xGSJIHhC6UyO0RtiCmOxhROJXxlyJAAUuEp6o9lS9uno6QMvqAfg4vCRgUbQTFEb51CFoYgwfEUsjHOl1F5pvYPBLDlLimcynL+NJGHQ2AAJeqwMDGFgAJzgAFcADbGGk9d7aoZM+zxWzAjxBOFeDzZrlWhCLFwIx1Op1I4HgxzugrHL03AlXRpsBQAGQ4DSaog4Sc1-U+aYQ-k2KwF-m2wPUjgLGeLPn8CRiSQd6nWQQh9Zx0u9FwqRLbfZJA96WuHjIQjin-JiOznwKcY489kXLgNPiNs9+vn8vh3T1iQPQl+GPLgxFPFwNXPIcGV1RAxzLJYQmnWd5zfHk1mXGskhSJ8p1sWwYkAxsSFVZ5fRIe4KJVeQ1TPFNLwQkZ4XcAVXSdNl8xSYsc3iXDAhcOIkhCOtcixD0yNo8QqJku4Hno55GIveDrDsNjPAcDwuKCJIYj450VzXfwayfHTskxfB9AgOBLElRtaTgnV1IQABaBxiw8g1jV8vzgTnUjcRlH1D14Jz6Rc4ZPJ5bwVgrUsQScGc3Qkhzgv3FsiWqS46nECLUyvIseRcGd+UcewZ1KpI-FsIK92bKiQuYArmNclx0mXdiQlXCr0jRYss3iRIlkcYiZ2ddR7HqptZTCkhFTVVq1J+MFgRILMc2CNZMjhRcglcDw3FNAVdhBVKDgbDLGvm-0GEDEN8uTVSooWNaNuzIJbB2sduRhHZbBIL8JotFFpm3NKpOuubQJINtOw4ZbXtheFgXWD9hPnV8XA8YthPWh1vx8b7nRSGbgKysDewgjgyiRkdTWGrSc242xfFxrC-BWUyQQBtFthIyGrpOGTfXpq8YphF9DVXZIvGEh172BcnRfmmilJUcWWOKmFX3+ZIjR2HSISm8TLt3UhVdhmStdcrwxpIXYHBrNm0bFP7EFfA0N0NudER8JwchyIA */
    context: initialState,
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
        // | { type: 'RESET' }
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
    guards: {
      Focused: (_, __, actor) =>
        actor.state.matches({ FOCUSED_STATE: 'FOCUSED' }),
    },
    delays: {},
  },
);
