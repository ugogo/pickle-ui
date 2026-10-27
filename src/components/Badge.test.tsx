import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders content and forwards native props', () => {
    render(<Badge aria-label="Status">Ready</Badge>);
    expect(screen.getByLabelText('Status')).toHaveTextContent('Ready');
  });

  it('supports the success variant', () => {
    render(<Badge variant="success">Complete</Badge>);
    expect(screen.getByText('Complete')).toHaveClass('bg-success-subtle');
  });

  it('exposes its variant and size as data attributes, defaults included', () => {
    render(
      <>
        <Badge>New</Badge>
        <Badge size="sm" variant="warning">
          Pending
        </Badge>
      </>,
    );

    expect(screen.getByText('New')).toHaveAttribute('data-variant', 'default');
    expect(screen.getByText('New')).toHaveAttribute('data-size', 'md');
    expect(screen.getByText('Pending')).toHaveAttribute(
      'data-variant',
      'warning',
    );
    expect(screen.getByText('Pending')).toHaveAttribute('data-size', 'sm');
  });
});
