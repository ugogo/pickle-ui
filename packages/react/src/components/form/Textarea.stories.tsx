import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Textarea, type TextareaProps } from './Textarea';

const meta = {
  component: Textarea,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Textarea',
} satisfies Meta<typeof Textarea>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'empty', label: 'Empty' },
  { key: 'filled', label: 'Filled' },
  { key: 'focus', label: 'Focus' },
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
  const textarea = (
    <Textarea
      aria-invalid={isInvalid || undefined}
      aria-label={`${row.label} ${column.label}`}
      defaultValue={
        column.key === 'filled' || column.key === 'focus'
          ? 'Pickle UI grows this field with its content, line after line.'
          : undefined
      }
      disabled={column.key === 'disabled'}
      placeholder={isInvalid ? 'Tell us a bit more' : 'Write a message'}
      size={row.key as NonNullable<TextareaProps['size']>}
    />
  );

  // The focus ring is styled on the wrapper via :has(:focus-visible), so the
  // pseudo-state class goes on an ancestor to reach the inner <textarea>.
  return column.key === 'focus' ? (
    <div className="pseudo-focus-visible-all w-full">{textarea}</div>
  ) : (
    textarea
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Textarea">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={TextareaMatrixCell}
          cellClassName="justify-stretch"
          cellWidth="16rem"
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
