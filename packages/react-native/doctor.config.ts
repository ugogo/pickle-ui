import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  // Build output. React Doctor skips gitignored files except inside a git hook
  // (`GIT_DIR` set), where a leftover Storybook build fails the pre-commit.
  ignore: {
    files: ['dist/**', 'storybook-static/**'],
  },
  rules: {
    'react-doctor/no-multi-comp': 'off',
    // Fresh package installs are common while adding components, so this repo
    // intentionally does not enforce pnpm's minimumReleaseAge gate.
    'react-doctor/require-pnpm-hardening': 'off',
  },
});
