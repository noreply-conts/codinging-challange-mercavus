const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    './**/*.ispec.ts',
  ],
  rootDir: ".",
  roots: [
    "<rootDir>"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  globalSetup: '<rootDir>/setup.ts',
  globalTeardown: '<rootDir>/teardown.ts',
  setupFilesAfterEnv: [
    "jest-extended",
  ]
};

module.exports = jestConfig;
