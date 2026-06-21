import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Text } from './Text';
import { XStack } from './XStack';

const meta = {
  component: XStack,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/XStack',
} satisfies Meta<typeof XStack>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

function Item({ children }: { children: string }) {
  return (
    <Text className="bg-muted rounded-md border px-4 py-3">{children}</Text>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="XStack">
      <Story.Section title="Horizontal spacing">
        <XStack align="center" gap={3}>
          <Item>Avatar</Item>
          <Item>Profile details</Item>
          <Item>Status</Item>
        </XStack>
      </Story.Section>

      <Story.Section title="Distribution">
        <XStack
          align="center"
          className="border-border rounded-md border border-dashed p-4"
          justify="between"
        >
          <Item>Leading action</Item>
          <Item>Trailing action</Item>
        </XStack>
      </Story.Section>

      <Story.Section title="Wrapping">
        <XStack gap={2} wrap="wrap">
          {['Design', 'Engineering', 'Product', 'Research', 'Support'].map(
            (label) => (
              <Item key={label}>{label}</Item>
            ),
          )}
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
