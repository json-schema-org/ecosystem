export default {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};