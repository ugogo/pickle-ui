import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from './Form';
import { InputGroup } from './InputGroup';

type TestFormValues = {
  channel: string;
  email: string;
  message: string;
  terms: boolean;
  username: string;
};

const defaultValues: TestFormValues = {
  channel: 'email',
  email: '',
  message: '',
  terms: false,
  username: '',
};

function TestForm({
  fieldErrors,
  onSubmit,
}: {
  fieldErrors?: Partial<Record<keyof TestFormValues, string>>;
  onSubmit: (values: TestFormValues) => void;
}) {
  const form = useForm<TestFormValues>({ defaultValues });

  useEffect(() => {
    for (const [name, message] of Object.entries(fieldErrors ?? {}) as [
      keyof TestFormValues,
      string,
    ][]) {
      form.setError(name, { message, type: 'manual' });
    }
  }, [fieldErrors, form]);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Field
        description="We'll send a confirmation link."
        label="Email"
        name="email"
      >
        <Form.Input autoComplete="email" />
      </Form.Field>

      <Form.Field label="Username" name="username">
        <Form.InputGroup testID="username-group">
          <InputGroup.Addon>@</InputGroup.Addon>
          <Form.Input />
        </Form.InputGroup>
      </Form.Field>

      <Form.Field label="Message" name="message">
        <Form.Textarea />
      </Form.Field>

      <Form.Field label="Notification channel" name="channel">
        <Form.RadioGroup>
          <Form.RadioGroup.Item label="Email" value="email" />
          <Form.RadioGroup.Item label="SMS" value="sms" />
        </Form.RadioGroup>
      </Form.Field>

      <Form.Field name="terms">
        <Form.Checkbox label="Accept terms" />
      </Form.Field>

      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

describe('Form', () => {
  it('binds fields and submits React Hook Form values', async () => {
    const handleSubmit = jest.fn();
    await render(<TestForm onSubmit={handleSubmit} />);

    await fireEvent.changeText(
      screen.getByLabelText('Email'),
      'ugo@example.com',
    );
    await fireEvent.changeText(screen.getByLabelText('Username'), 'ugo');
    await fireEvent.changeText(screen.getByLabelText('Message'), 'Hello');
    await fireEvent.press(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    );
    await fireEvent.press(screen.getByRole('radio', { name: 'SMS' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          channel: 'sms',
          email: 'ugo@example.com',
          message: 'Hello',
          terms: true,
          username: 'ugo',
        },
        undefined,
      );
    });
  });

  it('submits from the return key, like Enter on the web', async () => {
    const handleSubmit = jest.fn();
    await render(<TestForm onSubmit={handleSubmit} />);

    await fireEvent(screen.getByLabelText('Email'), 'submitEditing');

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });

  it('shows the description until the field has an error', async () => {
    await render(
      <TestForm
        fieldErrors={{ email: 'Enter a valid email address.' }}
        onSubmit={jest.fn()}
      />,
    );

    expect(
      await screen.findByText('Enter a valid email address.'),
    ).toBeOnTheScreen();
    expect(screen.queryByText("We'll send a confirmation link.")).toBeNull();
    expect(screen.getByLabelText('Email').parent).toHaveProp(
      'className',
      expect.stringContaining('border-destructive/36'),
    );
  });

  it('frames an input group as invalid from the field', async () => {
    await render(
      <TestForm
        fieldErrors={{ username: 'Pick another username.' }}
        onSubmit={jest.fn()}
      />,
    );

    expect(await screen.findByText('Pick another username.')).toBeOnTheScreen();
    expect(screen.getByTestId('username-group')).toHaveProp(
      'className',
      expect.stringContaining('border-destructive/36'),
    );
  });

  it('marks a checkbox invalid from React Hook Form state', async () => {
    await render(
      <TestForm
        fieldErrors={{ terms: 'Accept the terms to continue.' }}
        onSubmit={jest.fn()}
      />,
    );

    expect(
      await screen.findByText('Accept the terms to continue.'),
    ).toBeOnTheScreen();
  });

  it('names the radio group by the field label', async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText('Notification channel')).toHaveProp(
      'accessibilityRole',
      'radiogroup',
    );
  });

  it('throws when a binding has no field name', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    function Unnamed() {
      const form = useForm();
      return (
        <Form form={form}>
          <Form.Input />
        </Form>
      );
    }

    await expect(render(<Unnamed />)).rejects.toThrow(
      'Form.Input requires a name prop or a parent <Form.Field name="...">.',
    );
  });
});
