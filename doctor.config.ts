import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  rules: {
    // `buttonVariants` is intentionally co-located with the `Button` component
    // (the shadcn/ui convention). The Fast Refresh tradeoff is negligible for a
    // component library, so we allow component files to export their variants.
    'react-doctor/only-export-components': 'off',
  },
});
