import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  // Build output. React Doctor skips gitignored files except inside a git hook
  // (`GIT_DIR` set), where a leftover Storybook build fails the pre-commit.
  ignore: {
    files: ['dist/**', 'storybook-static/**'],
  },
  rules: {
    'react-doctor/no-multi-comp': 'off',
    // `buttonVariants` lives next to `Button`, as in shadcn/ui; Fast Refresh
    // doesn't matter in a library.
    'react-doctor/only-export-components': 'off',
    // Packages are installed fresh while adding components, so pnpm's
    // minimumReleaseAge gate stays off.
    'react-doctor/require-pnpm-hardening': 'off',
  },
});
