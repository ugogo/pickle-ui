import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider';
import { ComponentMatrix, Section, StoryLayout } from './story-utils';

const meta = {
  component: Slider,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Slider',
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const MODE_ROWS = [
  { key: 'single', label: 'Single value' },
  { key: 'range', label: 'Range' },
  { key: 'labeled', label: 'With label' },
  { key: 'disabled', label: 'Disabled' },
];

const SCALE_COLUMNS = [
  { key: 'default', label: 'Default scale' },
  { key: 'stepped', label: 'Stepped marks' },
  { key: 'wide', label: 'Wide range' },
];

function SliderPreview({
  columnKey,
  rowKey,
}: {
  columnKey: string;
  rowKey: string;
}) {
  const isRange = rowKey === 'range';
  const isStepped = columnKey === 'stepped';
  const max = columnKey === 'wide' ? 500 : isStepped ? 12 : 100;
  const value = isRange ? [max * 0.25, max * 0.75] : [max * 0.45];

  return (
    <div className="w-full min-w-48">
      <Slider
        aria-label={`${rowKey} ${columnKey}`}
        defaultValue={value}
        disabled={rowKey === 'disabled'}
        max={max}
        step={isStepped ? 1 : undefined}
      >
        {rowKey === 'labeled' ? (
          <div className="mb-3 flex items-center justify-between">
            <Slider.Label>Intensity</Slider.Label>
            <Slider.Value />
          </div>
        ) : null}
      </Slider>
      {isStepped ? <Slider.Marks labelInterval={2} max={max} step={1} /> : null}
    </div>
  );
}

export const All: Story = {
  render: () => (
    <StoryLayout className="max-w-6xl" title="Slider">
      <Section title="Modes and scales">
        <ComponentMatrix
          cellClassName="justify-stretch"
          columns={SCALE_COLUMNS}
          renderCell={(row, column) => (
            <SliderPreview columnKey={column.key} rowKey={row.key} />
          )}
          rows={MODE_ROWS}
        />
      </Section>
    </StoryLayout>
  ),
};
