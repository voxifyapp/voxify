import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

// Defining the main colors
const blue = '#1b69e4';
const yellow = '#FDDC38';
const orange = '#FA4D1D';
const pink = '#FBC3D4';
const green = '#009E5A';

// Background colors
const bgYellow = '#FEFAF1';

const appConfig = createTamagui({
  ...config,
  themes: {
    base: {
      background: bgYellow,
    },
    base_H1: {
      textColor: green,
    },
    base_Button: config.themes.light_blue_Button,
  },
});

// Setup color palette
// Example:
// const dark_blue = [
//   'hsl(212, 35.0%, 9.2%)', // background
//   'hsl(216, 50.0%, 11.8%)',
//   'hsl(214, 59.4%, 15.3%)',
//   'hsl(214, 65.8%, 17.9%)',
//   'hsl(213, 71.2%, 20.2%)',
//   'hsl(212, 77.4%, 23.1%)',
//   'hsl(211, 85.1%, 27.4%)',
//   'hsl(211, 89.7%, 34.1%)',
//   'hsl(206, 100%, 50.0%)',
//   'hsl(209, 100%, 60.6%)',
//   'hsl(210, 100%, 66.1%)',
//   'hsl(206, 98.0%, 95.8%)', // foreground
// ]

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
