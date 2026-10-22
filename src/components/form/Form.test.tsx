import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { Form } from './Form';

type TestFormValues = {
  channel: string;
  email: string;
  message: string;
  productUpdates: boolean;
  role: string;
  terms: boolean;
};

const defaultValues: TestFormValues = {
  channel: 'email',
  email: '',
  message: '',
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

      <Form.Field label="Message" name="message">
        <Form.Textarea />
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
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hello' },
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
          message: 'Hello',
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

  describe('Form.Combobox', () => {
    type Fruit = { label: string; value: string };
    type FruitFormValues = { fruit: Fruit | null; tags: Fruit[] };

    const FRUITS: Fruit[] = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ];

    function FruitForm({
      fruitError,
      onSubmit,
    }: {
      fruitError?: string;
      onSubmit: (values: FruitFormValues) => void;
    }) {
      const form = useForm<FruitFormValues>({
        defaultValues: { fruit: null, tags: [] },
      });
      const [tags, setTags] = React.useState(FRUITS);

      React.useEffect(() => {
        if (fruitError) {
          form.setError('fruit', { message: fruitError, type: 'manual' });
        }
      }, [form, fruitError]);

      return (
        <Form form={form} onSubmit={onSubmit}>
          <Form.Field label="Fruit" name="fruit">
            <Form.Combobox items={FRUITS}>
              <Form.Combobox.Input />
              <Form.Combobox.Content>
                <Form.Combobox.List>
                  {(fruit: Fruit) => (
                    <Form.Combobox.Item key={fruit.value} value={fruit}>
                      {fruit.label}
                    </Form.Combobox.Item>
                  )}
                </Form.Combobox.List>
              </Form.Combobox.Content>
            </Form.Combobox>
          </Form.Field>

          <Form.Field label="Tags" name="tags">
            <Form.Combobox
              items={tags}
              multiple
              onCreate={(label) => {
                const tag = { label, value: label.toLowerCase() };
                setTags((current) => [...current, tag]);

                return tag;
              }}
            >
              <Form.Combobox.Chips>
                <Form.Combobox.Value>
                  {(value: Fruit[]) => (
                    <>
                      {value.map((tag) => (
                        <Form.Combobox.Chip key={tag.value}>
                          {tag.label}
                        </Form.Combobox.Chip>
                      ))}
                      <Form.Combobox.ChipsInput />
                    </>
                  )}
                </Form.Combobox.Value>
              </Form.Combobox.Chips>
              <Form.Combobox.Content>
                <Form.Combobox.List>
                  {(tag: Fruit) => (
                    <Form.Combobox.Item key={tag.value} value={tag}>
                      {tag.label}
                    </Form.Combobox.Item>
                  )}
                </Form.Combobox.List>
              </Form.Combobox.Content>
            </Form.Combobox>
          </Form.Field>

          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      );
    }

    function type(name: string, text: string) {
      const input = screen.getByRole('combobox', { name });
      fireEvent.focus(input);
      fireEvent.input(input, {
        inputType: 'insertText',
        target: { value: text },
      });
    }

    it('submits selected and created items', async () => {
      const handleSubmit = vi.fn();
      render(<FruitForm onSubmit={handleSubmit} />);

      type('Fruit', 'Ban');
      fireEvent.click(await screen.findByRole('option', { name: 'Banana' }));

      type('Tags', 'Kiwi');
      fireEvent.click(
        await screen.findByRole('option', { name: 'Create "Kiwi"' }),
      );

      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          {
            fruit: FRUITS[1],
            tags: [{ label: 'Kiwi', value: 'kiwi' }],
          },
          expect.anything(),
        );
      });
    });

    it('marks the input invalid from React Hook Form state', async () => {
      render(<FruitForm fruitError="Pick a fruit." onSubmit={vi.fn()} />);

      expect(await screen.findByText('Pick a fruit.')).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });
  });
});
