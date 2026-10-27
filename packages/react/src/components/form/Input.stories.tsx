import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Button } from '../Button';
import { XStack } from '../XStack';
import { Input } from './Input';

const meta = {
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Input',
} satisfies Meta<typeof Input>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'empty', label: 'Empty' },
  { key: 'filled', label: 'Filled' },
  { key: 'focus', label: 'Focus' },
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
  const input = (
    <Input
      aria-invalid={isInvalid || undefined}
      aria-label={`${row.label} ${column.label}`}
      defaultValue={
        column.key === 'filled' || column.key === 'focus'
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

  // The focus ring is styled on the wrapper via :has(:focus-visible), so the
  // pseudo-state class goes on an ancestor to reach the inner <input>.
  return column.key === 'focus' ? (
    <div className="pseudo-focus-visible-all w-full">{input}</div>
  ) : (
    input
  );
}

const SIZE_COLUMNS = [
  { key: 'sm', label: 'Small' },
  { key: 'md', label: 'Medium' },
  { key: 'lg', label: 'Large' },
];

function InputSizeCell({ column }: ComponentMatrixCellProps) {
  const size = column.key as 'lg' | 'md' | 'sm';

  return (
    <XStack className="w-full gap-2">
      <Input
        aria-label={`${column.label} email`}
        placeholder="Email"
        size={size}
      />
      <Button size={size} variant="outline">
        Subscribe
      </Button>
    </XStack>
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

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={InputSizeCell}
          cellClassName="justify-stretch"
          cellWidth="20rem"
          columns={SIZE_COLUMNS}
          rows={[
            {
              description: 'Matches the Button of the same size',
              key: 'with-button',
              label: 'With button',
            },
          ]}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
