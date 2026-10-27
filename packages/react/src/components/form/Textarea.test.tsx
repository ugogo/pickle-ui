import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('styles the control wrapper with className and the textarea with classNames.textarea', () => {
    const { container } = render(
      <Textarea
        aria-label="Message"
        className="control-x"
        classNames={{ textarea: 'textarea-x' }}
      />,
    );

    expect(
      container.querySelector('[data-slot="textarea-control"]'),
    ).toHaveClass('control-x');
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveClass(
      'textarea-x',
    );
  });

  it('forwards native textarea props', () => {
    render(<Textarea aria-label="Bio" defaultValue="Hello" rows={6} />);

    const textarea = screen.getByRole('textbox', { name: 'Bio' });
    expect(textarea).toHaveValue('Hello');
    expect(textarea).toHaveAttribute('rows', '6');
  });
});
