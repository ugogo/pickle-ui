import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { StoryItem as Item } from './_internal/StoryItem';
import { YStack } from './YStack';

const meta = {
  component: YStack,
  parameters: { layout: 'fullscreen' },
  title: 'components/YStack',
} satisfies Meta<typeof YStack>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="YStack">
      <Story.Section title="Vertical spacing">
        <YStack gap={3}>
          <Item>Avatar</Item>
          <Item>Profile details</Item>
          <Item>Status</Item>
        </YStack>
      </Story.Section>

      <Story.Section title="Distribution">
        <YStack
          align="center"
          className="border-border min-h-48 rounded-md border border-dashed p-4"
          justify="between"
        >
          <Item>Leading action</Item>
          <Item>Trailing action</Item>
        </YStack>
      </Story.Section>

      <Story.Section title="Responsive override">
        <YStack className="sm:flex-row" gap={3}>
          <Item>Vertical by default</Item>
          <Item>Horizontal from sm</Item>
        </YStack>
      </Story.Section>
    </Story.Layout>
  ),
};
