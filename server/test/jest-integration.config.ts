module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '.integration-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globalSetup: './globalSetup.ts',
  setupFiles: [__dirname + '/env.setup.ts'],
  moduleDirectories: ['node_modules', __dirname + '/../'],
};
