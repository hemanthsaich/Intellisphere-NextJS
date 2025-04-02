const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true, // Enable code coverage
  collectCoverageFrom: [
    'app/login/**/*.{js,jsx,ts,tsx}', // Include files related to login tests
    'app/dashboard/overview/**/*.{js,jsx,ts,tsx}', // Include files related to overview tests
  ],
  coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Coverage report formats
};

module.exports = createJestConfig(customJestConfig);