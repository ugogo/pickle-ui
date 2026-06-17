import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label', () => {
  it('renders with the correct text', () => {
    render(<Label htmlFor="ctrl">My label</Label>);
    expect(screen.getByText('My label')).toBeInTheDocument();
  });

  it('sets htmlFor on the underlying <label>', () => {
    render(<Label htmlFor="my-input">Name</Label>);
    const label = screen.getByText('Name');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'my-input');
  });

  it('associates with the correct control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="focus-input">Click me</Label>
        <input id="focus-input" type="text" />
      </>,
    );
    // The label's `for` attribute matches the input's `id`, proving accessible association.
    const label = screen.getByText('Click me');
    expect(label).toHaveAttribute('for', 'focus-input');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'focus-input');
  });

  it('clicking the label toggles an associated checkbox', () => {
    render(
      <>
        <Label htmlFor="toggle-check">Toggle</Label>
        <input id="toggle-check" type="checkbox" />
      </>,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(screen.getByText('Toggle'));
    expect(checkbox).toBeChecked();
  });

  it('merges custom className', () => {
    render(
      <Label className="custom-class" htmlFor="ctrl">
        Label
      </Label>,
    );
    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });

  it('has data-slot="label"', () => {
    render(<Label htmlFor="ctrl">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('data-slot', 'label');
  });
});
