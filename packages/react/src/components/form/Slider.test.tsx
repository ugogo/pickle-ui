import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Slider } from './Slider';

describe('Slider', () => {
  it('applies classNames to the control, track, indicator, and thumb slots', () => {
    const { container } = render(
      <Slider
        aria-label="Volume"
        classNames={{
          control: 'control-x',
          indicator: 'indicator-x',
          thumb: 'thumb-x',
          track: 'track-x',
        }}
        defaultValue={40}
      />,
    );
    expect(container.querySelector('[data-slot="slider-control"]')).toHaveClass(
      'control-x',
    );
    expect(container.querySelector('[data-slot="slider-track"]')).toHaveClass(
      'track-x',
    );
    expect(
      container.querySelector('[data-slot="slider-indicator"]'),
    ).toHaveClass('indicator-x');
    expect(container.querySelector('[data-slot="slider-thumb"]')).toHaveClass(
      'thumb-x',
    );
  });

  it('rounds the labels of fractional marks', () => {
    render(<Slider.Marks max={1} min={0} step={0.1} />);

    expect(screen.getByText('0.3')).toBeInTheDocument();
    expect(screen.getByText('0.7')).toBeInTheDocument();
  });
});
