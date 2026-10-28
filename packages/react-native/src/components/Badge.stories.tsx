import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Badge, type BadgeProps } from './Badge';

const meta = {
  component: Badge,
  parameters: { layout: 'fullscreen' },
  title: 'components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type BadgeSize = NonNullable<BadgeProps['size']>;
type BadgeVariant = NonNullable<BadgeProps['variant']>;
type StoryDefinition = StoryObj<typeof meta>;

const DISPLAY_COLUMNS = [
  { key: 'label', label: 'Label only' },
  { key: 'icon', label: 'With icon' },
];

const SEMANTIC_ROWS: { key: BadgeVariant; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'outline', label: 'Outline' },
  { key: 'info', label: 'Info' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
  { key: 'destructive', label: 'Destructive' },
];

const STATUS_ROWS: { key: BadgeVariant; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'inProgress', label: 'In progress' },
  { key: 'inReview', label: 'In review' },
  { key: 'failed', label: 'Failed' },
  { key: 'expired', label: 'Expired' },
];

const SIZE_COLUMNS: { description: string; key: BadgeSize; label: string }[] = [
  { description: 'h-4', key: 'sm', label: 'Small' },
  { description: 'h-4.5', key: 'md', label: 'Medium' },
  { description: 'h-5.5', key: 'lg', label: 'Large' },
];

// Icons don't inherit the label's color on native; pass it to the icon.
const ICON_COLORS: Record<BadgeVariant, string> = {
  default: 'bg-primary-foreground',
  destructive: 'bg-destructive-foreground',
  error: 'bg-destructive-subtle-foreground',
  expired: 'bg-secondary-foreground',
  failed: 'bg-destructive-subtle-foreground',
  info: 'bg-info-subtle-foreground',
  inProgress: 'bg-info-subtle-foreground',
  inReview: 'bg-warning-subtle-foreground',
  outline: 'bg-foreground',
  pending: 'bg-warning-subtle-foreground',
  secondary: 'bg-secondary-foreground',
  submitted: 'bg-info-subtle-foreground',
  success: 'bg-success-subtle-foreground',
  warning: 'bg-warning-subtle-foreground',
};

function BadgeCell({ column, row }: ComponentMatrixCellProps) {
  const variant = row.key as BadgeVariant;

  return (
    <Badge variant={variant}>
      {column.key === 'icon' ? (
        <Story.PlaceholderIcon className={ICON_COLORS[variant]} />
      ) : null}
      {row.label}
    </Badge>
  );
}

function BadgeSizeCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Badge size={column.key as BadgeSize} variant={row.key as BadgeVariant}>
      {row.label}
    </Badge>
  );
}

export const All: StoryDefinition = {
  args: { children: 'Badge' },
  render: () => (
    <Story.Layout className="max-w-4xl" title="Badge">
      <Story.Section title="Semantic badges">
        <Story.Matrix
          Cell={BadgeCell}
          cellClassName="min-h-16"
          columns={DISPLAY_COLUMNS}
          rows={SEMANTIC_ROWS}
        />
      </Story.Section>

      <Story.Section title="Statuses">
        <Story.Matrix
          Cell={BadgeCell}
          cellClassName="min-h-16"
          columns={DISPLAY_COLUMNS}
          rows={STATUS_ROWS}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={BadgeSizeCell}
          cellClassName="min-h-16"
          columns={SIZE_COLUMNS}
          rows={SEMANTIC_ROWS.slice(0, 3)}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
