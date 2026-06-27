import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { Form } from './Form';

type TestFormValues = {
  channel: string;
  email: string;
  productUpdates: boolean;
  role: string;
  terms: boolean;
};

const defaultValues: TestFormValues = {
  channel: 'email',
  email: '',
  productUpdates: false,
  role: 'designer',
  terms: false,
};

function TestForm({
  fieldErrors,
  onSubmit,
  withEmailError,
}: {
  fieldErrors?: Partial<Record<keyof TestFormValues, string>>;
  onSubmit: (values: TestFormValues) => void;
  withEmailError?: boolean;
}) {
  const form = useForm<TestFormValues>({ defaultValues });

  React.useEffect(() => {
    if (withEmailError) {
      form.setError('email', {
        message: 'Enter a valid email address.',
        type: 'manual',
      });
    }

    for (const [name, message] of Object.entries(fieldErrors ?? {}) as [
      keyof TestFormValues,
      string,
    ][]) {
      form.setError(name, {
        message,
        type: 'manual',
      });
    }
  }, [fieldErrors, form, withEmailError]);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Field label="Email" name="email">
        <Form.Input autoComplete="email" />
      </Form.Field>

      <Form.Field label="Role" name="role">
        <Form.Select>
          <Form.Select.Trigger>
            <Form.Select.Value placeholder="Select a role" />
          </Form.Select.Trigger>
          <Form.Select.Content>
            <Form.Select.Item value="designer">Designer</Form.Select.Item>
            <Form.Select.Item value="engineer">Engineer</Form.Select.Item>
          </Form.Select.Content>
        </Form.Select>
      </Form.Field>

      <Form.Field label="Notification channel" name="channel">
        <Form.RadioGroup>
          <Form.RadioGroup.Item label="Email" value="email" />
          <Form.RadioGroup.Item label="SMS" value="sms" />
        </Form.RadioGroup>
      </Form.Field>

      <Form.Field name="productUpdates">
        <Form.Switch label="Product updates" />
      </Form.Field>

      <Form.Field name="terms">
        <Form.Checkbox label="Accept terms" />
      </Form.Field>

      <Form.Button type="submit">Submit</Form.Button>
    </Form>
  );
}

describe('Form', () => {
  it('registers fields and submits React Hook Form values', async () => {
    const handleSubmit = vi.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ugo@example.com' },
    });
    fireEvent.click(screen.getByRole('switch', { name: 'Product updates' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    fireEvent.click(screen.getByRole('radio', { name: 'SMS' }));
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          channel: 'sms',
          email: 'ugo@example.com',
          productUpdates: true,
          role: 'designer',
          terms: true,
        },
        expect.anything(),
      );
    });
  });

  it('displays field errors from React Hook Form state', async () => {
    render(<TestForm onSubmit={vi.fn()} withEmailError />);

    expect(
      await screen.findByText('Enter a valid email address.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('marks controlled boolean fields invalid from React Hook Form state', async () => {
    render(
      <TestForm
        fieldErrors={{
          productUpdates: 'Choose a product update preference.',
          terms: 'Accept the terms to continue.',
        }}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      await screen.findByText('Choose a product update preference.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('switch', { name: 'Product updates' }),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).toHaveAttribute('aria-invalid', 'true');
  });
});
