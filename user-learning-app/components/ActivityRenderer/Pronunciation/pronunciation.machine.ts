import { createMachine } from "xstate";

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIyD1AThIAWAGwAOAOwGzAJgvajAZm0AaEAE9EtowFYSHu3vUftWw8LA3V1AF9wpzQsPEJSAGVqOg5qAFEAESYKNmoAfXZuPiFRJBApGXlFZTUETVt1EgM9QQMDbWCLHR8nVwQ9WwMSQTsg7XUusO1I6IwcAmISJJT0rJLlCrkFJTLasM1vfxN1WxNtVvaTXsQjRr1tB88Q7QsTMwMZkBj5+JIGMiSaSoFF4TAAChw2ABhNIJBLrMqbKo7UC1LqCYaGIymNrqYxGCzXBAWAIkEmCCkmQQeAKmPQeT7fOKLf6A4GgnL5Qo8EEIiTSLbVXaIdGY-HvPHYwkuRADDEeClac4eQahBlRL5zZmkVnpdlMABqbDIMLyHDSULYvCotDYFDyADE6GQGHzygLkTURQdBFicaF8dK+hYKSQTPdtG0DB4JnoLEFGVqFjqAXq+ExzctUm6kdsvcSfX6JYGie4MYrBCYfOYjIJBonYsmSBDobCEpkM7DktmRBsPXnhQhw-LFQN2iH6USSbpyZTqbTw+rZo3fkaTWkzRarTayHbHc6GB3M93qDn+0LUYhh95R4MXr6PFPQ+GHlGYxY4wmNUym8eVum6AddIOE3LNT17RFzxRVQNCVfRjDMSxrDsRwZWJUlZ0recbEXSINXwSQIDgZQf3iPtKgHS8EAAWgMIlaOGCsmMVCwjAbH5FkoGh6AYcjBWg2ojA6bwPBMWw408Ax7BCIkBkaCsdGpVV-HY7UlhPTI+M9QcJn8JpBG0QwQypEwrCDNxazDWxrKk1iVQGVSm11IE+C0yiYP6cz+nUEwSGs-yhPUOlmiXTUV0WFsYThTTIIoi8PJVDESRMOwJlec4rCnUkq0VKkaRw+lHNXY1TXNS1rW4vcnRdGL+TigTZXaMNblY2wP0GMSOifRoP1fNp30-ULSMWP9Ulc2L+PzUwerrCZaT8YIjCy3QcrnfK6XVSIgA */
    initial: "INITIAL",
    tsTypes: {} as import("./pronunciation.machine.typegen").Typegen0,
    states: {
      INITIAL: {
        on: {
          WORKING: "STARTED",
        },
      },

      STARTED: {
        on: {
          NOT_WORKING: "INITIAL",
        },
        always: "LISTENING",
      },

      LISTENING: {
        on: {
          PROCESS: "PROCESSED",
          NOT_WORKING: "INITIAL",
          VOICE_RECOGNITION_FAIL: "VOICE_RECOGNITION_FAILED",
          RESTART: "RESTARTING",
        },
      },

      PROCESSED: {
        on: {
          RESTART: "RESTARTING",
        },
      },
      VOICE_RECOGNITION_FAILED: {
        on: {
          RESTART: "RESTARTING",
        },
      },
      RESTARTING: {
        on: {
          AFTER_RESTART: "STARTED",
        },
      },
    },
    schema: {
      events: {} as
        | { type: "WORKING" }
        | { type: "NOT_WORKING" }
        | { type: "PROCESS" }
        | { type: "VOICE_RECOGNITION_FAIL" }
        | { type: "RESTART" }
        | { type: "AFTER_RESTART" },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  }
);
