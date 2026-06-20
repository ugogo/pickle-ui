import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ElementType } from 'react';

import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconLoader2,
  IconSearch,
  IconSend,
} from '@tabler/icons-react';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Badge, type BadgeProps } from './Badge';

const meta = {
  component: Badge,
  parameters: { layout: 'fullscreen' },
  title: 'components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type StatusVariant = Extract<
  NonNullable<BadgeProps['variant']>,
  | 'expired'
  | 'failed'
  | 'inProgress'
  | 'inReview'
  | 'pending'
  | 'submitted'
  | 'success'
>;

type StoryDefinition = StoryObj<typeof meta>;

const DISPLAY_COLUMNS = [
  { key: 'label', label: 'Label only' },
  { key: 'icon', label: 'With icon' },
];

const STATUS_ROWS = [
  { key: 'pending', label: 'Pending' },
  { key: 'inProgress', label: 'In progress' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'inReview', label: 'In review' },
  { key: 'success', label: 'Success' },
  { key: 'failed', label: 'Failed' },
  { key: 'expired', label: 'Expired' },
];

const statusIcons: Record<StatusVariant, ElementType> = {
  expired: IconClock,
  failed: IconCircleX,
  inProgress: IconLoader2,
  inReview: IconSearch,
  pending: IconAlertTriangle,
  submitted: IconSend,
  success: IconCircleCheck,
};

function BadgeMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const variant = row.key as StatusVariant;
  const Icon = statusIcons[variant];

  return (
    <Badge variant={variant}>
      {column.key === 'icon' ? <Icon /> : null}
      {row.label}
    </Badge>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Badge">
      <Story.Section title="Status badges">
        <Story.Matrix
          Cell={BadgeMatrixCell}
          cellClassName="min-h-20"
          columns={DISPLAY_COLUMNS}
          rows={STATUS_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
