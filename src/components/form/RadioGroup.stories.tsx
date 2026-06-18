import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { RadioGroup, type RadioGroupItemProps } from './RadioGroup';

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/RadioGroup',
} satisfies Meta<typeof RadioGroup>;

export default meta;
type RadioSize = NonNullable<RadioGroupItemProps['size']>;
type StoryDefinition = StoryObj<typeof meta>;

const SIZE_ROWS: {
  key: RadioSize;
  label: string;
}[] = [
  { key: 'default', label: 'Default' },
  { key: 'sm', label: 'Small' },
];

const STATE_COLUMNS = [
  { key: 'unchecked', label: 'Unchecked' },
  { key: 'checked', label: 'Checked' },
  { key: 'disabled', label: 'Disabled' },
];

function RadioStateCell({ column, row }: ComponentMatrixCellProps) {
  const value = column.key === 'checked' ? 'option' : undefined;

  return (
    <RadioGroup defaultValue={value}>
      <RadioGroup.Item
        disabled={column.key === 'disabled'}
        label={column.label}
        size={row.key as RadioSize}
        value="option"
      />
    </RadioGroup>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="RadioGroup">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={RadioStateCell}
          cellWidth="9rem"
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>

      <Story.Section title="Group">
        <RadioGroup defaultValue="email">
          <RadioGroup.Item label="Email" value="email" />
          <RadioGroup.Item label="SMS" value="sms" />
          <RadioGroup.Item disabled label="Push" value="push" />
        </RadioGroup>
      </Story.Section>
    </Story.Layout>
  ),
};
