import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defaultClientConditions, defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Monorepo only: read @pickle-ui/react from its TypeScript sources, so
    // library edits hot-reload without a build. Drop this in your own app.
    conditions: ['source', ...defaultClientConditions],
  },
});
