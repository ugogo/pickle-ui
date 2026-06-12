import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, type ButtonProps } from './Button';
import { Popover } from './Popover';
import { Story } from './Story';

const meta = {
  component: Popover,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Popover',
} satisfies Meta<typeof Popover>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const ALIGN_ROWS = [
  { key: 'start', label: 'Start align' },
  { key: 'center', label: 'Center align' },
  { key: 'end', label: 'End align' },
];

const TRIGGER_COLUMNS: {
  key: NonNullable<ButtonProps['variant']>;
  label: string;
}[] = [
  { key: 'primary', label: 'Primary trigger' },
  { key: 'outline', label: 'Outline trigger' },
  { key: 'ghost', label: 'Ghost trigger' },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Popover">
      <Story.Section title="Alignment and trigger styles">
        <Story.Matrix
          columns={TRIGGER_COLUMNS}
          renderCell={(row, column) => (
            <Popover>
              <Popover.Trigger asChild>
                <Button
                  variant={column.key as NonNullable<ButtonProps['variant']>}
                >
                  Open
                </Button>
              </Popover.Trigger>
              <Popover.Content align={row.key as 'center' | 'end' | 'start'}>
                <Popover.Header>
                  <Popover.Title>{row.label}</Popover.Title>
                  <Popover.Description>
                    Contextual content keeps the same spacing, radius, and
                    border treatment across trigger styles.
                  </Popover.Description>
                </Popover.Header>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Apply</Button>
                </div>
              </Popover.Content>
            </Popover>
          )}
          rows={ALIGN_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
