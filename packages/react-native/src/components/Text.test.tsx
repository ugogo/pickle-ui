import { render, screen } from '@testing-library/react-native';

import { Text } from './Text';

describe('Text', () => {
  it('renders its children', async () => {
    await render(
      <Text tone="muted" variant="h1">
        Hello
      </Text>,
    );

    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });
});
