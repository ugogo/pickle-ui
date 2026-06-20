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
    expect(screen.getByText('Complete')).toHaveClass('bg-success');
  });
});
