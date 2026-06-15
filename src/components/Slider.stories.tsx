import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider';
import { type ComponentMatrixCellProps, Story } from './Story';

const meta = {
  component: Slider,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Slider',
} satisfies Meta<typeof Slider>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

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

function SliderAnatomy() {
  return (
    <div className="space-y-8">
      <Slider
        aria-label="anatomy"
        className="max-w-lg [&_[data-slot=slider-control]]:rounded-md [&_[data-slot=slider-control]]:bg-sky-500/15 [&_[data-slot=slider-control]]:outline [&_[data-slot=slider-control]]:outline-sky-500/40 [&_[data-slot=slider-control]]:outline-dashed [&_[data-slot=slider-thumb]]:before:rounded-full [&_[data-slot=slider-thumb]]:before:bg-fuchsia-500/25 [&_[data-slot=slider-thumb]]:before:outline [&_[data-slot=slider-thumb]]:before:outline-fuchsia-500/50 [&_[data-slot=slider-thumb]]:before:outline-dashed"
        defaultValue={[45]}
      />
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 size-4 shrink-0 rounded-sm bg-sky-500/15 outline outline-sky-500/40 outline-dashed" />
          <div>
            <dt className="text-foreground text-sm font-medium">
              Bar hit area
            </dt>
            <dd className="text-muted-foreground mt-1 text-xs">
              The <code>Slider.Control</code> padding. The visible track stays
              thin, but the grabbable region extends above and below it.
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 size-4 shrink-0 rounded-full bg-fuchsia-500/25 outline outline-fuchsia-500/50 outline-dashed" />
          <div>
            <dt className="text-foreground text-sm font-medium">
              Thumb hit area
            </dt>
            <dd className="text-muted-foreground mt-1 text-xs">
              A <code>::before</code> pseudo-element inset around the thumb,
              enlarging the grab target without changing its visual size.
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

function SliderMatrixCell({ column, row }: ComponentMatrixCellProps) {
  return <SliderPreview columnKey={column.key} rowKey={row.key} />;
}

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

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Slider">
      <Story.Section title="Modes and scales">
        <Story.Matrix
          Cell={SliderMatrixCell}
          cellClassName="justify-stretch"
          columns={SCALE_COLUMNS}
          rows={MODE_ROWS}
        />
      </Story.Section>
      <Story.Section title="Anatomy">
        <SliderAnatomy />
      </Story.Section>
    </Story.Layout>
  ),
};
