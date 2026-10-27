import { render, screen } from '@testing-library/react-native';

import { Card } from './Card';

describe('Card', () => {
  it('renders its compound parts', async () => {
    await render(
      <Card testID="card">
        <Card.Header>
          <Card.Title>Projects</Card.Title>
          <Card.Description>Everything in flight</Card.Description>
        </Card.Header>
        <Card.Content testID="content" />
      </Card>,
    );

    expect(screen.getByTestId('card')).toContainElement(
      screen.getByText('Projects'),
    );
    expect(screen.getByText('Everything in flight')).toBeOnTheScreen();
    expect(screen.getByTestId('content')).toBeOnTheScreen();
  });
});
