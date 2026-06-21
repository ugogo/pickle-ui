import type { Preview } from '@storybook/react-vite';

import '@fontsource-variable/geist/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';

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
