import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { StoryItem as Item } from './_internal/StoryItem';
import { XStack } from './XStack';

const meta = {
  component: XStack,
  parameters: { layout: 'fullscreen' },
  title: 'components/XStack',
} satisfies Meta<typeof XStack>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="XStack">
      <Story.Section title="Horizontal spacing">
        <XStack gap={3}>
          <Item>Avatar</Item>
          <Item>Profile details</Item>
          <Item>Status</Item>
        </XStack>
      </Story.Section>

      <Story.Section title="Distribution">
        <XStack
          align="center"
          className="border-border min-h-48 rounded-md border border-dashed p-4"
          justify="between"
        >
          <Item>Leading action</Item>
          <Item>Trailing action</Item>
        </XStack>
      </Story.Section>

      <Story.Section title="Responsive override">
        <XStack className="max-sm:flex-col" gap={3}>
          <Item>Horizontal by default</Item>
          <Item>Vertical below sm</Item>
        </XStack>
      </Story.Section>
    </Story.Layout>
  ),
};
