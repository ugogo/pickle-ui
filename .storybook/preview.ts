import type { Decorator, Preview } from '@storybook/react-vite';

import { createElement, Fragment, useEffect } from 'react';
import '@fontsource-variable/geist/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';

import './storybook.css';

function ThemeSync({ theme }: { theme: string }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}

const withTheme: Decorator = (Story, context) =>
  createElement(
    Fragment,
    null,
    createElement(ThemeSync, { theme: context.globals.theme as string }),
    createElement(Story),
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
