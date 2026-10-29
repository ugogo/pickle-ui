import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['**/dist', '**/storybook-static']),

  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  perfectionist.configs['recommended-natural'],
  storybook.configs['flat/recommended'],

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
      },
      sourceType: 'module',
    },
  },

  // Config files run in Node.
  {
    files: ['**/*.{cjs,mjs}', '*.config.{ts,cts,mts}', '.storybook/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Imports inside @pickle-ui/react's src stay relative: the examples read src
  // through the `@pickle-ui/source` condition, where `@/` doesn't resolve.
  {
    files: ['packages/react/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/*'],
              message:
                'Use a relative import: `@/` does not resolve for consumers reading src.',
            },
          ],
        },
      ],
    },
  },

  // Metro only loads a CommonJS config.
  {
    files: ['examples/mobile/metro.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Turns off the rules Prettier covers. Keep last.
  eslintConfigPrettier,
]);
