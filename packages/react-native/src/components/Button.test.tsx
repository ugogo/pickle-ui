import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';

describe('Button', () => {
  it('renders a button named by its label', async () => {
    await render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeOnTheScreen();
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Save</Button>);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Button disabled onPress={onPress}>
        Save
      </Button>,
    );

    await fireEvent.press(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });
});
