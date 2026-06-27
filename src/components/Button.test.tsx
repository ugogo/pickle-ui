import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders its children and defaults to type="button"', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('does not collapse text and icon content to an icon-only button', () => {
    render(
      <Button>
        View report <svg aria-hidden="true" />
      </Button>,
    );

    expect(
      screen.getByRole('button', { name: 'View report' }),
    ).not.toHaveAttribute('data-icon-only');
  });

  it('marks a lone icon button for square sizing', () => {
    render(
      <Button aria-label="Options">
        <svg aria-hidden="true" />
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Options' })).toHaveAttribute(
      'data-icon-only',
    );
  });

  it('merges button styles onto a child element with asChild', () => {
    render(
      <Button asChild variant="outline">
        <a href="/docs">Documentation</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link.className).toContain('border');
  });
});
