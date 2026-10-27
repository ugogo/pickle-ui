/** @type {import('jest').Config} */
export default {
  preset: 'jest-expo',
  // React Native loads modules such as Animated lazily, so the first test
  // that renders one pays for transforming it. Without a transform cache, as
  // on CI, that alone can pass Jest's 5s default.
  testTimeout: 20000,
};
