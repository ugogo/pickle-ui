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

  it('keeps the hover border treatment while open', () => {
    render(
      <Select defaultOpen>
        <Select.Trigger>
          <Select.Value placeholder="Theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">Light</Select.Item>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveAttribute('data-popup-open');
    expect(screen.getByRole('combobox')).toHaveClass(
      'data-popup-open:border-ring/50',
    );
  });

  it('labels the trigger with Select.Label', () => {
    render(
      <Select>
        <Select.Label>Role</Select.Label>
        <Select.Trigger>
          <Select.Value placeholder="Select a role" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="designer">Designer</Select.Item>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Role' })).toBeInTheDocument();
    expect(screen.getByText('Role')).toHaveAttribute(
      'data-slot',
      'select-label',
    );
  });

  it('renders group labels separately from Select.Label', () => {
    render(
      <Select defaultOpen defaultValue="light">
        <Select.Trigger>
          <Select.Value placeholder="Theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.GroupLabel>Appearance</Select.GroupLabel>
            <Select.Item value="light">Light</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByText('Appearance')).toHaveAttribute(
      'data-slot',
      'select-group-label',
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Light');
  });
});
