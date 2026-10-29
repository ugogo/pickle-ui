import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  // Build output. React Doctor skips gitignored files except inside a git hook
  // (`GIT_DIR` set), where a leftover Storybook build fails the pre-commit.
  ignore: {
    files: ['dist/**', 'storybook-static/**'],
    overrides: [
      {
        // The spinner is a decorative transform loop on the native driver,
        // where Animated has no measured limitation, and Reanimated would
        // become a peer dependency of every app for one spinner. Revisit if
        // the package adopts Reanimated or Uniwind gains CSS animations.
        files: ['src/components/Spinner.tsx'],
        rules: ['react-doctor/rn-prefer-reanimated'],
      },
    ],
  },
  rules: {
    'react-doctor/no-multi-comp': 'off',
    // Packages are installed fresh while adding components, so pnpm's
    // minimumReleaseAge gate stays off.
    'react-doctor/require-pnpm-hardening': 'off',
  },
});
