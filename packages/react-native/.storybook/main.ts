import type { StorybookConfig } from '@storybook/react-native-web-vite';

import tailwindcss from '@tailwindcss/vite';
import { uniwind } from 'uniwind/vite';
import { defaultClientConditions, type Plugin } from 'vite';

// react-native-svg (behind the stories' Tabler icons) imports
// `TurboModuleRegistry` for its Android touch sound, and react-native-web
// doesn't export it. The module only runs on Android, so stub it, both in the
// dependency pre-bundle and in the build.
const stubSvgSoundModule: Plugin = {
  name: 'stub-react-native-svg-sound-module',
  transform: (_code, id) =>
    /\/react-native-svg\/.*\/fabric\/NativeSvgSoundModule\.js$/.test(id)
      ? 'export default null;'
      : undefined,
};

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
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      rolldownOptions: {
        ...viteConfig.optimizeDeps?.rolldownOptions,
        plugins: [
          viteConfig.optimizeDeps?.rolldownOptions?.plugins,
          stubSvgSoundModule,
        ],
      },
    },
    plugins: [
      stubSvgSoundModule,
      // The framework adds vite-tsconfig-paths, which Vite now replaces with
      // `resolve.tsconfigPaths` and warns about. The package has no `paths`
      // to resolve, so drop it.
      ...(viteConfig.plugins ?? [])
        .flat()
        .filter(
          (plugin) =>
            !(
              plugin &&
              typeof plugin === 'object' &&
              'name' in plugin &&
              plugin.name === 'vite-tsconfig-paths'
            ),
        ),
      tailwindcss(),
      // Uniwind writes src/uniwind-types.d.ts, which adds `className` to
      // React Native's types for the package's own typecheck.
      uniwind({
        cssEntryFile: './.storybook/storybook.css',
        dtsFile: './src/uniwind-types.d.ts',
      }),
    ],
    // Read @pickle-ui/tokens from its sources, so Storybook runs without
    // building it first.
    resolve: {
      ...viteConfig.resolve,
      conditions: [
        '@pickle-ui/source',
        ...(viteConfig.resolve?.conditions ?? defaultClientConditions),
      ],
    },
  }),
};

export default config;
