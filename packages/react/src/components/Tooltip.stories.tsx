import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconCopy, IconEdit, IconTrash } from '@tabler/icons-react';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Button } from './Button';
import { Text } from './Text';
import { Tooltip, type TooltipContentProps } from './Tooltip';

const meta = {
  component: Tooltip,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Tooltip',
} satisfies Meta<typeof Tooltip>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const SIDE_COLUMNS: {
  key: NonNullable<TooltipContentProps['side']>;
  label: string;
}[] = [
  { key: 'top', label: 'Top' },
  { key: 'right', label: 'Right' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
];

const TRIGGER_ROWS = [
  { key: 'text', label: 'Text trigger' },
  { key: 'icon', label: 'Icon-only trigger' },
];

function TooltipMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const side = column.key as NonNullable<TooltipContentProps['side']>;

  return (
    <Tooltip>
      {row.key === 'icon' ? (
        <Tooltip.Trigger
          render={
            <Button aria-label="Copy link" size="icon" variant="outline" />
          }
        >
          <IconCopy />
        </Tooltip.Trigger>
      ) : (
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Hover me
        </Tooltip.Trigger>
      )}
      <Tooltip.Content side={side}>
        {row.key === 'icon' ? 'Copy link' : `Shown on the ${column.label}`}
      </Tooltip.Content>
    </Tooltip>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Tooltip">
      <Story.Section title="Sides and triggers">
        <Story.Matrix
          Cell={TooltipMatrixCell}
          columns={SIDE_COLUMNS}
          rows={TRIGGER_ROWS}
        />
      </Story.Section>
      <Story.Section title="Shared delay with Provider">
        <Text className="mb-4" tone="muted">
          Once one tooltip is open, moving to a neighbour opens it instantly.
        </Text>
        <Tooltip.Provider delay={300}>
          <div className="flex gap-2">
            <Tooltip>
              <Tooltip.Trigger
                render={
                  <Button aria-label="Edit" size="icon" variant="outline" />
                }
              >
                <IconEdit />
              </Tooltip.Trigger>
              <Tooltip.Content>Edit</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger
                render={
                  <Button
                    aria-label="Duplicate"
                    size="icon"
                    variant="outline"
                  />
                }
              >
                <IconCopy />
              </Tooltip.Trigger>
              <Tooltip.Content>Duplicate</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger
                render={
                  <Button aria-label="Delete" size="icon" variant="outline" />
                }
              >
                <IconTrash />
              </Tooltip.Trigger>
              <Tooltip.Content>Delete</Tooltip.Content>
            </Tooltip>
          </div>
        </Tooltip.Provider>
      </Story.Section>
    </Story.Layout>
  ),
};
