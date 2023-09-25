import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIwBmQQHYSmgCyadATh0AmYwfUBWcwBoQAT0TmAbIJLq3Pg29OaJgYAHDaaAL7hjmhYeISkAMrUdBzUAKIAIkwUbNQA+uzcfEKiSCBSMvKKymoIWrr6RqYWVrYOzq6CJiQ+veYG5jYmQebmkdEYOATEJEkp6VkqsLLosmAk6ABmawBOyDaCgkRMMVPxs8mpmSXKFXIKSmW1WgY2JObBWrY6Br+C5jpHC4EJ8SAZhsN1EEuoIoW5xiBTnEZgwyEk0lQKLwmAAFDhsADCaQSCRuZTuVUeoFq5kOJEEfmCOkEmn6HlsQNcQ3e4JMwQBrLco2CCKR01IqPRmOxOXyhR4WLJEmk92qT06ngZbiZLLZsJsnIQxm6EKCJk06h0mmCJnUosmyIlaPS0qYADU2GQiXkOGkCWxeFRaGwKHkAGJ0MgMJXlFWUmoa+mM5msvz6w20zw-CHBTRuPzamz22Likh4wnEhKZJi+uapGMUh4JhBWzwHQ5uMLJuwZ7n9Yb8q3uYXFs4zD1etI+v0BoNkEPhyMMau1y7UBtxpvqlvaEjtwSdwzanQ9joITMkbMDvMF0Kjx0kVfzPhMOhh9Icad19ciW6btXUhohzdMmbisnmUI6G4GYNKa-ImEMFjmHaCL4JIEBwMoYrxH+lRboBCAALTQWexH0ocFGUZROj3qWlA0PQDC4aqVKqBoUJvB45rMuouY2v8Ga2JevLmrYgTBD4tHnN+mTMfG27qCE6j6OogzarSBhdOo6iCeYPS9Hm-L+LmeZSSizoYnwcn4WxCADIaJhtiJYE6Kpmg2AYNFRIiDqluWRIkrJ5L-qxtR2J4gw6KEJj9LxQrtMCgzdFeg6CiO3nYeOnrer6-qBgxC4RlGQXKnhAG2a8yWfOYtrBFpsKaDByn9te+Y+HeGW+ecT6pFZwVlaFiASc1uqHK8HktDBwRgqaNgnuaAJhJEkRAA */
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
