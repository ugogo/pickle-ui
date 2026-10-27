import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button';
import { Input } from './Input';

const heightClasses = (element: Element) =>
  [...element.classList].filter((name) => /^(sm:)?h-/.test(name)).sort();

describe('Input', () => {
  it.each(['sm', 'md', 'lg'] as const)(
    'matches the Button height at size %s',
    (size) => {
      const { container } = render(
        <>
          <Input aria-label="Email" size={size} />
          <Button size={size}>Submit</Button>
        </>,
      );
      const control = container.querySelector('[data-slot="input-control"]')!;
      const unstyled = render(
        <Input aria-label="Name" size={size} unstyled />,
      ).getByRole('textbox', { name: 'Name' });
      const button = screen.getByRole('button', { name: 'Submit' });

      expect(heightClasses(control)).toEqual(heightClasses(button));
      expect(heightClasses(unstyled)).toEqual(heightClasses(button));
    },
  );

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
