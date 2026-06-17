import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Select } from './Select';

const meta = {
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Select',
} satisfies Meta<typeof Select>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'placeholder', label: 'Placeholder' },
  { key: 'selected', label: 'Selected' },
  { key: 'disabled', label: 'Disabled' },
];

const SIZE_ROWS = [
  { description: 'Standard control height', key: 'default', label: 'Default' },
  { description: 'Compact dense forms', key: 'sm', label: 'Small' },
];

function SelectMatrixCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <ThemeSelect
      disabled={column.key === 'disabled'}
      size={row.key as 'default' | 'sm'}
      value={column.key === 'placeholder' ? undefined : 'system'}
    />
  );
}

function ThemeSelect({
  disabled,
  size,
  value,
}: {
  disabled?: boolean;
  size: 'default' | 'sm';
  value?: string;
}) {
  return (
    <Select defaultValue={value} disabled={disabled}>
      <Select.Trigger className="w-44" size={size}>
        <Select.Value placeholder="Theme" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="light">Light</Select.Item>
        <Select.Item value="dark">Dark</Select.Item>
        <Select.Item value="system">System</Select.Item>
      </Select.Content>
    </Select>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Select">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={SelectMatrixCell}
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
