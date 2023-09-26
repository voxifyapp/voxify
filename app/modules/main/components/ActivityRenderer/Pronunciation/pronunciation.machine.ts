import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIyDBAThIAWAGwAOIwFYAzIIDsVzeoA0IAJ6Jz50yUFG3ggEymbPW0rcwBfUMc0LDxCUgBlajoOagBRABEmCjZqAH12bj4hUSQQKRl5RWU1BE1fdRIDPWtfK1MDK0EDd0cXBHMzElNvc18zLzHfcMiMHAJiEgSk1IyVWFl0WTASdAAzTYAnZF8tQSImKNnYhcTk9KLlMrkFJRLqzStfEhGjXz0Pwy6gnMPUQRnqphOfm0bQMBnUNimIAuMXmDDICRSVAovCYAAUOGwAMIpOJxe4lR4VF6garHQSeQxGKxw3z+UzHXwghD+XT+LQtOzeIyI5FzUhojFYnFZXL5HjY8kSaRPSqvRB0hnGZnqVmmdl+Ln9emQpqdVrqPTmAwimYo8Xo1JSpgANTYZGJOQ4KUJbF4VFobAoOQAYnQyAxFaVlVSquqtJqmSy2RyuRrWid1PDBHozDqbdExSR8USSXF0kwvYtkpHKc9YwgQvSgtptMZBOptBbWanTLyIX5bO2hfnLvNXe6Up7vb7-WRAyGwwxy5WbtQa9G62qG5Z9C3W0Z2529N3nHH6emtJmOjnTHmIkjbYWV0s+Ew6MHUhwp1W1yIHhvVRpDQtF0RkzEsGw7B7T5IVZGwWz0IZJkRfBJAgOBlFFWJ-3KTcgIQABaAwuSIkc7XIWdGBwlVqVUUEBj1EJWWCIxtBzYFTz6A9dz3LwLAMX4rDIwsf3SaiYy3HVBA8AwdCCIwgiBVtiM4nwSF8NwRmhHUDGhbxhKuCVHT4cS8LohBj0NdoSGhflfkQnxrXvLD5mLYlSTEikANo6p9XUgIrBMLQOnMZke10C8BSHfoDLHN0PS9H0-RoOcg1DcNPKVXDAPMxCIrBDSmjqUYRlTdt-IzLMbzvaYCyuZ9khMrzsp80E4XUoF1AU48rD0RDOU4-xPmbFswUbECnPCIA */
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
