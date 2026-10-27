import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a progressbar with the provided value', () => {
    render(<Progress aria-label="Upload" value={45} />);

    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute(
      'aria-valuenow',
      '45',
    );
  });

  it('renders labeled progress parts', () => {
    render(
      <Progress value={72}>
        <Progress.Label>Design</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress>,
    );

    expect(screen.getByText('Design')).toBeInTheDocument();
  });
});
