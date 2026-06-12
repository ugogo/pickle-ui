import type { StorybookConfig } from '@storybook/react-vite';

import { resolve } from 'path';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      '@': resolve(process.cwd(), 'src'),
    };
    return viteConfig;
  },
};

export default config;
