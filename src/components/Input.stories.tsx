import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';
import { type ComponentMatrixCellProps, Story } from './Story';

const meta = {
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Input',
} satisfies Meta<typeof Input>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'empty', label: 'Empty' },
  { key: 'filled', label: 'Filled' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
];

const TYPE_ROWS = [
  { description: 'General text input', key: 'text', label: 'Text' },
  { description: 'Keyboard hint for email', key: 'email', label: 'Email' },
  { description: 'Masked text entry', key: 'password', label: 'Password' },
];

function InputMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const isInvalid = column.key === 'invalid';

  return (
    <Input
      aria-invalid={isInvalid || undefined}
      aria-label={`${row.label} ${column.label}`}
      defaultValue={
        column.key === 'filled'
          ? row.key === 'email'
            ? 'hello@pickle.dev'
            : 'Pickle UI'
          : undefined
      }
      disabled={column.key === 'disabled'}
      placeholder={isInvalid ? 'Check this value' : row.label}
      type={row.key}
    />
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Input">
      <Story.Section title="Types and states">
        <Story.Matrix
          Cell={InputMatrixCell}
          cellClassName="justify-stretch"
          cellWidth="16rem"
          columns={STATE_COLUMNS}
          rows={TYPE_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
