import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';
import { Group } from './Group';

describe('Group', () => {
  it('renders grouped controls with separators', () => {
    render(
      <Group aria-label="Actions">
        <Button>One</Button>
        <Group.Separator />
        <Button>Two</Button>
      </Group>,
    );

    expect(screen.getByRole('group', { name: 'Actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument();
  });

  it('defaults to horizontal orientation', () => {
    render(
      <Group aria-label="Actions">
        <Button>One</Button>
      </Group>,
    );

    expect(screen.getByRole('group', { name: 'Actions' })).toHaveAttribute(
      'data-orientation',
      'horizontal',
    );
  });

  it('supports vertical orientation', () => {
    render(
      <Group
        aria-label="Zoom controls"
        data-testid="group"
        orientation="vertical"
      >
        <Button aria-label="Zoom in" size="icon" variant="outline">
          +
        </Button>
        <Group.Separator orientation="horizontal" />
        <Button aria-label="Zoom out" size="icon" variant="outline">
          -
        </Button>
      </Group>,
    );

    expect(screen.getByTestId('group')).toHaveAttribute(
      'data-orientation',
      'vertical',
    );
  });
});
