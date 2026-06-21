import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { XStack } from './XStack';

describe('XStack', () => {
  it('renders a row stack with shared Flex props', () => {
    render(
      <XStack align="center" gap={2} justify="between">
        Content
      </XStack>,
    );

    expect(screen.getByText('Content')).toHaveClass(
      'flex',
      'flex-row',
      'items-center',
      'justify-between',
      'gap-2',
    );
    expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'x-stack');
  });

  it('supports polymorphism, native props, and responsive overrides', () => {
    render(
      <XStack aria-label="actions" as="nav" className="max-md:flex-col" />,
    );

    const element = screen.getByLabelText('actions');
    expect(element.tagName.toLowerCase()).toBe('nav');
    expect(element).toHaveClass('max-md:flex-col');
  });
});
