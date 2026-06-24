import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dashboard } from './dashboard/Dashboard';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Demo/Dashboard',
} satisfies Meta;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const Overview: StoryDefinition = {
  render: () => <Dashboard />,
};
