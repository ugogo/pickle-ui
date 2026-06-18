import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod/v4';

import {
  Form,
  FormCheckbox,
  FormInput,
  FormInputGroup,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
} from './Form';

type TestValues = {
  email: string;
  notifications: boolean;
  role: string;
};

describe('Form', () => {
  it('renders a form element with data-slot', () => {
    render(<Form aria-label="Test form" />);
    expect(screen.getByRole('form', { name: 'Test form' })).toHaveAttribute(
      'data-slot',
      'form',
    );
    expect(screen.getByRole('form', { name: 'Test form' })).toHaveAttribute(
      'novalidate',
    );
  });

  it('exposes form parts on the compound component', () => {
    expect(Form.Field).toBeDefined();
    expect(Form.Field.Label).toBeDefined();
    expect(FormCheckbox).toBeDefined();
    expect(FormInput).toBeDefined();
    expect(FormInputGroup).toBeDefined();
    expect(FormRadioGroup).toBeDefined();
    expect(FormRadioGroup.Item).toBeDefined();
    expect(FormSelect).toBeDefined();
    expect(FormSelect.Trigger).toBeDefined();
    expect(FormSwitch).toBeDefined();
  });

  it('wires a direct FormInput child from Field label and description props', () => {
    render(
      <Form>
        <Form.Field
          description="Use your work address."
          label="Email"
          name="email"
        >
          <FormInput type="email" />
        </Form.Field>
      </Form>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('name', 'email');
    expect(screen.getByText('Use your work address.')).toBeInTheDocument();
  });

  it('automatically displays Zod resolver errors', async () => {
    const schema = z.object({
      email: z.email('Enter a valid email address.'),
    });

    function ErrorForm() {
      const form = useForm<z.infer<typeof schema>>({
        defaultValues: { email: '' },
        resolver: zodResolver(schema),
      });

      return (
        <Form aria-label="Zod form" form={form} onSubmit={() => undefined}>
          <Form.Field
            description="We'll send a confirmation link."
            label="Email"
            name="email"
          >
            <FormInput />
          </Form.Field>
        </Form>
      );
    }

    render(<ErrorForm />);
    expect(
      screen.getByText("We'll send a confirmation link."),
    ).toBeInTheDocument();

    fireEvent.submit(screen.getByRole('form', { name: 'Zod form' }));

    expect(
      await screen.findByText('Enter a valid email address.'),
    ).toHaveAttribute('data-slot', 'field-error');
    expect(
      screen.queryByText("We'll send a confirmation link."),
    ).not.toBeInTheDocument();
  });

  it('uses custom field error copy when provided', async () => {
    function ErrorForm() {
      const form = useForm<TestValues>();

      React.useEffect(() => {
        form.setError('email', { message: 'Native server copy.' });
      }, [form]);

      return (
        <Form form={form}>
          <Form.Field error="Use another email." label="Email" name="email">
            <FormInput type="email" />
          </Form.Field>
        </Form>
      );
    }

    render(<ErrorForm />);

    expect(await screen.findByText('Use another email.')).toBeInTheDocument();
    expect(screen.queryByText('Native server copy.')).not.toBeInTheDocument();
  });

  it('labels a direct Select child from Form.Field', () => {
    render(
      <Form>
        <Form.Field label="Role" name="role">
          <FormSelect defaultValue="designer">
            <FormSelect.Trigger>
              <FormSelect.Value placeholder="Select a role" />
            </FormSelect.Trigger>
            <FormSelect.Content>
              <FormSelect.Item value="designer">Designer</FormSelect.Item>
            </FormSelect.Content>
          </FormSelect>
        </Form.Field>
      </Form>,
    );

    expect(screen.getByRole('combobox', { name: 'Role' })).toBeInTheDocument();
  });

  it('labels a direct RadioGroup child from Form.Field', () => {
    render(
      <Form>
        <Form.Field label="Notification channel">
          <FormRadioGroup defaultValue="email" name="notificationChannel">
            <FormRadioGroup.Item label="Email" value="email" />
            <FormRadioGroup.Item label="SMS" value="sms" />
          </FormRadioGroup>
        </Form.Field>
      </Form>,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'Notification channel' }),
    ).toBeInTheDocument();
  });

  it('submits react-hook-form values from Form controls', async () => {
    const onSubmit = vi.fn();

    function TestForm() {
      const form = useForm<TestValues>({
        defaultValues: {
          email: '',
          notifications: true,
          role: 'designer',
        },
      });

      return (
        <Form form={form} onSubmit={onSubmit}>
          <Form.Field label="Email" name="email">
            <FormInput type="email" />
          </Form.Field>
          <Form.Field label="Role" name="role">
            <FormSelect>
              <FormSelect.Trigger>
                <FormSelect.Value placeholder="Select a role" />
              </FormSelect.Trigger>
              <FormSelect.Content>
                <FormSelect.Item value="designer">Designer</FormSelect.Item>
                <FormSelect.Item value="engineer">Engineer</FormSelect.Item>
              </FormSelect.Content>
            </FormSelect>
          </Form.Field>
          <Form.Field name="notifications">
            <FormCheckbox label="Notifications" />
          </Form.Field>
          <Form.Button type="submit">Save</Form.Button>
        </Form>
      );
    }

    render(<TestForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ugo@example.com' },
    });
    fireEvent.submit(
      screen.getByRole('button', { name: 'Save' }).closest('form')!,
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          email: 'ugo@example.com',
          notifications: true,
          role: 'designer',
        },
        expect.anything(),
      );
    });
  });
});
