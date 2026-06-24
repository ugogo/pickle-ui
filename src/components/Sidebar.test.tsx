import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders header and footer slots', () => {
    render(
      <Sidebar>
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.Content>Content</Sidebar.Content>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(
      screen.getByText('Header').closest('[data-slot="sidebar"]'),
    ).toBeTruthy();
  });
});
