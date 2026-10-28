import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { StoryItem as Item } from './_internal/StoryItem';
import { Flex } from './Flex';

const meta = {
  component: Flex,
  parameters: { layout: 'fullscreen' },
  title: 'components/Flex',
} satisfies Meta<typeof Flex>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Flex">
      <Story.Section title="Direction and spacing">
        <Flex direction="column" gap={3}>
          <Item className="min-h-16">First</Item>
          <Item className="min-h-16">Second</Item>
          <Item className="min-h-16">Third</Item>
        </Flex>
      </Story.Section>

      <Story.Section title="Alignment and distribution">
        <Flex
          align="center"
          className="border-border min-h-40 rounded-md border border-dashed p-4"
          gap={4}
          justify="between"
        >
          <Item className="min-h-16 min-w-20">Start</Item>
          <Item className="min-h-16 min-w-20">Center</Item>
          <Item className="min-h-16 min-w-20">End</Item>
        </Flex>
      </Story.Section>

      <Story.Section title="Wrapping">
        <Flex gap={3} wrap="wrap">
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
            <Item className="min-h-16 min-w-24" key={label}>
              {label}
            </Item>
          ))}
        </Flex>
      </Story.Section>

      <Story.Section title="Responsive override">
        <Flex className="flex-col md:flex-row" gap={3}>
          <Item className="min-h-16">Column on small screens</Item>
          <Item className="min-h-16">Row from md</Item>
        </Flex>
      </Story.Section>
    </Story.Layout>
  ),
};
