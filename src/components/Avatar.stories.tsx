import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Avatar } from './Avatar';
import { Text } from './Text';
import { XStack } from './XStack';
import { YStack } from './YStack';

const meta = {
  component: Avatar,
  parameters: { layout: 'fullscreen' },
  title: 'components/Avatar',
} satisfies Meta<typeof Avatar>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const people: {
  fallback: string;
  name: string;
  src?: string;
}[] = [
  {
    fallback: 'MC',
    name: 'Maya Chen',
    src: 'https://i.pravatar.cc/128?u=maya-chen',
  },
  {
    fallback: 'AR',
    name: 'Alex Rivera',
    src: 'https://i.pravatar.cc/128?u=alex-rivera',
  },
  {
    fallback: 'SO',
    name: 'Sam Okonkwo',
    src: 'https://i.pravatar.cc/128?u=sam-okonkwo',
  },
  {
    fallback: 'JL',
    name: 'Jordan Lee',
  },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Avatar">
      <Story.Section title="Sizes">
        <XStack align="center" gap={4}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <YStack align="center" gap={2} key={size}>
              <Avatar size={size}>
                <Avatar.Image alt="Maya Chen" src={people[0].src} />
                <Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
              </Avatar>
              <Text tone="muted" variant="small">
                {size}
              </Text>
            </YStack>
          ))}
        </XStack>
      </Story.Section>

      <Story.Section title="Image and fallback">
        <XStack gap={4} wrap="wrap">
          {people.map((person) => (
            <YStack align="center" gap={2} key={person.name}>
              <Avatar>
                {person.src ? (
                  <Avatar.Image alt={person.name} src={person.src} />
                ) : null}
                <Avatar.Fallback>{person.fallback}</Avatar.Fallback>
              </Avatar>
              <Text tone="muted" variant="small">
                {person.name}
              </Text>
            </YStack>
          ))}
        </XStack>
      </Story.Section>

      <Story.Section title="Grouped">
        <XStack className="-space-x-2">
          {people.map((person) => (
            <Avatar
              className="ring-background ring-2"
              key={person.name}
              size="sm"
            >
              {person.src ? (
                <Avatar.Image alt={person.name} src={person.src} />
              ) : null}
              <Avatar.Fallback>{person.fallback}</Avatar.Fallback>
            </Avatar>
          ))}
        </XStack>
      </Story.Section>
    </Story.Layout>
  ),
};
