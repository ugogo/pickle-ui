import type { Preview } from '@storybook/react-vite';

import '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2';

import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
