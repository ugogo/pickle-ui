import expoPreset from 'jest-expo/jest-preset.js';

const [modules, ...ignorePatterns] = expoPreset.transformIgnorePatterns;

/** @type {import('jest').Config} */
export default {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  // Uniwind ships TypeScript sources, so Babel compiles it like React Native.
  transformIgnorePatterns: [
    modules.replace('(.pnpm|', '(.pnpm|uniwind|'),
    ...ignorePatterns,
  ],
};
