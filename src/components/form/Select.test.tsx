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
          <Select.Item label="Designer" value="designer" />
          <Select.Item label="Engineer" value="engineer" />
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Designer');
    expect(screen.getByRole('combobox')).not.toHaveTextContent('designer');
  });
});
