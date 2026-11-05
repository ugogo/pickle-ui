import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Drawer, type DrawerContentProps } from './Drawer';

async function openDrawer() {
  fireEvent.click(screen.getByRole('button', { name: 'Open cart' }));
  return screen.findByRole('dialog', { name: 'Cart' });
}

function renderDrawer(contentProps?: DrawerContentProps) {
  return render(
    <Drawer>
      <Drawer.Trigger>Open cart</Drawer.Trigger>
      <Drawer.Content {...contentProps}>
        <Drawer.Header>
          <Drawer.Title>Cart</Drawer.Title>
          <Drawer.Description>Review your items.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Panel>Two items</Drawer.Panel>
        <Drawer.Footer>
          <Drawer.Close>Keep shopping</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>,
  );
}

describe('Drawer', () => {
  it('opens from the trigger with an accessible name and description', async () => {
    renderDrawer();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const drawer = await openDrawer();

    expect(drawer).toHaveAccessibleDescription('Review your items.');
    expect(drawer).toHaveAttribute('data-slot', 'drawer-content');
    expect(drawer).toHaveAttribute('data-size', 'md');
    expect(drawer).toHaveAttribute('data-variant', 'inset');
    expect(screen.getByRole('heading', { name: 'Cart' })).toHaveAttribute(
      'data-slot',
      'drawer-title',
    );
    expect(document.querySelector('[data-slot=drawer-backdrop]')).toBeTruthy();
  });

  it('slides in from the right', async () => {
    renderDrawer();

    expect(await openDrawer()).toHaveAttribute('data-swipe-direction', 'right');
  });

  it('renders the variant it is given', async () => {
    renderDrawer({ variant: 'attached' });

    expect(await openDrawer()).toHaveAttribute('data-variant', 'attached');
  });

  it('renders the panel and footer inside the drawer', async () => {
    renderDrawer();

    const drawer = await openDrawer();

    expect(within(drawer).getByText('Two items')).toHaveAttribute(
      'data-slot',
      'drawer-panel',
    );
    expect(
      drawer.querySelector('[data-slot=drawer-footer]'),
    ).toBeInTheDocument();
  });

  it('closes from the close button when showCloseButton is set', async () => {
    renderDrawer({ showCloseButton: true });

    const drawer = await openDrawer();
    fireEvent.click(within(drawer).getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('closes from Drawer.Close', async () => {
    renderDrawer();

    const drawer = await openDrawer();
    fireEvent.click(
      within(drawer).getByRole('button', { name: 'Keep shopping' }),
    );

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('names the close button with closeLabel', async () => {
    renderDrawer({ closeLabel: 'Fermer', showCloseButton: true });

    const drawer = await openDrawer();

    expect(
      within(drawer).getByRole('button', { name: 'Fermer' }),
    ).toBeInTheDocument();
  });

  it('has no close button by default', async () => {
    renderDrawer();

    const drawer = await openDrawer();

    expect(
      within(drawer).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });
});
