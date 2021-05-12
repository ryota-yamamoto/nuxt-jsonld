module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.ts'],
};
