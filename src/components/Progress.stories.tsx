import type { Meta, StoryObj } from '@storybook/react-vite';

import { useEffect, useState } from 'react';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Progress } from './Progress';
import { Text } from './Text';
import { XStack } from './XStack';
import { YStack } from './YStack';

const meta = {
  args: {
    value: 50,
  },
  component: Progress,
  parameters: { layout: 'fullscreen' },
  title: 'components/Progress',
} satisfies Meta<typeof Progress>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const VALUE_ROWS = [{ key: 'default', label: 'Default' }];

const STATE_COLUMNS = [
  { key: '25', label: '25%' },
  { key: '50', label: '50%' },
  { key: '75', label: '75%' },
  { key: '100', label: 'Complete' },
];

function AnimatedProgress() {
  const [value, setValue] = useState(20);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : Math.min(100, current + 10)));
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Progress className="max-w-sm grid-cols-[1fr_auto]" value={value}>
      <Progress.Label>Export data</Progress.Label>
      <Progress.Value />
      <Progress.Track className="col-span-2">
        <Progress.Indicator />
      </Progress.Track>
    </Progress>
  );
}

function ProgressValueCell({ column }: ComponentMatrixCellProps) {
  return <Progress value={Number(column.key)} />;
}

export const All: StoryDefinition = {
  args: {
    value: 50,
  },
  render: () => (
    <Story.Layout className="max-w-5xl" title="Progress">
      <Story.Section title="Values">
        <Story.Matrix
          Cell={ProgressValueCell}
          cellClassName="justify-stretch"
          cellWidth="10rem"
          columns={STATE_COLUMNS}
          rows={VALUE_ROWS}
        />
      </Story.Section>

      <Story.Section title="Labeled progress">
        <YStack gap={6}>
          <Progress className="max-w-sm grid-cols-[1fr_auto]" value={72}>
            <Progress.Label>Design capacity</Progress.Label>
            <Progress.Value />
            <Progress.Track className="col-span-2">
              <Progress.Indicator />
            </Progress.Track>
          </Progress>
        </YStack>
      </Story.Section>

      <Story.Section title="Animated">
        <AnimatedProgress />
      </Story.Section>

      <Story.Section title="Custom indicator">
        <Progress className="max-w-sm" value={63}>
          <XStack className="mb-2" justify="between">
            <Progress.Label>Engineering</Progress.Label>
            <Text tone="muted" variant="small">
              63%
            </Text>
          </XStack>
          <Progress.Track>
            <Progress.Indicator indicatorClassName="bg-chart-2" />
          </Progress.Track>
        </Progress>
      </Story.Section>
    </Story.Layout>
  ),
};
