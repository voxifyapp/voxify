import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIwA2AMwkA7NoAs2vQFYANCACeiAEynb+0wF9nltFjyFSAZWp0OagBRABEmCjZqAH12bj4hUSQQKRl5RWU1BC1dA2MzSxsEW0FHe1d3DBwCYhI-AOCwlVhZdFkwEnQAMzaAJ2RTQUEiJg8q71r-QNCE5RS5BSUkzMNNQRJTdVNNewK7QwAOEk1jk9OTgE5ykFGvGoYyPyCqCl4mAAUONgBhIJ8fGaSczSi1AmX2hlMR32+Wsdls5xIhi0ZzOlzc10qt1I90ez1eEWisR4LwBEmk83SS0QKzWGy2O1hCH26nWgzZ7LZ6lc6PwkggcGUN2qRFm5OBGUQAFpNLsEJLIedFUrlUr9porkLxpQaPQGKLUgsJQhDLZZbYkSR1GV0ZqanUpiF9RSQapENoTPpBNorRZGea9EcUSi0RVPMKSDjgnineKqQgdIZEeCTL7CupzrokUHTiGMWHxh9vr8fKEY4a4+c9AiDnlU3CEedkdnNGjXEA */
    initial: 'INITIAL',
    tsTypes: {} as import('./pronunciation.machine.typegen').Typegen0,
    states: {
      INITIAL: {
        on: {
          WORKING: 'STARTED',
        },
      },
      STARTED: {
        on: {
          NOT_WORKING: 'INITIAL',
        },
        after: {
          500: { target: 'LISTENING' },
        },
      },
      LISTENING: {
        on: {
          PROCESS: 'PROCESSED',
          NOT_WORKING: 'INITIAL',
        },
      },

      PROCESSED: {},
    },
    schema: {
      events: {} as
        | { type: 'WORKING' }
        | { type: 'NOT_WORKING' }
        | { type: 'PROCESS' },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  },
);
