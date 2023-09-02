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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAFgCcARhKOA7I4AcrgKwAaEACeiADMPiSu6sGOAEyOnt7B6tGuwQC+qf5oWHiEpJS0jKycPPz59MySCgyyispqWpYGRqbmljYIHh7qJABstuo93kNu3q4ejv5BCMHe0SS2CTFxHglJKemZGDgExOTU5UXcfHsFFQBmBLiw2BraSCBNJmYW9+3ejj3hfoGIju8bICy21yJwOIhKJAAClwlCoZPJYfU7npDE9Wq9EPYkl91JF1O8fGMJj9pupnPZFrF4olkmkMoCtjldmVCuDjtJGHQ2AAJOGwMDGFgAJzgAFcADbGW6NVEtF6gdrRXEkSIxb5TaL2WzzVyDbweHorGnrelApl5fas4rHKi8NgKAAyHEktuUHGl90ecradicLncXnVITcJCVUSpRrWdM22R2pBqiLZ-CqCbq8NqKg9KOazx9CGi0W88wGhcmiH1nzDS2pawBZrjJFTKiTjYRaZTbczDU9stzGPzheLPVLJISRYi4eWq2S6Xp+H0EDglnruRlOfRCsQAFporYywgd7Y64yGyzmEm12j5dZELv9z1giRvMfYyCz4cIYJhMUxCpL97+2CRIVXDINpl1UNVQjacTRjYFmUtc9rVKRCmH-PtNwQQ0i0pLoCVGcZ92iDxHwnatI1pF94ItU4P2OaFEXQjcbwQRxIg8FVbB6LFhkJQiSSiboEj6bwFk8B8ekcKjzVBK0jn4DkGC5XlxCY692lcaJ9zcewSC6ewPC1bxJN1HwPGk09UJbV1HQ4NS8xmItNUNHx9yiVxwigqdjWjBlX12JtxAvHt13U289xJWxbA4qtoJ8iyQUClsOwzVSQqvPNNP3UTnDGESxINYJJISgLOyC5DW1S+zAI8OZxl3DxbFcWwlnULVsqi0MDQWAqJKk2cgA */
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
        | { type: 'set_result'; result: ActivityResponseResultType }
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
      setResult: assign((_, { result }) => ({ result })),
    },
    services: {},
    // guards: { Focused: () => false },
    delays: {},
  },
);
