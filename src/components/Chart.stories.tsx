import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Chart } from './Chart';

const revenueSeries = [
  { label: 'Jan', value: 62 },
  { label: 'Feb', value: 74 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 92 },
];

const meta = {
  args: {
    items: revenueSeries,
  },
  component: Chart,
  parameters: { layout: 'fullscreen' },
  title: 'components/Chart',
} satisfies Meta<typeof Chart>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  args: {
    items: revenueSeries,
  },
  render: () => (
    <Story.Layout className="max-w-3xl" title="Chart">
      <Story.Section title="Bar chart">
        <Chart items={revenueSeries}>
          <Chart.BarChart>
            <Chart.Bar />
          </Chart.BarChart>
          <Chart.XAxis />
        </Chart>
      </Story.Section>

      <Story.Section title="Custom bar color">
        <Chart items={revenueSeries.slice(0, 4)}>
          <Chart.BarChart>
            <Chart.Bar colorClassName="bg-chart-2" />
          </Chart.BarChart>
          <Chart.XAxis />
        </Chart>
      </Story.Section>
    </Story.Layout>
  ),
};
