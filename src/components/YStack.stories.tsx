import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { YStack } from './YStack';

const meta = {
  component: YStack,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/YStack',
} satisfies Meta<typeof YStack>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

function Item({ children }: { children: string }) {
  return <Story.Box>{children}</Story.Box>;
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="YStack">
      <Story.Section title="Vertical spacing">
        <YStack gap={3}>
          <Item>Heading</Item>
          <Item>Supporting content</Item>
          <Item>Actions</Item>
        </YStack>
      </Story.Section>

      <Story.Section title="Alignment">
        <YStack
          align="center"
          className="border-border rounded-md border border-dashed p-4"
          gap={3}
        >
          <Item>Narrow item</Item>
          <Item>Another item</Item>
        </YStack>
      </Story.Section>

      <Story.Section title="Distribution">
        <YStack
          className="border-border min-h-80 rounded-md border border-dashed p-4"
          justify="between"
        >
          <Item>Top</Item>
          <Item>Middle</Item>
          <Item>Bottom</Item>
        </YStack>
      </Story.Section>

      <Story.Section title="Responsive override">
        <YStack className="md:flex-row" gap={3}>
          <Item>Vertical by default</Item>
          <Item>Horizontal from md</Item>
        </YStack>
      </Story.Section>
    </Story.Layout>
  ),
};
