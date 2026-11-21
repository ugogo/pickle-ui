import react from '@vitejs/plugin-react';
import { defaultClientConditions } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // Read @pickle-ui/tokens from its sources, so tests and Storybook run
  // without building it first.
  resolve: {
    conditions: ['@pickle-ui/source', ...defaultClientConditions],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
