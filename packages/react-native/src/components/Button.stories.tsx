import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Button, type ButtonProps } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type ButtonSize = NonNullable<ButtonProps['size']>;
type ButtonVariant = NonNullable<ButtonProps['variant']>;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: Partial<ButtonProps>;
}[] = [
  { key: 'default', label: 'Default', props: {} },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<ButtonProps>>;

const VARIANT_ROWS: {
  key: ButtonVariant;
  label: string;
}[] = [
  { key: 'default', label: 'Default' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost', label: 'Ghost' },
];

const SIZE_COLUMNS: { description: string; key: ButtonSize; label: string }[] =
  [
    { description: 'h-8', key: 'sm', label: 'Small' },
    { description: 'h-10', key: 'md', label: 'Medium' },
    { description: 'h-11', key: 'lg', label: 'Large' },
  ];

function ButtonSizeCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Button size={column.key as ButtonSize} variant={row.key as ButtonVariant}>
      Add
    </Button>
  );
}

function ButtonStateCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Button variant={row.key as ButtonVariant} {...STATE_PROPS[column.key]}>
      Button
    </Button>
  );
}

export const All: StoryDefinition = {
  args: { children: 'Button' },
  render: () => (
    <Story.Layout className="max-w-6xl" title="Button">
      <Story.Section title="Variants and states">
        <Story.Matrix
          Cell={ButtonStateCell}
          columns={STATE_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={ButtonSizeCell}
          columns={SIZE_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
