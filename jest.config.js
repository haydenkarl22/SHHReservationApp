module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    testMatch: ['<rootDir>/src/tests/**/*.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  };