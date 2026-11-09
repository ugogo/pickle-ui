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

  describe('separator', () => {
    const separators = (container: HTMLElement) =>
      container.querySelectorAll('[data-slot="separator"]');

    it('renders no separator by default', () => {
      const { container } = render(
        <XStack>
          <span>A</span>
          <span>B</span>
        </XStack>,
      );

      expect(separators(container)).toHaveLength(0);
    });

    it('renders a separator between each two children', () => {
      const { container } = render(
        <XStack separator>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </XStack>,
      );

      const stack = container.firstElementChild!;
      expect(
        [...stack.children].map(
          (child) => child.getAttribute('data-slot') ?? child.textContent,
        ),
      ).toEqual(['A', 'separator', 'B', 'separator', 'C']);
    });

    it('renders no separator around a single child', () => {
      const { container } = render(
        <XStack separator>
          <span>A</span>
        </XStack>,
      );

      expect(separators(container)).toHaveLength(0);
    });

    it('skips falsy children', () => {
      const { container } = render(
        <XStack separator>
          {null}
          <span>A</span>
          {false}
          {undefined}
          <span>B</span>
          {null}
        </XStack>,
      );

      expect(separators(container)).toHaveLength(1);
    });

    it('hides the separators from assistive technology', () => {
      render(
        <XStack role="list" separator>
          <span role="listitem">A</span>
          <span role="listitem">B</span>
        </XStack>,
      );

      expect(screen.queryAllByRole('separator')).toHaveLength(0);
      expect(
        screen.getAllByRole('separator', { hidden: true })[0],
      ).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByRole('list').children).toHaveLength(3);
    });

    it('renders vertical separators', () => {
      const { container } = render(
        <XStack separator>
          <span>A</span>
          <span>B</span>
        </XStack>,
      );

      expect(separators(container)[0]).toHaveAttribute(
        'data-orientation',
        'vertical',
      );
    });
  });
});
