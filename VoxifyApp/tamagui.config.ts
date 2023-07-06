import { createFont, createTamagui } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

export default createTamagui({
  themes,
  tokens,
  shorthands,
  fonts: {
    body: createFont({
      family: 'Arial',
      size: {},
      lineHeight: {},
    }),
  },
});
