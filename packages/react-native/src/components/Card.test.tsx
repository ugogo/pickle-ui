import { render, screen } from '@testing-library/react-native';

import { Button } from './Button';
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
        <Card.Footer testID="footer" />
      </Card>,
    );

    expect(screen.getByTestId('card')).toContainElement(
      screen.getByRole('header', { name: 'Projects' }),
    );
    expect(screen.getByText('Everything in flight')).toBeOnTheScreen();
    expect(screen.getByTestId('content')).toBeOnTheScreen();
    expect(screen.getByTestId('footer')).toBeOnTheScreen();
  });

  it('places Card.Action in the header', async () => {
    await render(
      <Card>
        <Card.Header testID="header">
          <Card.Title>Projects</Card.Title>
          <Card.Action>
            <Button size="sm" variant="outline">
              View all
            </Button>
          </Card.Action>
        </Card.Header>
      </Card>,
    );

    expect(screen.getByTestId('header')).toContainElement(
      screen.getByRole('button', { name: 'View all' }),
    );
    expect(screen.getByText('Projects')).toBeOnTheScreen();
  });
});
