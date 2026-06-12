import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  rules: {
    'react-doctor/no-multi-comp': 'off',
    // `buttonVariants` is intentionally co-located with the `Button` component
    // (the shadcn/ui convention). The Fast Refresh tradeoff is negligible for a
    // component library, so we allow component files to export their variants.
    'react-doctor/only-export-components': 'off',
    // Fresh package installs are common while adding shadcn registry components,
    // so this repo intentionally does not enforce pnpm's minimumReleaseAge gate.
    'react-doctor/require-pnpm-hardening': 'off',
  },
});
