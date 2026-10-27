import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from './Text';

describe('Text', () => {
  it('renders default body variant as a <p> with body classes', () => {
    render(<Text>Hello world</Text>);
    const el = screen.getByText('Hello world');
    expect(el.tagName.toLowerCase()).toBe('p');
    expect(el).toHaveClass('text-body');
    expect(el).toHaveAttribute('data-slot', 'text');
  });

  it('exposes its variant, tone and weight as data attributes', () => {
    render(
      <>
        <Text>Plain</Text>
        <Text tone="muted" variant="small" weight="bold">
          Styled
        </Text>
      </>,
    );

    const plain = screen.getByText('Plain');
    expect(plain).toHaveAttribute('data-variant', 'body');
    expect(plain).not.toHaveAttribute('data-tone');
    expect(plain).not.toHaveAttribute('data-weight');

    const styled = screen.getByText('Styled');
    expect(styled).toHaveAttribute('data-variant', 'small');
    expect(styled).toHaveAttribute('data-tone', 'muted');
    expect(styled).toHaveAttribute('data-weight', 'bold');
  });

  it('keeps the body size next to a tone color', () => {
    render(<Text tone="muted">Muted body size</Text>);
    const el = screen.getByText('Muted body size');
    expect(el).toHaveClass('text-body');
    expect(el).toHaveClass('text-muted-foreground');
  });

  it('lets a className font size replace the body size', () => {
    render(<Text className="text-lg">Larger body</Text>);
    const el = screen.getByText('Larger body');
    expect(el).toHaveClass('text-lg');
    expect(el).not.toHaveClass('text-body');
  });

  it('renders variant="h2" as an <h2>', () => {
    render(<Text variant="h2">Heading Two</Text>);
    const el = screen.getByText('Heading Two');
    expect(el.tagName.toLowerCase()).toBe('h2');
    expect(el).toHaveClass('text-h2');
    expect(el).toHaveClass('font-semibold');
  });

  it('renders variant="code" as a <code>', () => {
    render(<Text variant="code">npm install pickle-ui</Text>);
    const el = screen.getByText('npm install pickle-ui');
    expect(el.tagName.toLowerCase()).toBe('code');
    expect(el).toHaveClass('font-mono');
  });

  it('overrides the element via the as prop while keeping data-slot and variant classes', () => {
    render(
      <Text as="h1" variant="h2">
        Page title
      </Text>,
    );
    const el = screen.getByText('Page title');
    expect(el.tagName.toLowerCase()).toBe('h1');
    expect(el).toHaveAttribute('data-slot', 'text');
    expect(el).toHaveClass('text-h2');
    expect(el).toHaveClass('font-semibold');
  });

  it('merges className without replacing variant classes', () => {
    render(<Text className="custom-class">Merged classes</Text>);
    const el = screen.getByText('Merged classes');
    expect(el).toHaveClass('text-body');
    expect(el).toHaveClass('custom-class');
  });

  it('tone="muted" adds text-muted-foreground and is orthogonal to variant', () => {
    render(
      <Text tone="muted" variant="body">
        Muted body
      </Text>,
    );
    const muted = screen.getByText('Muted body');
    expect(muted).toHaveClass('text-muted-foreground');

    render(
      <Text tone="muted" variant="h3">
        Muted heading
      </Text>,
    );
    const mutedHeading = screen.getByText('Muted heading');
    expect(mutedHeading).toHaveClass('text-muted-foreground');
    expect(mutedHeading).toHaveClass('text-h3');
    expect(mutedHeading.tagName.toLowerCase()).toBe('h3');
  });
});
