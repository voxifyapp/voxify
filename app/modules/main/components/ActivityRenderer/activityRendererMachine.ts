import dayjs from 'dayjs';
import { assign, createMachine } from 'xstate';

type ContextType = {
  startTimeInMillis: number;
  totalTimeSpentInMillis: number;
};

export const activityRendererMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHUB5AJQGkBJAOQHEB9AZQBUBBDgURIYUO7blT4ARAMQAxCgGEAqm17iA2gAYAuolAAHAPaxcAF1z78OkAA9EAVgAs6kgCYAzPdfP7t5+oCM9gAc9gA0IACeiJ62JADsjra2gbHqAGyxrqkAvllhaFh4hKSUtIysnDz8JfTMkgoMsorKalqWBkam5pY2CACc6k5+sX6BfuqeY-aprmGRCK7qsSQDK+q9zqlBm7Y5eRg4BMTk1DXl3HzHpbXSjHRsABIa2kgg7SZmFi89tr2uy36JewpH7qWzDWaIAF+ZarTLOeF+TyBXYgfIHIqXU4iSokAAKXCUKhk8kJLWeekM7y6X0Q62cLlGfmco16vQCrkCEIQzlsqRItlhgX8yVi2VyqP2hSO1TK2IuNwYd3uROUwiovDYCgAMhwnm1KZ1PqAer4nOMmRzmb1UqCglznMM4gKBs4Rt4hrEUWipcUTrKKhd1ZqdZIg7xda0Xm9Dd07GM4uM0qlmYk-Ot7Y7Ys71K7grYPV7JYdSI1SXL+PVS81iU0VHqowaPrHuTySI5k65rWlAjz0xE7I44vZWazYoFtm5CwViyQqypy7OSdXK0u65GKR0mzSWzF224u6kez9nFzh04eSsNqk3a4dij8PoIHBLN7i-rN9TjYgALReLm-+wYRWQJfk8RZhk9cVXwxGVmHLd8qSNaxED-fsEGmNsR16fNMgGNNeindFpT9OCA34QRhAqMQVAQmNt3cXp+WTIJRlcMd0l6LlXAWIcsIWNkNjBQifUxf1ziqEimForcvwQYFlmYoYESmHx7Q5Fxs0SXoQP8eJhJnWCzhxfFSWkz9kIQMYwX5Mdxm4tjAh8WJ7VSGJ1ECezUlcn5Yn6O89mnGDJIXBUlRohsPyQnpYhPNCASWdzPKBaYAliSCAqI30riMwMNW1DgzKiqJ4hIHshRAvxXMCRzOTQh16QvF03XzNL9IxOdxHgiLEObVC5kcel4hHewhl5TxnDao4OoXFda3EQrmxi09rRIezuNTH57GHfyJUCqbV06sjFzmhb6J7UqmSmDY3GmeFUmWwJSrWjbei27CchyIA */
    context: { startTimeInMillis: 0, totalTimeSpentInMillis: 0 } as ContextType,
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
              FINISH: {
                target: 'FINISHED',
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
              SET_RESULT: {
                target: 'RESULT',
              },
            },
          },
          RESULT: {
            on: {
              RESET: {
                target: 'WORKING',
                cond: 'Focused',
              },
            },
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
        | { type: 'SET_RESULT' }
        | { type: 'RESET' }
        | { type: 'FINISH' },
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
    },
    services: {},
    guards: { Focused: () => false },
    delays: {},
  },
);
