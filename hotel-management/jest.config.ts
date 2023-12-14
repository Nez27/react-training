import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|gif)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '@src/(.*)': ['<rootDir>/src/$1'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  setupFiles: ['<rootDir>/.jest/setEnvVar.ts'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
