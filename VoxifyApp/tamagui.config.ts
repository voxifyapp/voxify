import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

const appConfig = createTamagui({ ...config, animations: undefined });

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
