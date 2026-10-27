import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <Avatar.Fallback>MC</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByText('MC')).toBeInTheDocument();
  });

  it('uses the default avatar dimensions', () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback>MC</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId('avatar')).toHaveClass('size-8');
  });
});
