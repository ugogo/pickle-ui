import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('renders the title, description and variant', () => {
    render(
      <Alert data-testid="alert" variant="warning">
        <Alert.Icon>
          <svg />
        </Alert.Icon>
        <Alert.Title>Trial ending soon</Alert.Title>
        <Alert.Description>Add a payment method.</Alert.Description>
        <Alert.Action>
          <button type="button">Upgrade</button>
        </Alert.Action>
      </Alert>,
    );

    const alert = screen.getByTestId('alert');

    expect(alert).toHaveAttribute('data-slot', 'alert');
    expect(alert).toHaveAttribute('data-variant', 'warning');
    expect(screen.getByText('Trial ending soon')).toHaveAttribute(
      'data-slot',
      'alert-title',
    );
    expect(screen.getByText('Add a payment method.')).toHaveAttribute(
      'data-slot',
      'alert-description',
    );
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument();
    expect(alert.querySelector('[data-slot="alert-icon"]')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('keeps the title and description at text-sm whatever the body size', () => {
    render(
      <Alert>
        <Alert.Title>Compact title</Alert.Title>
        <Alert.Description>Compact description</Alert.Description>
      </Alert>,
    );

    for (const text of ['Compact title', 'Compact description']) {
      const el = screen.getByText(text);
      expect(el).toHaveClass('text-sm');
      expect(el).not.toHaveClass('text-body');
    }
  });

  it('has no live role by default and accepts one', () => {
    const { rerender } = render(
      <Alert>
        <Alert.Title>Notice</Alert.Title>
      </Alert>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Notice').parentElement).toHaveAttribute(
      'data-variant',
      'default',
    );

    rerender(
      <Alert role="alert" variant="destructive">
        <Alert.Title>Failed</Alert.Title>
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  });
});
