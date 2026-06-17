import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '../Input';
import { Field } from './Field';

describe('Field', () => {
  it('Field.Label is associated with the wrapped Input via getByLabelText', () => {
    render(
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Control render={<Input type="email" />} />
      </Field>,
    );
    // getByLabelText resolves the label→input association.
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders Field.Description with the correct text', () => {
    render(
      <Field>
        <Field.Label>Username</Field.Label>
        <Field.Control render={<Input />} />
        <Field.Description>Choose a unique username.</Field.Description>
      </Field>,
    );
    expect(screen.getByText('Choose a unique username.')).toBeInTheDocument();
  });

  it('Field.Error is absent from the DOM when there is no validation failure', () => {
    render(
      <Field>
        <Field.Label>Name</Field.Label>
        <Field.Control render={<Input />} />
        <Field.Error match="valueMissing">Name is required.</Field.Error>
      </Field>,
    );
    // Base UI renders null when the match condition is not met.
    expect(screen.queryByText('Name is required.')).not.toBeInTheDocument();
  });

  it('renders with data-slot attributes on root, label, and description parts', () => {
    const { container } = render(
      <Field>
        <Field.Label>Test</Field.Label>
        <Field.Control render={<Input />} />
        <Field.Description>Desc</Field.Description>
      </Field>,
    );
    expect(container.querySelector('[data-slot="field"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="field-label"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="field-description"]'),
    ).toBeInTheDocument();
  });

  it('Field.Error with match=true is shown in the DOM', () => {
    render(
      <Field>
        <Field.Label>Test</Field.Label>
        <Field.Control render={<Input />} />
        <Field.Error match>Always visible error</Field.Error>
      </Field>,
    );
    expect(screen.getByText('Always visible error')).toBeInTheDocument();
    expect(
      screen
        .getByText('Always visible error')
        .closest('[data-slot="field-error"]'),
    ).toBeInTheDocument();
  });

  it('merges custom className on Field root', () => {
    render(
      <Field className="custom-field">
        <Field.Label>Test</Field.Label>
      </Field>,
    );
    expect(screen.getByText('Test').closest('[data-slot="field"]')).toHaveClass(
      'custom-field',
    );
  });
});
