import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIwA2AMwkA7NoAs2gBwAmTQE5LZs5fWGANCACeiMwFYz+j4MG29Y0sPbQ8AXzDnNCw8QlIAZWo6DmoAUQARJgo2agB9dm4+IVEkECkZeUVlNQQtXQNjcysbOwdnNwQzfxJPP0FLPUtDQxCIqIwcAmISROS0zJVYWXRZMBJ0ADNVgCdkX0EiJmjJuJmklIzi5XK5BSVSmsNNQRIPdQ9NJ8tNE2CzbXa7kMJhImjBmj0ZhMgj0ENCmjGIGOsWmDDIiVSVAovCYAAUOGwAMKpeLxK6lG6Ve6gGqwvSvbTqf7DJ56N4A1xAkF9PwOPwmCECxHIqakNEYrE47J5Ao8bHkiTSW5VB6IJ4vN4fL4-P4cjomdSvHnaRkDfx6EzCiYosXotKSpgANTYZGJuQ4qUJbF4FDotDYFFyADE6GQGAqykqqdVEHSGUyjMMIezAbVfiRDNYBiYTB5fpmEYj8JIIHBlCK4tco3cYwgALSaVMNkg81utvRWmKi8hUWiMKsVGuqhCGMypsyGQ1M-aCbRmdSBKGdk7TWYXdID5XU1SIE30vSz96mfoH7TfceGengsHQ5NGDyGZc2kji+18TfR4c6QwZkzGZ5eJmXRjpynSji2JgmnOHhssE6hMk+3b4kSJLxBkH5DjSGizt4ELqLmOGCMYegXiCM6CHyggChahbjF2pzOq6qTup63q9mQAbBqGDDoRS1YqlhtQ4aCej4b4c5EdoJGgfhlgkFmwT8lo3z-BEERAA */
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
        },
      },

      PROCESSED: {},
      VOICE_RECOGNITION_FAILED: {},
    },
    schema: {
      events: {} as
        | { type: 'WORKING' }
        | { type: 'NOT_WORKING' }
        | { type: 'PROCESS' }
        | { type: 'VOICE_RECOGNITION_FAIL' },
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
