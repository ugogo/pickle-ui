import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Chart } from './Chart';

describe('Chart', () => {
  it('renders axis labels for each item', () => {
    const { container } = render(
      <Chart
        items={[
          { label: 'Jan', value: 50 },
          { label: 'Feb', value: 80 },
        ]}
      >
        <Chart.BarChart>
          <Chart.Bar />
        </Chart.BarChart>
        <Chart.XAxis />
      </Chart>,
    );

    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="chart-bar"]').length).toBe(
      2,
    );
  });
});
