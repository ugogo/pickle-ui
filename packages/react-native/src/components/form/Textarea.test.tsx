import { render, screen } from '@testing-library/react-native';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a multi-line field', async () => {
    await render(
      <Textarea accessibilityLabel="Message" defaultValue="Hello" />,
    );

    const field = screen.getByLabelText('Message');
    expect(field).toHaveProp('multiline', true);
    expect(field).toHaveDisplayValue('Hello');
  });

  it('styles the control with className and the field with classNames.textarea', async () => {
    await render(
      <Textarea
        accessibilityLabel="Message"
        className="control-x"
        classNames={{ textarea: 'textarea-x' }}
      />,
    );

    const field = screen.getByLabelText('Message');
    expect(field).toHaveProp(
      'className',
      expect.stringContaining('textarea-x'),
    );
    expect(field.parent).toHaveProp(
      'className',
      expect.stringContaining('control-x'),
    );
  });
});
