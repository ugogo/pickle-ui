import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Badge, type BadgeProps } from './Badge';

const meta = {
  component: Badge,
  parameters: { layout: 'fullscreen' },
  title: 'components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const DISPLAY_COLUMNS = [
  { key: 'label', label: 'Label only' },
  { key: 'icon', label: 'With icon' },
];

const SEMANTIC_ROWS = [
  { key: 'default', label: 'Default' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'outline', label: 'Outline' },
  { key: 'info', label: 'Info' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
  { key: 'destructive', label: 'Destructive' },
];

function SemanticBadgeCell({ row }: ComponentMatrixCellProps) {
  return (
    <Badge variant={row.key as NonNullable<BadgeProps['variant']>}>
      {row.label}
    </Badge>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Badge">
      <Story.Section title="Semantic badges">
        <Story.Matrix
          Cell={SemanticBadgeCell}
          cellClassName="min-h-16"
          columns={DISPLAY_COLUMNS}
          rows={SEMANTIC_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
