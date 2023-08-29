import { createMachine } from 'xstate';

const m = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOkIHcACWAF3RrEoEYywrb7GmBiAUQDcw+GswDaABgC6iUAAcA9rFw1c8-DJAAPRACYALAGYSAVgBsTJjoAcVnaYCcendYA0IAJ6Im9lgHZL4r5Wxsa+zvbGOgC+UW5oWHiEpBTUdAzMrOxpXHyCwmJM0kggCkoqahraCPpGZhbWtg5Orh66VuIkOgFBIWE6ETFxGDgExJmpnJQ6uUIiFuISRXKKyqrqxVUAtD4kenqBBnq+BlYOxnpWbp7VviTivfY6h84G9vYGBjGxIPjyEHAaeIjJIaUqrCobRCbJivXb7Y5HE5nC5XKGWPQkAziSxBIJvR6mPSDEBAxJjFIcdJMUErcrrUBVEKdXz2KxBRqOZyXVoIUxGAw6YwGc7GcTifo9Ymk0bJNgTKnjSlcGllNaVLziIw6Flsmx2Tkta7eDp6Uw6QLBULhSJS4Zk2VZSYsCnZKYq8H0rSIPRvEhWJwGdn6gOohBMUV+wXC1mBa3Rb7SpKK106d109UIJwmCUwmH2Xw++6hzYGUx+7Ha-ahU7GNnGL5RIA */
    states: {
      'new state 1': {
        states: {
          'new state 1': {
            on: {
              'Event 1': [
                {
                  target: 'new state 2',
                  cond: 'New Guard',
                },
                'new state 2',
              ],

              'Event 3': 'new state 2',
            },
          },

          'new state 2': {},
        },

        initial: 'new state 1',
      },
    },

    initial: 'new state 1',
  },
  {},
);
console.log(m);
