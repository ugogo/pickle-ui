import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Spinner } from './Spinner';
import { Text } from './Text';

const meta = {
  component: Spinner,
  parameters: { layout: 'fullscreen' },
  title: 'components/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-3xl" title="Spinner">
      <Story.Section title="Sizes">
        <div className="flex items-center gap-6">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      </Story.Section>
      <Story.Section title="With a label">
        <div className="text-muted-foreground flex items-center gap-2">
          <Spinner aria-hidden className="size-4" />
          <Text tone="muted" variant="body">
            Loading your workspace…
          </Text>
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};
