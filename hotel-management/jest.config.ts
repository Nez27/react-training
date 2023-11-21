import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@service/(.*)': ['<rootDir>/src/services/$1'],
    '@constant/(.*)': ['<rootDir>/src/constants/$1'],
    '@hook/(.*)': ['<rootDir>/src/hooks/$1'],
    '@helper/(.*)': ['<rootDir>/src/helpers/$1'],
    '@context/(.*)': ['<rootDir>/src/contexts/$1'],
    '@component/(.*)': ['<rootDir>/src/components/$1'],
    '@commonStyle/(.*)': ['<rootDir>/src/commons/styles/$1'],
    '@type/(.*)': ['<rootDir>/src/types/$1'],
    '@page/(.*)': ['<rootDir>/src/pages/$1'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/.jest/setEnvVar.ts']
};

export default config;
