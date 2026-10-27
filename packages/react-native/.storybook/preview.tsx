import type { Decorator, Preview } from '@storybook/react-native-web-vite';

import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

import './storybook.css';

function ThemeSync({ theme }: { theme: 'dark' | 'light' }) {
  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return null;
}

const withTheme: Decorator = (Story, context) => (
  <>
    <ThemeSync theme={context.globals.theme as 'dark' | 'light'} />
    <Story />
  </>
);

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        dynamicTitle: true,
        items: [
          { icon: 'sun', title: 'Light', value: 'light' },
          { icon: 'moon', title: 'Dark', value: 'dark' },
        ],
        title: 'Theme',
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
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
