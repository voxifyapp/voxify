import { createMachine } from 'xstate';

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAEwBWABwl1ggMwBGLQBoQAT0RGD6gL53zaLHkKkGZAMrUAolQq8TBRs1AD67Nx8QqJIIFIy8orKaghauvrGZpaI2kYkmg5OGDgExCQe3n58TAAKHGwAwj6entHK8XIKSrEpmgBsmnpG2gDsmuZWCCZ9JAAsRn2LS8uLDo4g+JIQcMrOJW7t0p1JPYgAtH0T532FIHuuZZQ09AyHCV3JiLPqVwgAnAYSIJtAZQWDwQZZrd7qV3F5fP5eG9jt1QClZrYSEYRsMxr9piQ-gsVisRtDig9SHVGs1PHxkYlUapEH0-n8gUZ+llJgSiSSSWs7EA */
    initial: 'INITIAL',
    states: {
      INITIAL: {
        on: {
          WORKING: {
            // Responsible for recording the audio clip
            // also renders out the real time text recognition
            target: 'LISTENING',
          },
        },
      },

      LISTENING: {
        on: {
          NOT_WORKING: {
            target: 'INITIAL',
          },

          PROCESS: 'PROCESSING',
        },
      },

      PROCESSING: {},
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
