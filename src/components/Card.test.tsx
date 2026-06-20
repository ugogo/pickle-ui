import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('exposes its semantic compound slots', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Account</Card.Title>
          <Card.Description>Manage your profile.</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    expect(
      screen.getByRole('heading', { name: 'Account' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Manage your profile.')).toBeInTheDocument();
  });
});
