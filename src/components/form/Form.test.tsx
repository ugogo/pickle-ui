import type { FormEvent } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Form } from './Form';

describe('Form', () => {
  it('renders a form element with data-slot', () => {
    render(<Form aria-label="Test form" />);
    expect(screen.getByRole('form', { name: 'Test form' })).toHaveAttribute(
      'data-slot',
      'form',
    );
  });

  it('exposes form parts on the compound component', () => {
    expect(Form.Input).toBeDefined();
    expect(Form.Checkbox).toBeDefined();
    expect(Form.Field).toBeDefined();
    expect(Form.Field.Label).toBeDefined();
    expect(Form.RadioGroup).toBeDefined();
    expect(Form.Select).toBeDefined();
    expect(Form.Switch).toBeDefined();
  });

  it('composes Field and Input for accessible labeling', () => {
    render(
      <Form>
        <Form.Field>
          <Form.Field.Label>Email</Form.Field.Label>
          <Form.Field.Control render={<Form.Input type="email" />} />
        </Form.Field>
      </Form>,
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('calls onSubmit when submitted', () => {
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    render(
      <Form onSubmit={onSubmit}>
        <Form.Button type="submit">Save</Form.Button>
      </Form>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
