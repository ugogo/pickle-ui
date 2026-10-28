import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = {
  component: Checkbox,
  parameters: { layout: 'fullscreen' },
  title: 'components/form/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;
type CheckboxSize = NonNullable<CheckboxProps['size']>;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: Partial<CheckboxProps>;
}[] = [
  { key: 'unchecked', label: 'Unchecked', props: {} },
  { key: 'checked', label: 'Checked', props: { defaultChecked: true } },
  { key: 'indeterminate', label: 'Mixed', props: { indeterminate: true } },
  {
    key: 'invalid',
    label: 'Invalid',
    props: { defaultChecked: true, invalid: true },
  },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
];

const SIZE_ROWS: { key: CheckboxSize; label: string }[] = [
  { key: 'md', label: 'Medium' },
  { key: 'sm', label: 'Small' },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<CheckboxProps>>;

function CheckboxStateCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Checkbox
      accessibilityLabel={`${row.label} ${column.label}`}
      size={row.key as CheckboxSize}
      {...STATE_PROPS[column.key]}
    />
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Checkbox">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={CheckboxStateCell}
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>

      <Story.Section title="Label">
        <Checkbox label="Accept terms" />
      </Story.Section>
    </Story.Layout>
  ),
};
