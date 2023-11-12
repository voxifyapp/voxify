import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIyD1AThIAWAGwAOA9u0AmIwHZzVgMwAaEAE9EdowFYSHo3cvqbLT0dPQBfUKc0LDxCUgBlajoOagBRABEmCjZqAH12bj4hUSQQKRl5RWU1BE07dRIDPUEDQSsPRsE9bSMnVwQ9OwMSQV86s01BLQMPcMiMHAJiEgSk1IyVWFl0WTASdAAzHYAnZA9JoiYohdjlxOT0ouUyuQUlEurNU28rI3Umj3Udla2isvUQv28k0mAXURm0AUasxAVxiSwYZASKSoFF4TAAChw2ABhFJxOKPErPCpvUDVcyaYaGEyDbQjLR2RwuRDmDy6cxdMwWJqw7QzCLI+ao0jozHY3FZXL5Hg4ikSaQvSrvbkMzrGAwstmAzl9AaCfSC6xGU3mTpiubRRbSjGpOVMABqbDIJJyHBSRLYvCotDYFByADE6GQGKrSurqVVtWbdczTIaOWCEDazVYBb5tHoBupeUiUY6SDKXXwmL6VskY1TXgnMzqmfrU0Z2ca3FZdIKzB4C+ojX8S5KywTiaS4ulq6S7tR63HG1qEDmzQL8wNzDbzPCMzy+RuhVo4XaJQ6bh6vSkfX6A0GyCHw5GGDOa-PF+Vl7TEGvzWYCz8Hc9y5TNJhIHMzDzQCi20UcLyWd9VirOgw1SDhb1rBcRCeJdNR-GotF0VszEsGx7H3XkSH5Pt+RPfNwnFfBJAgOBlFLWJcK-fDVEQABaAwMwE+DriWSgaHoBguI1GleIQU9vA8Gw6laQR81sDNTRIPtLWtW0RKlW5VnSaT4xXdR6S8FptCBOo4VsaYM3cbMOSBDw7HsGybLCcUOLRZ0sT4UzvzkvRzE0gISFcwZYWmKwpjPPzSAnEkyRMyk8Nk6p3LNHkrCsRp7B8G0PEo3RIMFOiRR8+1RNIK9vV9f1Awkp8IyjdK1W4rLEEMcrfnpRo9CtAIuzA+oaO6OxNzqYtfLHG4kOSIKMu6ptrAmwQ6nMUwBw7Royog3N8psnR9R88IgA */
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
          VOICE_RECOGNITION_FAIL: 'VOICE_RECOGNITION_FAILED',
          RESTART: 'RESTARTING',
        },
      },

      PROCESSED: {
        on: {
          RESTART: 'RESTARTING',
        },
      },
      VOICE_RECOGNITION_FAILED: {
        on: {
          RESTART: 'RESTARTING',
        },
      },
      RESTARTING: {
        on: {
          AFTER_RESTART: 'STARTED',
        },
      },
    },
    schema: {
      events: {} as
        | { type: 'WORKING' }
        | { type: 'NOT_WORKING' }
        | { type: 'PROCESS' }
        | { type: 'VOICE_RECOGNITION_FAIL' }
        | { type: 'RESTART' }
        | { type: 'AFTER_RESTART' },
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
