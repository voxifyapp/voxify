module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '.integration-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globalSetup: './globalSetup.ts',
  globalTeardown: './globalTeardown.ts',
  setupFiles: [__dirname + '/setup-test-env.ts'],
  setupFilesAfterEnv: [
    __dirname + '/setup-test-nest-app.ts',
    __dirname + '/setup-test-migrations.ts',
  ],
  moduleDirectories: ['node_modules', __dirname + '/../'],
};
