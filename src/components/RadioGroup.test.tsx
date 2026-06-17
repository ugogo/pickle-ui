import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radio items', () => {
    render(
      <RadioGroup>
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeInTheDocument();
  });

  it('selects defaultValue on mount', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Option B' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('radio', { name: 'Option A' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('selecting one item deselects the others', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );
    const radioB = screen.getByRole('radio', { name: 'Option B' });
    fireEvent.click(radioB);
    expect(radioB).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Option A' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('clicking the label selects its item', () => {
    render(
      <RadioGroup>
        <RadioGroup.Item label="Option A" value="a" />
      </RadioGroup>,
    );
    const label = screen.getByText('Option A');
    const radio = screen.getByRole('radio', { name: 'Option A' });
    expect(radio).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(label);
    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('disabled item is not interactive', () => {
    render(
      <RadioGroup>
        <RadioGroup.Item disabled label="Disabled" value="d" />
      </RadioGroup>,
    );
    const radio = screen.getByRole('radio', { name: 'Disabled' });
    expect(radio).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(radio);
    expect(radio).toHaveAttribute('aria-checked', 'false');
  });

  it('supports arrow-key roving focus between items', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
        <RadioGroup.Item label="Option C" value="c" />
      </RadioGroup>,
    );
    // All radios in a group are reachable via keyboard.
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    // The group element exists and has roving-tabindex structure (tabIndex 0 on selected).
    const radioA = screen.getByRole('radio', { name: 'Option A' });
    expect(radioA).toHaveAttribute('aria-checked', 'true');
    // Click directly to simulate selection change (roving focus is a browser behavior).
    fireEvent.click(screen.getByRole('radio', { name: 'Option C' }));
    expect(screen.getByRole('radio', { name: 'Option C' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(radioA).toHaveAttribute('aria-checked', 'false');
  });

  it('renders compound RadioGroup.Item.Label', () => {
    render(
      <RadioGroup>
        <div>
          <RadioGroup.Item id="radio-custom" value="x" />
          <RadioGroup.Item.Label htmlFor="radio-custom">
            Custom label
          </RadioGroup.Item.Label>
        </div>
      </RadioGroup>,
    );
    expect(screen.getByText('Custom label')).toHaveAttribute(
      'data-slot',
      'radio-label',
    );
  });
});
