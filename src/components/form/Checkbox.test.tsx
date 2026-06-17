import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('toggles on click', () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('does not render the check indicator when unchecked', () => {
    render(<Checkbox aria-label="Accept" />);
    expect(
      screen
        .getByRole('checkbox', { name: 'Accept' })
        .querySelector('[data-slot="checkbox-indicator"]'),
    ).not.toBeInTheDocument();
  });

  it('clicking the label toggles the checkbox', () => {
    render(<Checkbox label="Accept terms" />);
    const label = screen.getByText('Accept terms');
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });

  it('renders as indeterminate', () => {
    render(<Checkbox aria-label="Partial" indeterminate />);
    const checkbox = screen.getByRole('checkbox', { name: 'Partial' });
    // Base UI renders the checkbox root as a span with role="checkbox";
    // aria-checked="mixed" signals indeterminate state.
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('is disabled and blocks interaction', () => {
    render(<Checkbox aria-label="Accept" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('merges custom className', () => {
    render(<Checkbox aria-label="Accept" className="my-class" />);
    const root = screen
      .getByRole('checkbox', { name: 'Accept' })
      .closest('[data-slot="checkbox"]');
    expect(root).toHaveClass('my-class');
  });

  it('renders Checkbox.Label as a standalone label element', () => {
    render(
      <>
        <Checkbox aria-label="Composed" id="cb-compose" />
        <Checkbox.Label htmlFor="cb-compose">Composed label</Checkbox.Label>
      </>,
    );
    expect(screen.getByText('Composed label')).toHaveAttribute(
      'data-slot',
      'checkbox-label',
    );
  });
});
