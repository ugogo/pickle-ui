import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'storybook-static', 'node_modules']),

  // Base JS + TypeScript recommended rules.
  js.configs.recommended,
  tseslint.configs.recommended,

  // React hooks rules of hooks + exhaustive-deps (+ react-compiler checks).
  reactHooks.configs.flat['recommended-latest'],

  // Perfectionist — sort everything (imports, objects, props, types, …).
  perfectionist.configs['recommended-natural'],

  // Storybook best practices for *.stories.* files.
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

  // Disable formatting-related rules that conflict with Prettier. Keep last.
  eslintConfigPrettier,
]);
