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

  it('shows a loading indicator when loading', () => {
    render(<Button loading>Save</Button>);

    expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
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

  it('applies classNames to the loading indicator slot', () => {
    const { container } = render(
      <Button classNames={{ loadingIndicator: 'spinner-x' }} loading>
        Save
      </Button>,
    );
    expect(
      container.querySelector('[data-slot="button-loading-indicator"]'),
    ).toHaveClass('spinner-x');
  });
});
