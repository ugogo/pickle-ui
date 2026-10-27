import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Grid } from './Grid';

describe('Grid', () => {
  it('renders grid and shared layout props as Tailwind classes', () => {
    render(
      <Grid
        align="start"
        columns={3}
        flow="column-dense"
        gap={4}
        justify="center"
        placeContent="between"
        placeItems="stretch"
        rows={2}
      >
        Content
      </Grid>,
    );

    expect(screen.getByText('Content')).toHaveClass(
      'grid',
      'grid-cols-3',
      'grid-rows-2',
      'grid-flow-col-dense',
      'place-content-between',
      'place-items-stretch',
      'items-start',
      'justify-center',
      'gap-4',
    );
  });

  it('supports polymorphism and forwards native props', () => {
    render(
      <Grid aria-label="results" as="section" className="md:grid-cols-4" />,
    );

    const element = screen.getByLabelText('results');
    expect(element.tagName.toLowerCase()).toBe('section');
    expect(element).toHaveAttribute('data-slot', 'grid');
    expect(element).toHaveClass('md:grid-cols-4');
  });
});
