import * as dotenv from 'dotenv';

/**
 * We want to load .env.test if we are running things in a test environment
 * We use this file to make sure we know which environment is being loaded and is uniform throughout
 */
export const configureEnv = () => {
  dotenv.config(
    process.env.NODE_ENV === 'test' ? { path: '.env.test' } : undefined,
  );
};
