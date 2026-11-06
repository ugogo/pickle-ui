import { BottomSheet } from '@expo/ui';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Drawer, type DrawerContentProps, type DrawerProps } from './Drawer';

async function renderDrawer({
  contentProps,
  ...props
}: DrawerProps & { contentProps?: DrawerContentProps } = {}) {
  await render(
    <Drawer {...props}>
      <Drawer.Trigger>Open cart</Drawer.Trigger>
      <Drawer.Content {...contentProps}>
        <Drawer.Header>
          <Drawer.Title>Cart</Drawer.Title>
          <Drawer.Description>Review your items.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Panel>
          <Drawer.Description>Two items</Drawer.Description>
        </Drawer.Panel>
        <Drawer.Footer>
          <Drawer.Close>Keep shopping</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>,
  );
}

describe('Drawer', () => {
  it('opens from the trigger', async () => {
    await renderDrawer();

    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Open cart' }));

    expect(screen.getByRole('header', { name: 'Cart' })).toBeOnTheScreen();
    expect(screen.getByText('Review your items.')).toBeOnTheScreen();
    expect(screen.getByText('Two items')).toBeOnTheScreen();
  });

  it('closes from Drawer.Close', async () => {
    const onOpenChange = jest.fn();
    await renderDrawer({ defaultOpen: true, onOpenChange });

    await fireEvent.press(
      screen.getByRole('button', { name: 'Keep shopping' }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('closes when the sheet is dismissed', async () => {
    const onOpenChange = jest.fn();
    await renderDrawer({ defaultOpen: true, onOpenChange });

    await fireEvent(screen.getByTestId('bottom-sheet'), 'accessibilityEscape');

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('has no close button by default', async () => {
    await renderDrawer({ defaultOpen: true });

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeOnTheScreen();
  });

  it('closes from the close button when showCloseButton is set', async () => {
    await renderDrawer({
      contentProps: { showCloseButton: true },
      defaultOpen: true,
    });

    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('names the close button with closeLabel', async () => {
    await renderDrawer({
      contentProps: { closeLabel: 'Fermer', showCloseButton: true },
      defaultOpen: true,
    });

    expect(screen.getByRole('button', { name: 'Fermer' })).toBeOnTheScreen();
  });

  it('follows the open prop when controlled', async () => {
    const onOpenChange = jest.fn();
    await renderDrawer({ onOpenChange, open: false });

    await fireEvent.press(screen.getByRole('button', { name: 'Open cart' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('sizes the sheet to its content by default', async () => {
    await renderDrawer({ defaultOpen: true });

    expect(jest.mocked(BottomSheet).mock.lastCall?.[0]).toMatchObject({
      snapPoints: undefined,
    });
  });

  it('rests the sheet at its snap points, fractions and heights', async () => {
    await renderDrawer({ defaultOpen: true, snapPoints: [0.9, 320] });

    expect(jest.mocked(BottomSheet).mock.lastCall?.[0]).toMatchObject({
      snapPoints: [{ fraction: 0.9 }, { height: 320 }],
    });
  });
});
