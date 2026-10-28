import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  it('places addons by align, whatever their order in the code', async () => {
    await render(
      <InputGroup testID="group">
        <InputGroup.Addon align="inline-end">
          <Text>.dev</Text>
        </InputGroup.Addon>
        <InputGroup.Input accessibilityLabel="Subdomain" />
        <InputGroup.Addon>
          <Text>https://</Text>
        </InputGroup.Addon>
      </InputGroup>,
    );

    const texts = screen
      .getByTestId('group')
      .children.map((child) =>
        typeof child === 'string'
          ? child
          : (child.props.accessibilityLabel ??
            child.children
              .map((c) => (typeof c === 'string' ? c : c.props.children))
              .join('')),
      );
    expect(texts).toEqual(['https://', 'Subdomain', '.dev']);
  });

  it('pads the input on the sides that have an addon', async () => {
    await render(
      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <InputGroup.Input accessibilityLabel="Amount" />
      </InputGroup>,
    );

    expect(screen.getByLabelText('Amount')).toHaveProp(
      'className',
      expect.stringContaining('ps-2'),
    );
    expect(screen.getByLabelText('Amount')).not.toHaveProp(
      'className',
      expect.stringContaining('pe-2'),
    );
  });

  it('frames the group while its input has focus', async () => {
    await render(
      <InputGroup testID="group">
        <InputGroup.Input accessibilityLabel="Search" />
      </InputGroup>,
    );

    await fireEvent(screen.getByLabelText('Search'), 'focus');

    expect(screen.getByTestId('group')).toHaveProp(
      'className',
      expect.stringContaining('border-ring'),
    );
  });

  it('marks the frame from the input’s invalid and disabled props', async () => {
    await render(
      <InputGroup testID="group">
        <InputGroup.Input accessibilityLabel="Email" disabled invalid />
      </InputGroup>,
    );

    expect(screen.getByTestId('group')).toHaveProp(
      'className',
      expect.stringMatching(/border-destructive\/36.*opacity-64/),
    );
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders InputGroup.Button as a ghost button after the input', async () => {
    const onPress = jest.fn();
    await render(
      <InputGroup>
        <InputGroup.Button accessibilityLabel="Clear" onPress={onPress}>
          <Text>×</Text>
        </InputGroup.Button>
        <InputGroup.Input accessibilityLabel="Search" />
      </InputGroup>,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Clear' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
