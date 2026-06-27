import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Avatar } from './Avatar';
import { XStack } from './XStack';

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

const AVATAR_ROWS = [
  { key: 'image', label: 'Image' },
  { key: 'fallback', label: 'Fallback' },
];

const AVATAR_COLUMNS = people.map((person) => ({
  key: person.name,
  label: person.name,
}));

function AvatarMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const person =
    people.find((candidate) => candidate.name === column.key) ?? people[0];
  const src = row.key === 'broken' ? '/missing-avatar.png' : person.src;

  return (
    <Avatar>
      {row.key === 'fallback' || !src ? null : (
        <Avatar.Image alt={person.name} src={src} />
      )}
      <Avatar.Fallback>{person.fallback}</Avatar.Fallback>
    </Avatar>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Avatar">
      <Story.Section title="States">
        <Story.Matrix
          Cell={AvatarMatrixCell}
          cellWidth="9rem"
          columns={AVATAR_COLUMNS}
          rows={AVATAR_ROWS}
        />
      </Story.Section>

      <Story.Section title="Grouped">
        <XStack className="-space-x-2">
          {people.map((person) => (
            <Avatar className="ring-background ring-2" key={person.name}>
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
