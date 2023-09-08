import { createMachine } from 'xstate';

export const pronunciationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5MgFTIEEAZAYgHUB5AJQGlKBxAbQAMAXUSgADgHtYuAC65J+MSAAeiAIwAmdQDYSmgJw6AHABYDAZm2bNAdlsAaEAE9EmnYJK6dOg+tMArMYWpjqapgC+EU5oWHiEpADK1HQc1ACiACJMFGzUAPrs3HxCokggUjLyispqCFq6+kZmltZ2ji5uggYkPj5BxoIW6kPG6lExGDgExCTJqRnZKrCy6LJgJOgAZusATsgBgoJETLHTCXMpaVmlypVyCkrldVoBpvohw1Zvxh2uCGMSOYDCCTAMDLZzBMQGd4rMGGRkukqBReEwAAocNgAYXSiUSt3K92qT1AdU0RxIglCBnCpkEtkEv00Tn+mgCPXZR10-gMxgCFgM0NhM1ICKRKLRuQKRR4qMJEmkDxqzy6nmpvjpDKZthZnQQFkGVKORwsJkFDJ0wqmcLFiIykqYADU2GRcfkOOlsWxeFRaGwKPkAGJ0MgMBUVJUk2pqqk0rWM5ms2O2Q5HdwGIaaL7WuKikiYnF4xJZJie+ZpCPEx4xhC2CyeNOCGwBLQedTJhDszlpnnmfmC3PnWYut3pD1en1+sgB4Ohhil8tXahVqM11V1hskJsttuCDv6imeVMmjNZnPRGE2-NLhZ8JirqrrskaI49ULMo72TN6tndbcms2OhWMBdhRJe+CSBAcDKCKCR3GuKovggAC0OidmhQ62uQ06MAhT5IaoGgjO8ARhKYqahBRpimJ22gBCQJ6mhClFjFh+YVos+HKqSRH1Ba+g6GR6giT8gy-m4Wi9H0358mMAQBOxFzig6fDcdGG6mBJCCZtuTaGhYqYchYSmzIWuL4lk6nPnxAQUvoAS2JmzYDsYbl0RyjG9jovIDkKl5wSOrrup63q+jQM6BiGYZWUSiG8XUgQ9LYYwNoIraZgpBh0fuDmnr457qCZAXXhct5pGpcUEQliDGD5+hDFowQWBygjoYeTIAdyRVWP4bngREQA */
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
        always: 'INITIAL',
      },
    },
    schema: {
      events: {} as
        | { type: 'WORKING' }
        | { type: 'NOT_WORKING' }
        | { type: 'PROCESS' }
        | { type: 'VOICE_RECOGNITION_FAIL' }
        | { type: 'RESTART' },
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
