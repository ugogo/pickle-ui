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

function BadgeCell({ row }: ComponentMatrixCellProps) {
  return <Badge variant={row.key as BadgeVariant}>{row.label}</Badge>;
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
