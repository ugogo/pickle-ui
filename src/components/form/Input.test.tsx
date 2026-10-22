import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('styles the control wrapper with className and the input with classNames.input', () => {
    const { container } = render(
      <Input
        aria-label="Email"
        className="control-x"
        classNames={{ input: 'input-x' }}
      />,
    );
    expect(container.querySelector('[data-slot="input-control"]')).toHaveClass(
      'control-x',
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveClass(
      'input-x',
    );
  });
});
