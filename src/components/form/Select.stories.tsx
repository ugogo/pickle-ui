import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/utils';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Select } from './Select';

const meta = {
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Select',
} satisfies Meta<typeof Select>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

type ThemeSelectStateProps = {
  disabled?: boolean;
  invalid?: boolean;
  triggerClassName?: string;
  value?: string;
};

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: ThemeSelectStateProps;
}[] = [
  { key: 'placeholder', label: 'Placeholder', props: {} },
  { key: 'selected', label: 'Selected', props: { value: 'system' } },
  {
    key: 'hover',
    label: 'Hover',
    props: { triggerClassName: 'pseudo-hover', value: 'system' },
  },
  {
    key: 'focus',
    label: 'Focus',
    props: { triggerClassName: 'pseudo-focus-visible', value: 'system' },
  },
  {
    key: 'disabled',
    label: 'Disabled',
    props: { disabled: true, value: 'system' },
  },
  {
    key: 'invalid',
    label: 'Invalid',
    props: { invalid: true, value: 'system' },
  },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, ThemeSelectStateProps>;

const SIZE_ROWS = [
  { description: 'Standard control height', key: 'default', label: 'Default' },
  { description: 'Compact dense forms', key: 'sm', label: 'Small' },
];

function SelectMatrixCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <ThemeSelect
      size={row.key as 'default' | 'sm'}
      {...STATE_PROPS[column.key]}
    />
  );
}

function ThemeSelect({
  disabled,
  invalid,
  size,
  triggerClassName,
  value,
}: ThemeSelectStateProps & {
  size: 'default' | 'sm';
}) {
  return (
    <Select defaultValue={value} disabled={disabled}>
      <Select.Label className="sr-only">Theme</Select.Label>
      <Select.Trigger
        aria-invalid={invalid || undefined}
        className={cn('w-44', triggerClassName)}
        size={size}
      >
        <Select.Value placeholder="Theme" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.GroupLabel>Theme</Select.GroupLabel>
          <Select.Item value="light">Light</Select.Item>
          <Select.Item value="dark">Dark</Select.Item>
          <Select.Item value="system">System</Select.Item>
        </Select.Group>
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

      <Story.Section title="Label">
        <Select defaultValue="designer">
          <Select.Label>Role</Select.Label>
          <Select.Trigger className="mt-2 w-56">
            <Select.Value placeholder="Select a role" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="designer">Designer</Select.Item>
            <Select.Item value="engineer">Engineer</Select.Item>
          </Select.Content>
        </Select>
      </Story.Section>
    </Story.Layout>
  ),
};
