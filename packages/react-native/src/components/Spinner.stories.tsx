import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { Spinner } from './Spinner';
import { Text } from './Text';
import { XStack } from './XStack';

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
        <XStack align="center" gap={6}>
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </XStack>
      </Story.Section>
      <Story.Section title="With a label">
        <XStack align="center" gap={2}>
          <Spinner aria-hidden className="text-muted-foreground size-4" />
          <Text tone="muted">Loading your workspace…</Text>
        </XStack>
      </Story.Section>
    </Story.Layout>
  ),
};
