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
  { key: 'loading', label: 'Loading', props: { loading: true } },
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
  { key: 'destructive-outline', label: 'Destructive outline' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost', label: 'Ghost' },
  { key: 'link', label: 'Link' },
];

const SIZE_COLUMNS: {
  description: string;
  icon: ButtonSize;
  key: ButtonSize;
  label: string;
}[] = [
  { description: 'h-6', icon: 'icon-xs', key: 'xs', label: 'Extra small' },
  { description: 'h-7', icon: 'icon-sm', key: 'sm', label: 'Small' },
  { description: 'h-8', icon: 'icon', key: 'md', label: 'Medium' },
  { description: 'h-9', icon: 'icon-lg', key: 'lg', label: 'Large' },
  { description: 'h-10', icon: 'icon-xl', key: 'xl', label: 'Extra large' },
];

const ICON_SIZES = Object.fromEntries(
  SIZE_COLUMNS.map((column) => [column.key, column.icon]),
) as Record<string, ButtonSize>;

const CONTENT_ROWS = [
  { key: 'text', label: 'Text' },
  { key: 'with-icon', label: 'Icon and text' },
  {
    description: 'Use an icon size with accessibilityLabel',
    key: 'icon',
    label: 'Icon only',
  },
];

// Icons don't inherit the label's color on native; pass it to the icon.
const ICON_COLORS: Record<ButtonVariant, string> = {
  default: 'bg-primary-foreground',
  destructive: 'bg-destructive-foreground',
  'destructive-outline': 'bg-destructive-subtle-foreground',
  ghost: 'bg-foreground',
  link: 'bg-foreground',
  outline: 'bg-foreground',
  secondary: 'bg-secondary-foreground',
};

function ButtonContentCell({ column, row }: ComponentMatrixCellProps) {
  const variant = column.key as ButtonVariant;
  const icon = <Story.PlaceholderIcon className={ICON_COLORS[variant]} />;

  if (row.key === 'icon') {
    return (
      <Button accessibilityLabel="Add" size="icon" variant={variant}>
        {icon}
      </Button>
    );
  }

  return (
    <Button variant={variant}>
      {row.key === 'with-icon' ? icon : null}
      Add
    </Button>
  );
}

function ButtonSizeCell({ column, row }: ComponentMatrixCellProps) {
  const icon = <Story.PlaceholderIcon className={ICON_COLORS.default} />;

  if (row.key === 'icon') {
    return (
      <Button accessibilityLabel="Add" size={ICON_SIZES[column.key]}>
        {icon}
      </Button>
    );
  }

  return (
    <Button size={column.key as ButtonSize}>
      {row.key === 'with-icon' ? icon : null}
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

      <Story.Section title="Content patterns">
        <Story.Matrix
          Cell={ButtonContentCell}
          columns={[
            { key: 'default', label: 'Default' },
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
