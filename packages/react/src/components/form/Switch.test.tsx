import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a switch wired to its label', () => {
    render(<Switch label="Notifications" />);
    expect(
      screen.getByRole('switch', { name: 'Notifications' }),
    ).toBeInTheDocument();
  });

  it('applies classNames to the field, thumb, and label slots', () => {
    const { container } = render(
      <Switch
        classNames={{ field: 'field-x', label: 'label-x', thumb: 'thumb-x' }}
        label="Notifications"
      />,
    );
    expect(container.querySelector('[data-slot="switch-field"]')).toHaveClass(
      'field-x',
    );
    expect(container.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      'thumb-x',
    );
    expect(screen.getByText('Notifications')).toHaveClass('label-x');
  });
});
