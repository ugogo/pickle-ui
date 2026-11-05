import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { Drawer, type DrawerContentProps, type DrawerProps } from './Drawer';

async function finishAnimations() {
  await act(async () => {
    jest.runAllTimers();
  });
}

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

// The first native-driver animation on a mounted view loads React Native's
// renderer and DOM modules, a slow transform on a cold CI cache. Open a drawer
// once here, under its own timeout, so no test's timeout pays for it.
beforeAll(async () => {
  await renderDrawer({ defaultOpen: true });
  screen.unmount();
}, 30_000);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Drawer', () => {
  it('opens from the trigger', async () => {
    await renderDrawer();

    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Open cart' }));

    expect(screen.getByRole('header', { name: 'Cart' })).toBeOnTheScreen();
    expect(screen.getByText('Review your items.')).toBeOnTheScreen();
    expect(screen.getByText('Two items')).toBeOnTheScreen();
  });

  it('closes from Drawer.Close once the sheet has slid away', async () => {
    const onOpenChange = jest.fn();
    await renderDrawer({ defaultOpen: true, onOpenChange });

    await fireEvent.press(
      screen.getByRole('button', { name: 'Keep shopping' }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
    await finishAnimations();
    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('closes from the built-in close button', async () => {
    await renderDrawer({ defaultOpen: true });

    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    await finishAnimations();

    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });

  it('names the close button with closeLabel', async () => {
    await renderDrawer({
      contentProps: { closeLabel: 'Fermer' },
      defaultOpen: true,
    });

    expect(screen.getByRole('button', { name: 'Fermer' })).toBeOnTheScreen();
  });

  it('omits the close button when showCloseButton is false', async () => {
    await renderDrawer({
      contentProps: { showCloseButton: false },
      defaultOpen: true,
    });

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeOnTheScreen();
  });

  it('pads a nested footer past the home indicator', async () => {
    await render(
      <SafeAreaInsetsContext.Provider
        value={{ bottom: 34, left: 0, right: 0, top: 47 }}
      >
        <Drawer defaultOpen>
          <Drawer.Content variant="attached">
            {/* A Form puts the footer below a wrapper, not under the content. */}
            <View>
              <Drawer.Footer testID="footer">
                <Drawer.Close>Done</Drawer.Close>
              </Drawer.Footer>
            </View>
          </Drawer.Content>
        </Drawer>
      </SafeAreaInsetsContext.Provider>,
    );

    expect(screen.getByTestId('footer')).toHaveStyle({ paddingBottom: 50 });
  });

  it.each(['inset', 'attached', 'straight'] as const)(
    'renders the %s variant',
    async (variant) => {
      await renderDrawer({ contentProps: { variant }, defaultOpen: true });

      expect(screen.getByRole('header', { name: 'Cart' })).toBeOnTheScreen();
    },
  );

  it('follows the open prop when controlled', async () => {
    const onOpenChange = jest.fn();
    await renderDrawer({ onOpenChange, open: false });

    await fireEvent.press(screen.getByRole('button', { name: 'Open cart' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Cart')).not.toBeOnTheScreen();
  });
});
