import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAJgDM9kgEYALOoBstzwA4f9n3V1VwAaEABPOwBWAHYSLyj1W2d7VxifZw8ogF9ssLQsPEJSSlpGVk4efkFhSrEVSSpeTmpeFnEeLg1tJBADI1NzSxsEByc3T28PPwCg0IjEe28SJNTndRiolOdnW1z8jBwCYnJqemYRKtOy5kkFBllFZTUtS36TMwtekdsopyjXB4YjEAJwgmKuHweexZMKRBDOKIeeK2VwgnzpHwgpGxGL7EAFI7Fa7nCrcPgk8qSABmBFwsGw3Tehg+Q2+iA86mcKy8rgBmXs2NctjhiEyrhIthiqXsUXRqIywPxhKKJ1KpMuFIAClwlA1HnqXj09CzBl9QD9HC53F5fP5AsFRaMNi5UeCQR40lE5bYPMrDqqSmdypr+NJGHQ2AAJBqwMDGFgAJzgAFcADbGJm9d5m4aILG2EgYxKowV+XYeJ3iyXS4WpD0gxH+f2FY6kA3PUMke4d-XyQ1Zk0DT550a-Eg21EOCGuWVRJ2xKIkcGe-xRKUg2WuFtEk698Rd-d3B7956DvqmkfssdLyd1mdzhfjtKexsxDxg4W5PIgfD6CBwJYKptsyw5shaiAALSok60Hbj+wHEuqIaVHwoGsua1h2PM8LQhOYJghkILeNKWI7oGlIXKh1RCJc9TiOhubXjEIoLKMnokPy0weJ66gZAC8EHK2SHBlR5L8MhzCMVeEEIK46zLn8OzqFsqSJPObGIuoy4Efa6JRBkzYIQGbaUWSVw6oa0ngVhCJuC46ibr6ML2DE6hLDEVZeCQbn+M46Jog4KSCQSJkiTc5kUuGDCRjGDHZpeNkjO+IJFrOtZyuu8kglWGL4YRwKZYCs7kaZkmRfwTRsAoAAyHDWZhIzrFKRYQtigTCkioJViCEpteCgReJkgT2KVxL7qGDWjjBbHpcu77epyKkfuko3GcJe6nioXY9lt8VDhho4sQu9jct68qubYHobDk627u2e2HntU3XgEhYZG6oJgl4PGVmxfwSip7rBKkC3ftkQA */
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
    guards: {},
    delays: {},
  },
);
