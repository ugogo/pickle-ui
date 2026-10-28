import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Textarea, type TextareaProps } from './Textarea';

const meta = {
  component: Textarea,
  parameters: { layout: 'fullscreen' },
  title: 'components/form/Textarea',
} satisfies Meta<typeof Textarea>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

// No focus column: React Native can't force a focus state. Tap a field.
const STATE_COLUMNS = [
  { key: 'empty', label: 'Empty' },
  { key: 'filled', label: 'Filled' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
];

const SIZE_ROWS = [
  { key: 'sm', label: 'Small' },
  { key: 'md', label: 'Medium' },
  { key: 'lg', label: 'Large' },
];

function TextareaMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const isInvalid = column.key === 'invalid';

  return (
    <Textarea
      accessibilityLabel={`${row.label} ${column.label}`}
      defaultValue={
        column.key === 'filled'
          ? 'Pickle UI grows this field with its content, line after line.'
          : undefined
      }
      disabled={column.key === 'disabled'}
      invalid={isInvalid}
      placeholder={isInvalid ? 'Tell us a bit more' : 'Write a message'}
      size={row.key as NonNullable<TextareaProps['size']>}
    />
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Textarea">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={TextareaMatrixCell}
          cellClassName="items-stretch"
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
