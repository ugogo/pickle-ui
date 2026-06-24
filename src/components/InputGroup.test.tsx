import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './Input';
import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  it('renders an addon alongside an input', () => {
    render(
      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <Input aria-label="Amount" />
      </InputGroup>,
    );

    expect(screen.getByText('$')).toHaveAttribute(
      'data-slot',
      'input-group-addon',
    );
    expect(screen.getByRole('textbox', { name: 'Amount' })).toBeInTheDocument();
  });
});
