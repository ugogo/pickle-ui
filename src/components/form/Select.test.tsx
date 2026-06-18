import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from './Select';

describe('Select', () => {
  it('renders item labels in the trigger instead of raw values', () => {
    render(
      <Select defaultValue="designer">
        <Select.Trigger>
          <Select.Value placeholder="Select a role" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="designer">Designer</Select.Item>
          <Select.Item value="engineer">Engineer</Select.Item>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Designer');
    expect(screen.getByRole('combobox')).not.toHaveTextContent('designer');
  });

  it('supports children as item labels', () => {
    render(
      <Select defaultValue="light">
        <Select.Trigger>
          <Select.Value placeholder="Theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">Light</Select.Item>
          <Select.Item value="dark">Dark</Select.Item>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Light');
  });
});
