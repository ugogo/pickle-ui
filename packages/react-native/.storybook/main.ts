import type { StorybookConfig } from '@storybook/react-native-web-vite';

import tailwindcss from '@tailwindcss/vite';
import { uniwind } from 'uniwind/vite';

// Renders the components in the browser through react-native-web, with
// Uniwind's Vite plugin turning their `className`s into styles.
const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    plugins: [
      ...(viteConfig.plugins ?? []),
      tailwindcss(),
      // Uniwind writes src/uniwind-types.d.ts, which adds `className` to
      // React Native's types for the package's own typecheck.
      uniwind({
        cssEntryFile: './.storybook/storybook.css',
        dtsFile: './src/uniwind-types.d.ts',
      }),
    ],
  }),
};

export default config;
