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

  it.each([
    ['xs', 'h-6'],
    ['sm', 'h-7'],
    ['md', 'h-8'],
    ['lg', 'h-9'],
    ['xl', 'h-10'],
  ] as const)('keeps size %s at %s on every screen width', (size, height) => {
    render(<Button size={size}>Save</Button>);
    const classes = [...screen.getByRole('button').classList];

    expect(classes).toContain(height);
    expect(
      classes.filter((name) => /^sm:(h|size|min-[hw])-/.test(name)),
    ).toEqual([]);
  });

  it('shows a loading indicator when loading', () => {
    render(<Button loading>Save</Button>);

    expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders button styles on the element passed to render', () => {
    render(
      <Button
        // react-doctor-disable-next-line react-doctor/anchor-has-content -- Button renders its children inside the anchor
        render={<a href="/docs" />}
        variant="outline"
      >
        Documentation
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link).not.toHaveAttribute('type');
    expect(link.className).toContain('border');
  });

  it('marks a rendered element as disabled without the disabled attribute', () => {
    render(
      <Button
        disabled
        // react-doctor-disable-next-line react-doctor/anchor-has-content -- Button renders its children inside the anchor
        render={<a href="/docs" />}
      >
        Documentation
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');
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
