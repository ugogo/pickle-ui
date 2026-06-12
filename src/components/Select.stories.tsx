import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';
import { ComponentMatrix, Section, StoryLayout } from './story-utils';

const meta = {
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Select',
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'placeholder', label: 'Placeholder' },
  { key: 'selected', label: 'Selected' },
  { key: 'disabled', label: 'Disabled' },
];

const SIZE_ROWS = [
  { description: 'Standard control height', key: 'default', label: 'Default' },
  { description: 'Compact dense forms', key: 'sm', label: 'Small' },
];

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

export const All: Story = {
  render: () => (
    <StoryLayout className="max-w-5xl" title="Select">
      <Section title="Sizes and states">
        <ComponentMatrix
          columns={STATE_COLUMNS}
          renderCell={(row, column) => (
            <ThemeSelect
              disabled={column.key === 'disabled'}
              size={row.key as 'default' | 'sm'}
              value={column.key === 'placeholder' ? undefined : 'system'}
            />
          )}
          rows={SIZE_ROWS}
        />
      </Section>
    </StoryLayout>
  ),
};
