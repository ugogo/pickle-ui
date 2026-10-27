import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label', async () => {
    await render(<Badge variant="success">Shipped</Badge>);

    expect(screen.getByText('Shipped')).toBeOnTheScreen();
  });

  it('renders icons next to the label', async () => {
    await render(
      <Badge size="lg" testID="badge" variant="warning">
        <View testID="icon" />
        Pending
      </Badge>,
    );

    expect(screen.getByTestId('badge')).toContainElement(
      screen.getByTestId('icon'),
    );
    expect(screen.getByText('Pending')).toBeOnTheScreen();
  });
});
