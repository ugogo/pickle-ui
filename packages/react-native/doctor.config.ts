import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  // Build output. React Doctor skips gitignored files except inside a git hook
  // (`GIT_DIR` set), where a leftover Storybook build fails the pre-commit.
  ignore: {
    files: ['dist/**', 'storybook-static/**'],
    overrides: [
      {
        // Waiver approved by the maintainer (2026-10-28), scoped to this
        // file: the spinner is a decorative, transform-only loop that runs
        // on the native driver, so React Native's Animated has no measured
        // limitation here, and Reanimated would become a peer dependency of
        // every app for one spinner. Revisit if the package adopts
        // Reanimated or Uniwind gains CSS animations.
        files: ['src/components/Spinner.tsx'],
        rules: ['react-doctor/rn-prefer-reanimated'],
      },
    ],
  },
  rules: {
    'react-doctor/no-multi-comp': 'off',
    // Fresh package installs are common while adding components, so this repo
    // intentionally does not enforce pnpm's minimumReleaseAge gate.
    'react-doctor/require-pnpm-hardening': 'off',
  },
});
