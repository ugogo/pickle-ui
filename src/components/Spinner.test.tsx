import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('announces a loading status', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('accepts a custom accessible name', () => {
    render(<Spinner aria-label="Saving" />);

    expect(screen.getByRole('status', { name: 'Saving' })).toBeInTheDocument();
  });

  it('is decorative when aria-hidden', () => {
    const { container } = render(<Spinner aria-hidden />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).not.toHaveAttribute('aria-label');
  });
});
