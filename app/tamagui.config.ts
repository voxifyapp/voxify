import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

// Defining the main colors
const blue5 = '#1b69e4';
const yellow5 = '#FDDC38';
const orange5 = '#FA4D1D';
const pink5 = '#FBC3D4';
const green5 = '#009E5A';
const white = '#ffffff';

// Defining the color gradients for the colors 0 being the lightest and 10 being the darkest
const blue10 = '#09234C';

// Background colors
const bgYellow = '#FEFAF1';

// Text colors
const primaryTextColor = blue10; // Used in place of black. Really dark

const appConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      blue: blue5,
      yellow: yellow5,
      orange: orange5,
      pink: pink5,
      green: green5,
    },
    size: {
      ...config.tokens.size,
    },
    space: {
      ...config.tokens.space,
    },
    radius: {
      ...config.tokens.radius,
    },
  },
  themes: {
    base: {
      // Screen properties
      background: bgYellow,
      screenPadding: config.tokens.space[4],

      // Primary color
      color: blue5,

      // Typography
      primaryTextColor,
      highlightTextColor: blue5,
      backgroundPress: orange5,
      inverseTextColor: white,
    },
    base_Button: {
      background: blue5,
      color: white,
      backgroundPress: blue10,
      disabledButtonBackground: '#cccccc',
    },
    base_FillInTheBlanksButton: {
      background: white,
      disabledButtonBackground: white,
    },
    base_Progress: {
      background: '#666666',
    },
    base_ProgressIndicator: {
      background: '#eeeeee',
    },
  },
});

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
