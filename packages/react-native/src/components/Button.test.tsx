import { fireEvent, render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

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

  it('renders icons next to the label', async () => {
    await render(
      <Button>
        <View testID="icon" />
        Add project
      </Button>,
    );

    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('icon'),
    );
    expect(screen.getByText('Add project')).toBeOnTheScreen();
  });

  it('names an icon-only button with accessibilityLabel', async () => {
    await render(
      <Button accessibilityLabel="Add project" size="icon">
        <View />
      </Button>,
    );

    expect(
      screen.getByRole('button', { name: 'Add project' }),
    ).toBeOnTheScreen();
  });

  it('is busy and disabled while loading', async () => {
    const onPress = jest.fn();
    await render(
      <Button loading onPress={onPress}>
        Save
      </Button>,
    );

    await fireEvent.press(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeBusy();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('stretches small sizes to a 44pt touch target', async () => {
    await render(
      <>
        <Button size="sm">Small</Button>
        <Button hitSlop={0} size="xs">
          Extra small
        </Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Small' })).toHaveProp(
      'hitSlop',
      6,
    );
    expect(screen.getByRole('button', { name: 'Extra small' })).toHaveProp(
      'hitSlop',
      0,
    );
  });
});
