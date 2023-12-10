/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    'src/controllers/controller.ts',
    'src/repos/users/users.mongo.model.ts',
    'src/repos/repo.ts',
    'src/app.ts',
    'src/index.ts',
    'src/routers/users.router.ts',
    'src / config.ts',
  ],
};
