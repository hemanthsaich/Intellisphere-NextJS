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
    '**/*.{js,jsx,ts,tsx}', // Include all JavaScript and TypeScript files
    '!**/node_modules/**', // Exclude node_modules
    '!**/.next/**', // Exclude Next.js build directory
    '!**/jest.config.js', // Exclude Jest config file
    '!**/jest.setup.js', // Exclude Jest setup file
  ],
  coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Coverage report formats
};

module.exports = createJestConfig(customJestConfig);