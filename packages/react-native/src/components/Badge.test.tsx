import { render, screen } from '@testing-library/react-native';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label', async () => {
    await render(<Badge variant="success">Shipped</Badge>);

    expect(screen.getByText('Shipped')).toBeOnTheScreen();
  });
});
