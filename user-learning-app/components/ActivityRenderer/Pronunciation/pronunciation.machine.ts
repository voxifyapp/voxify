import { createMachine } from "xstate";

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIyD1AThIAWAGwAOIwFZtAdm2mDe7doA0IAJ6IAzGZKmjbtwYsATIIeFnoBAL7hTmhYeISkAMrUdBzUAKIAIkwUbNQA+uzcfEKiSCBSMvKKymoImm7qJLaCFiEWBtqGBk6uCHp+JII+fkb9JjrqppHRGDgExCRJKelZKrCy6LJgJOgAZlsATsimgoJETDFz8YvJqZklyhVyCkpltZodXhZGOm6mgUZBKYeogfl5TqdTP1gv0DAZpiBLnEFgwyEk0lQKLwmAAFDhsADCaQSCQeZSeVVeoFqAU0g0MRm0bj0-20RgCBjcIIQAXMJF5p18gj0gT0-QRSPmpFR6Mx2Jy+UKPCxZIk0me1TeiFpgnpxiZLKs7M53Oh4MFekZ2jh6n8EtmyOlaPScqYADU2GQiXkOGkCWxeFRaGwKHkAGJ0MgMVXldWUmraunC-XM1nGrkubWnEgWE5aYV6IHfS322JSkgyl18Ji+papGMUl4JnlJhkGtMcjO9Dy6iHBPy2Cy20Klq4LPGE4kJTI14m3agNuNNrUIUK6vOCTkmPSaKHc3m6AX94Wi8VRREO8ser1pH1+gNBsgh8ORhgz2vzxeVZfUxBr82bh4oy7no+7ZrmpyaGKRajEYo6OiQH7LNWdBhukHB3nWC4iI8S6ar+dRaLoDJmJY1i2PY+58keQoigEYpuJE574JIEBwMokrxLh374aoiAALTdJmCCCfB5aUDQ9AMNxGpUnxCCMqYXj-B4Bg2OoIpuBYpoNIMELMlaNp2uenELFhmQyfGK7qLSSkGIInRsmpULqOo3I9jmvh+BYQzBFYFhidclYYnwlk-vJYSmuoFgkF53nsuozLGTMZbXBORIkhZ5J4XJtSmG4uq8t8gSWAEoSWlRugQcedEMYFCzXt6vr+oGknPhGUZZWqPG5YghhVT8BX2Fow5gY0NHqD8AQBPYZ4pWOpBIakoXZT1zZGEO-LBNNVj-D4ASVTmea0aejFMUAA */
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
