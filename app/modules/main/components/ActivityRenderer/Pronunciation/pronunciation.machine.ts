import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIwA2AMwkA7NoAs2vQFYANCACeiAEynb+0wF9nltFjyFSAZWp0OagBRABEmCjZqAH12bj4hUSQQKRl5RWU1BC1dA2MzSxsEW0FHe1d3DBwCYhI-AOCwlVhZdFkwEnQAMzaAJ2RTQUEiJg8q71r-QNCE5RS5BSUkzMNNQRJTdVNNewK7QwAOEk1jk9OTgE5ykFGvGoYyPyCqCl4mAAUONgBhIJ8fGaSczSi1AmX2glM+nUhls4PU5322nOmgs1jstnOJHOWm2+1MekE+32hnOeiuN2qpHuj2erwi0ViPBeAIk0nm6SWiBWaw2Wx2aIQ+3U60GorFovUrjcIHwkggcGUFO8szZwIyiAAtJpdggtSRxcdBGZzsYUeTKrdSJQaPQGCrUgt1QgYTrbIZheoytKlTU6lMQvb2SDVIhtCZ9IJtJ7UYU3XojmdE5pLt6LZSSNTgrTA2rOQgdIYSAc8jGNOddO6k6cUxVPOmPt9fj5QjnHXnSZjiyZS0UMVicVXk1LnEA */
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
