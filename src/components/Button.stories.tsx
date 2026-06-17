import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconPlus } from '@tabler/icons-react';

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
type ButtonVariant = NonNullable<ButtonProps['variant']>;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: Partial<ButtonProps>;
}[] = [
  { key: 'default', label: 'Default', props: {} },
  { key: 'hover', label: 'Hover', props: { className: 'pseudo-hover' } },
  {
    key: 'focus',
    label: 'Focus',
    props: { className: 'pseudo-focus-visible' },
  },
  { key: 'active', label: 'Active', props: { className: 'pseudo-active' } },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<ButtonProps>>;

const VARIANT_ROWS: {
  key: ButtonVariant;
  label: string;
}[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost', label: 'Ghost' },
  { key: 'link', label: 'Link' },
];

const SIZE_COLUMNS = [
  { description: 'h-7', key: 'sm', label: 'Small' },
  { description: 'h-8 · default', key: 'md', label: 'Medium' },
  { description: 'h-9', key: 'lg', label: 'Large' },
];

const CONTENT_ROWS = [
  { key: 'text', label: 'Text' },
  { key: 'with-icon', label: 'Icon and text' },
  {
    description: 'Squared automatically — no icon size needed',
    key: 'icon',
    label: 'Icon only',
  },
];

type ButtonSize = NonNullable<ButtonProps['size']>;

function ButtonContentCell({ column, row }: ComponentMatrixCellProps) {
  const variant = column.key as ButtonVariant;

  if (row.key === 'icon') {
    return (
      <Button aria-label="Add" variant={variant}>
        <IconPlus stroke={2} />
      </Button>
    );
  }

  return (
    <Button variant={variant}>
      {row.key === 'with-icon' ? <IconPlus stroke={2} /> : null}
      Add
    </Button>
  );
}

function ButtonSizeCell({ column, row }: ComponentMatrixCellProps) {
  const size = column.key as ButtonSize;

  if (row.key === 'icon') {
    return (
      <Button aria-label="Add" size={size}>
        <IconPlus stroke={2} />
      </Button>
    );
  }

  return (
    <Button size={size}>
      {row.key === 'with-icon' ? <IconPlus stroke={2} /> : null}
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
  render: () => (
    <Story.Layout className="max-w-6xl" title="Button">
      <Story.Section title="Variants and states">
        <Story.Matrix
          Cell={ButtonStateCell}
          columns={STATE_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Content patterns">
        <Story.Matrix
          Cell={ButtonContentCell}
          columns={[
            { key: 'primary', label: 'Primary' },
            { key: 'outline', label: 'Outline' },
            { key: 'ghost', label: 'Ghost' },
          ]}
          rows={CONTENT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={ButtonSizeCell}
          columns={SIZE_COLUMNS}
          rows={CONTENT_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
