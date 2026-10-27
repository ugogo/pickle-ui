import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Flex } from './Flex';
import { Text } from './Text';

const meta = {
  component: Flex,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Flex',
} satisfies Meta<typeof Flex>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

function Item({ children }: { children: string }) {
  return (
    <Flex
      align="center"
      className="bg-muted min-h-16 min-w-24 rounded-md border p-4"
      justify="center"
    >
      <Text>{children}</Text>
    </Flex>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Flex">
      <Story.Section title="Direction and spacing">
        <Flex direction="column" gap={3}>
          <Item>First</Item>
          <Item>Second</Item>
          <Item>Third</Item>
        </Flex>
      </Story.Section>

      <Story.Section title="Alignment and distribution">
        <Flex
          align="center"
          className="border-border min-h-40 rounded-md border border-dashed p-4"
          gap={4}
          justify="between"
        >
          <Item>Start</Item>
          <Item>Center</Item>
          <Item>End</Item>
        </Flex>
      </Story.Section>

      <Story.Section title="Wrapping">
        <Flex gap={3} wrap="wrap">
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
            <Item key={label}>{label}</Item>
          ))}
        </Flex>
      </Story.Section>

      <Story.Section title="Responsive override">
        <Flex className="flex-col md:flex-row" gap={3}>
          <Item>Column on small screens</Item>
          <Item>Row from md</Item>
        </Flex>
      </Story.Section>
    </Story.Layout>
  ),
};
