import { fireEvent, render, screen } from '@testing-library/react-native';

import { Input } from './Input';

describe('Input', () => {
  it('renders a text field named by its accessibility label', async () => {
    await render(<Input accessibilityLabel="Email" />);

    expect(screen.getByLabelText('Email')).toBeOnTheScreen();
  });

  it.each([
    ['sm', 'h-7'],
    ['md', 'h-8'],
    ['lg', 'h-9'],
  ] as const)('matches the Button height at size %s', async (size, height) => {
    await render(<Input accessibilityLabel="Email" size={size} />);

    expect(screen.getByLabelText('Email').parent).toHaveProp(
      'className',
      expect.stringContaining(height),
    );
  });

  it('styles the control with className and the field with classNames.input', async () => {
    await render(
      <Input
        accessibilityLabel="Email"
        className="control-x"
        classNames={{ input: 'input-x' }}
      />,
    );

    const field = screen.getByLabelText('Email');
    expect(field).toHaveProp('className', expect.stringContaining('input-x'));
    expect(field.parent).toHaveProp(
      'className',
      expect.stringContaining('control-x'),
    );
  });

  it('stops editing when disabled', async () => {
    await render(<Input accessibilityLabel="Email" disabled />);

    expect(screen.getByLabelText('Email')).toHaveProp('editable', false);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('shows a focus ring while focused and still calls onFocus', async () => {
    const onFocus = jest.fn();
    await render(<Input accessibilityLabel="Email" onFocus={onFocus} />);

    const control = () => screen.getByLabelText('Email').parent;
    expect(control()).not.toHaveProp(
      'className',
      expect.stringContaining('border-ring'),
    );

    await fireEvent(screen.getByLabelText('Email'), 'focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(control()).toHaveProp(
      'className',
      expect.stringContaining('border-ring'),
    );
  });

  it('renders the bare field when unstyled', async () => {
    await render(<Input accessibilityLabel="Search" className="x" unstyled />);

    expect(screen.getByLabelText('Search')).toHaveProp(
      'className',
      expect.stringMatching(/h-8.*x$/),
    );
  });
});
