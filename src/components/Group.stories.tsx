import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  IconChevronDown,
  IconGitFork,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Badge } from './Badge';
import { Button } from './Button';
import { Input } from './form/Input';
import { Group } from './Group';
import { Popover } from './Popover';

const meta = {
  component: Group,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Group',
} satisfies Meta<typeof Group>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'disabled', label: 'Disabled' },
];

const PATTERN_ROWS = [
  {
    description: 'Icon buttons stacked vertically',
    key: 'vertical',
    label: 'Vertical',
  },
  {
    description: 'Action button with popover trigger',
    key: 'with-popup',
    label: 'With popup',
  },
  {
    description: 'Adjacent inputs with separator',
    key: 'two-inputs',
    label: 'Two inputs',
  },
];

function GroupMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const disabled = column.key === 'disabled';

  if (row.key === 'vertical') {
    return (
      <Group aria-label="Zoom controls" orientation="vertical">
        <Button aria-label="Zoom in" size="icon" variant="outline">
          <IconZoomIn aria-hidden="true" stroke={2} />
        </Button>
        <Group.Separator orientation="horizontal" />
        <Button
          aria-label="Zoom out"
          disabled={disabled}
          size="icon"
          variant="outline"
        >
          <IconZoomOut aria-hidden="true" stroke={2} />
        </Button>
      </Group>
    );
  }

  if (row.key === 'with-popup') {
    return (
      <Group aria-label="Repository actions">
        <Button disabled={disabled} variant="outline">
          <IconGitFork aria-hidden="true" stroke={2} />
          Fork
          <Badge variant="secondary">48</Badge>
        </Button>
        <Group.Separator />
        <Popover>
          <Popover.Trigger asChild>
            <Button aria-label="Fork options" size="icon" variant="outline">
              <IconChevronDown aria-hidden="true" stroke={2} />
            </Button>
          </Popover.Trigger>
          <Popover.Content align="end" className="w-64">
            <Popover.Header>
              <Popover.Title>Existing forks</Popover.Title>
              <Popover.Description>
                You do not have any forks of this repository.
              </Popover.Description>
            </Popover.Header>
          </Popover.Content>
        </Popover>
      </Group>
    );
  }

  return (
    <Group aria-label="Full name" className="w-full max-w-xs">
      <Input aria-label="First name" placeholder="First name" />
      <Group.Separator />
      <Input
        aria-label="Last name"
        disabled={disabled}
        placeholder="Last name"
      />
    </Group>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Group">
      <Story.Section title="Patterns and states">
        <Story.Matrix
          Cell={GroupMatrixCell}
          cellClassName="justify-start"
          cellWidth="18rem"
          columns={STATE_COLUMNS}
          rows={PATTERN_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
