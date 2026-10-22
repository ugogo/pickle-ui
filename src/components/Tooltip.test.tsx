import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders the content when open', () => {
    render(
      <Tooltip.Provider>
        <Tooltip defaultOpen>
          <Tooltip.Trigger>Save</Tooltip.Trigger>
          <Tooltip.Content>Save changes</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'data-slot',
      'tooltip-trigger',
    );
    expect(screen.getByText('Save changes')).toHaveAttribute(
      'data-slot',
      'tooltip-content',
    );
  });

  it('does not render the content while closed', () => {
    render(
      <Tooltip>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Content>Save changes</Tooltip.Content>
      </Tooltip>,
    );

    expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
  });

  it('places the content on the requested side', () => {
    render(
      <Tooltip open>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Content side="bottom">Save changes</Tooltip.Content>
      </Tooltip>,
    );

    expect(screen.getByText('Save changes')).toHaveAttribute(
      'data-side',
      'bottom',
    );
  });
});
