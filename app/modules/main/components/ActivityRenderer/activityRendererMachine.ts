import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgAsAThKOAjOtcB2VwFZ1ADk9-R3UANgAaEABPRABmdWdg-3t7V1jXe1DHT1tPAF88yLQsPEJSSlpGVk4efkFhGrEVSSpeTmpeFnEeLg1tJBADI1NzSxsEdUiYiYKijBwCYnJqemYRWuXK5kkFBllFZTUtSyGTMwsB8dtY2JIMsPt1Wx9A4LCpxF9XEnVf39j-Bksjl8oUQMUFmVNqtqtw+NCqpIAGYEXCwbB9E6GM6jS6IF7qEihHyhWzE56vNwfBCuQEkXKxFJpIHZXKzcHzUpLCow9bwgAKXCUzX2wqO-T02JGF1AVxud0eoUeFKCIQi0TsHhIfj+AJZIPZEK55RWVT5-GkjDobAAEs1YGBjCwAE5wACuABtjJiBqdpWNEIFbCRMoFyS9Va5qbTvgymelMqzQXMSotSKLDuaSLsMyL5GKfZLhucAwhbA4SICvOp0q9SbFqT5bM50l57C86wFDZy0yRc+Is-2dnt84dC4MpSW8WWK1XPDXaUF69T7EFK642x2l+pPD4CmD8PoIHBLEa01ji7jZYgALSOdXTG9tlyOV-32k+eIM7upqE8s01HwF44jK1i3vY-jUjegQhm+77+J+TyeLEP6QtypprIBdRCOsTTiMB-rTjk1LPMGOr-ICiYGmCZ5-hhsIbP+zAEVO14ILEITaqGIQqm8D6fKE-g-H8NaUcCbI0T2dFbAxApCocLFXmBNIZHcCQcU8EZ8dGPieD8-g3LE3gQTW6gvKhxoIphcIWlatoqIpoHjJ4TghkZPi+LxVIamW6j2NqIl6lREkpmhJoyVmrRsAoAAyHCOaW7g7iGgmeOGlJRj5th+QFupiUmFm9v25oJdO1whmZ7a1ku5aOLY1Icd8rYuVu-ihDue6Sb+SzFVh2YjgcDm+pOSnOd8jw+FVi5tbVK7JJWjh+J4dW2BujiPMmHLdemo4qIOu34cNl5OXE-jBqty2CSkoTEmkPhzXpHFLSta0bfueRAA */
    context: {
      startTimeInMillis: 0,
      totalTimeSpentInMillis: 0,
      userAnswer: null,
      answerError: null,
    } as ActivityRendererMachinContextType,
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
      restoreData: assign((_, { restoreData }) => ({ ...restoreData })),
    },
    services: {},
    // guards: { Focused: () => false },
    delays: {},
  },
);
