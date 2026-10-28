import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Button } from '../Button';
import { XStack } from '../XStack';
import { Input } from './Input';

const meta = {
  component: Input,
  parameters: { layout: 'fullscreen' },
  title: 'components/form/Input',
} satisfies Meta<typeof Input>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

// No focus column: React Native can't force a focus state. Tap a field.
const STATE_COLUMNS = [
  { key: 'empty', label: 'Empty' },
  { key: 'filled', label: 'Filled' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
];

const TYPE_ROWS = [
  { description: 'General text input', key: 'text', label: 'Text' },
  { description: 'Keyboard for email', key: 'email', label: 'Email' },
  { description: 'Masked text entry', key: 'password', label: 'Password' },
];

function InputMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const isInvalid = column.key === 'invalid';

  return (
    <Input
      accessibilityLabel={`${row.label} ${column.label}`}
      defaultValue={
        column.key === 'filled'
          ? row.key === 'email'
            ? 'hello@pickle.dev'
            : 'Pickle UI'
          : undefined
      }
      disabled={column.key === 'disabled'}
      invalid={isInvalid}
      keyboardType={row.key === 'email' ? 'email-address' : 'default'}
      placeholder={isInvalid ? 'Check this value' : row.label}
      secureTextEntry={row.key === 'password'}
    />
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
    <XStack gap={2}>
      <Input
        accessibilityLabel={`${column.label} email`}
        className="flex-1"
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
          cellClassName="items-stretch"
          columns={STATE_COLUMNS}
          rows={TYPE_ROWS}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={InputSizeCell}
          cellClassName="items-stretch"
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
