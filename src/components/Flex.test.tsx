import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flex } from './Flex';

describe('Flex', () => {
  it('renders layout props as Tailwind classes', () => {
    render(
      <Flex
        align="center"
        direction="column"
        gap={4}
        gapX={2}
        gapY={3}
        justify="between"
        wrap="wrap"
      >
        Content
      </Flex>,
    );

    expect(screen.getByText('Content')).toHaveClass(
      'flex',
      'flex-col',
      'flex-wrap',
      'items-center',
      'justify-between',
      'gap-4',
      'gap-x-2',
      'gap-y-3',
    );
  });

  it('supports polymorphism, native props, refs, and class overrides', () => {
    const ref = { current: null };
    render(
      <Flex
        aria-label="navigation"
        as="nav"
        className="custom-class flex-row"
        direction="column"
        ref={ref}
      />,
    );

    const element = screen.getByLabelText('navigation');
    expect(element.tagName.toLowerCase()).toBe('nav');
    expect(element).toHaveAttribute('data-slot', 'flex');
    expect(element).toHaveClass('flex-row', 'custom-class');
    expect(element).not.toHaveClass('flex-col');
    expect(ref.current).toBe(element);
  });
});
