import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Sheet, type SheetContentProps } from './Sheet';

function mockViewport({ wide }: { wide: boolean }) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      addEventListener: vi.fn(),
      matches: wide,
      media: query,
      removeEventListener: vi.fn(),
    })),
  );
}

async function openSheet() {
  fireEvent.click(screen.getByRole('button', { name: 'Open cart' }));
  return screen.findByRole('dialog', { name: 'Cart' });
}

function renderSheet(contentProps?: SheetContentProps) {
  return render(
    <Sheet>
      <Sheet.Trigger>Open cart</Sheet.Trigger>
      <Sheet.Content {...contentProps}>
        <Sheet.Header>
          <Sheet.Title>Cart</Sheet.Title>
          <Sheet.Description>Review your items.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close>Keep shopping</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Sheet', () => {
  it('opens from the trigger with an accessible name and description', async () => {
    renderSheet();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const sheet = await openSheet();

    expect(sheet).toHaveAccessibleDescription('Review your items.');
    expect(sheet).toHaveAttribute('data-slot', 'sheet-content');
    expect(sheet).toHaveAttribute('data-size', 'md');
    expect(screen.getByRole('heading', { name: 'Cart' })).toHaveAttribute(
      'data-slot',
      'sheet-title',
    );
    expect(document.querySelector('[data-slot=sheet-backdrop]')).toBeTruthy();
  });

  it('swipes down to dismiss on narrow screens', async () => {
    mockViewport({ wide: false });
    renderSheet();

    expect(await openSheet()).toHaveAttribute('data-swipe-direction', 'down');
    expect(document.querySelector('[data-slot=sheet-handle]')).toBeTruthy();
  });

  it('swipes right to dismiss from the sm breakpoint up', async () => {
    mockViewport({ wide: true });
    renderSheet();

    expect(await openSheet()).toHaveAttribute('data-swipe-direction', 'right');
  });

  it('closes from the built-in close button', async () => {
    renderSheet();

    const sheet = await openSheet();
    fireEvent.click(within(sheet).getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('closes from Sheet.Close', async () => {
    renderSheet();

    const sheet = await openSheet();
    fireEvent.click(
      within(sheet).getByRole('button', { name: 'Keep shopping' }),
    );

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('names the close button with closeLabel', async () => {
    renderSheet({ closeLabel: 'Fermer' });

    const sheet = await openSheet();

    expect(
      within(sheet).getByRole('button', { name: 'Fermer' }),
    ).toBeInTheDocument();
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderSheet({ showCloseButton: false });

    const sheet = await openSheet();

    expect(
      within(sheet).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });
});
