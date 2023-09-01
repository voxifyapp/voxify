import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

export enum EventTypes {
  CHECK_ANSWER = 'CHECK_ANSWER',
  FOCUSED = 'FOCUSED',
  UNFOCUSED = 'UNFOCUSED',
}

type ActivityRendererContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
};

type CheckAnswerEvent = { type: EventTypes.CHECK_ANSWER };
type FocusedEvent = { type: EventTypes.FOCUSED };
type UnFocusedEvent = { type: EventTypes.UNFOCUSED };

type ActivityRendererStates = FocusedEvent | UnFocusedEvent | CheckAnswerEvent;

export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDkB5AFQH0BlKgQQCUqBRAEQGIAxCgYQCqdTgG0ADAF1EoAA4B7WLgAuuefhkgAHogBMAFgCsJXeIDMARjMA2UwE5DhhwBoQATz26AHCSOXd1na2pl6GAL5hrmhYeISkAOoUzADSAJJkAOJcgmR8QiIcEtJIIApKquqaOggGxqaWNvaOLu6IXhYkhuLd4oYW+tZe5tZmEVEYOATEJAAKjMKcvAILhVKaZSpqGiXVtSbmVrbiDk6Grh4IVrokPeKHdnYWdnfWEZEg+PIQcJrRk3HrRSbSo7RAAWms53BxgesNszV0FjudjGID+sWmlFoDBY7A4gPKWyqiH0uihNT6JAsAHYgl5EXZdNTqV59PpUeipgkkmlMgTgdtQNV9OJrtZjmZDPogrpDOKrOSLIZqSRqQFlfoaYZJRZdKN3py4rN5gV+RVBdoSWTWpclSQhg87syzHZLE83mEgA */
    initial: 'NOT_STARTED',
    schema: {
      events: {} as ActivityRendererStates,
    },
    predictableActionArguments: true,
    context: {
      startTimeInMillis: 0,
      totalTimeSpentInMillis: 0,
    } as ActivityRendererContextType,
    tsTypes: {} as import('./activityRenderer.machine.typegen').Typegen0,
    states: {
      NOT_STARTED: {
        on: {
          [EventTypes.FOCUSED]: {
            target: 'WORKING',
            actions: ['startTimer'],
          },
        },
      },
      WORKING: {
        on: {
          [EventTypes.UNFOCUSED]: {
            target: 'PAUSED',
          },
        },
      },
      PAUSED: {
        entry: ['pauseTimer'],
        on: {
          [EventTypes.FOCUSED]: {
            target: 'WORKING',
            actions: ['startTimer'],
          },
        },
      },
    },
  },
  {
    actions: {
      startTimer: assign({ startTimeInMillis: dayjs().valueOf() }),
      pauseTimer: assign(context => {
        return {
          totalTimeSpentInMillis:
            context.totalTimeSpentInMillis +
            (Date.now() - context.startTimeInMillis),
        };
      }),
    },
    guards: {},
  },
);
