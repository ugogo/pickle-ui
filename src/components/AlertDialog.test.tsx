import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AlertDialog, type AlertDialogProps } from './AlertDialog';

type RenderProps = Pick<AlertDialogProps, 'disablePointerDismissal'>;

async function openAlertDialog(props: RenderProps = {}) {
  const onOpenChange = vi.fn();
  renderAlertDialog({ ...props, onOpenChange });
  fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

  const dialog = await screen.findByRole('alertdialog');
  // The viewport covers the backdrop, so it receives clicks around the popup.
  const viewport = dialog.closest('[role=presentation]')!;
  onOpenChange.mockClear();

  return { dialog, onOpenChange, viewport };
}

/** Presses on `down` and releases on `up`, like a real mouse click or drag. */
function press(down: Element, up: Element = down) {
  fireEvent.pointerDown(down, { button: 0, pointerType: 'mouse' });
  fireEvent.mouseDown(down, { button: 0 });
  fireEvent.pointerUp(up, { button: 0, pointerType: 'mouse' });
  fireEvent.mouseUp(up, { button: 0 });
  // A drag fires `click` on the closest element containing both ends.
  fireEvent.click(down.contains(up) ? down : up, { button: 0 });
}

function renderAlertDialog(props: AlertDialogProps = {}) {
  return render(
    <AlertDialog {...props}>
      <AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete project?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close>Cancel</AlertDialog.Close>
          <AlertDialog.Close>Delete</AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>,
  );
}

describe('AlertDialog', () => {
  it('opens an alertdialog with an accessible name and description', async () => {
    renderAlertDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog', {
      name: 'Delete project?',
    });

    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.');
    expect(dialog).toHaveAttribute('data-slot', 'alert-dialog-content');
    expect(
      document.querySelector('[data-slot=alert-dialog-backdrop]'),
    ).toBeTruthy();
  });

  it('has no built-in close icon', async () => {
    renderAlertDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');

    expect(
      within(dialog).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  it('closes from AlertDialog.Close', async () => {
    renderAlertDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));

    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(),
    );
  });

  it('closes on backdrop click by default', async () => {
    const { dialog, onOpenChange, viewport } = await openAlertDialog();

    expect(dialog).toHaveAttribute('role', 'alertdialog');

    await act(async () => press(viewport));

    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      false,
      expect.objectContaining({ reason: 'outside-press' }),
    );
    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(),
    );
  });

  it('stays open on backdrop click with disablePointerDismissal', async () => {
    const { dialog, onOpenChange, viewport } = await openAlertDialog({
      disablePointerDismissal: true,
    });

    expect(dialog).toHaveAttribute('role', 'alertdialog');

    await act(async () => press(viewport));

    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('stays open when a press starts outside the popup and ends in it', async () => {
    const { dialog, onOpenChange, viewport } = await openAlertDialog();

    await act(async () => press(viewport, dialog));

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('stays open when a press starts in the popup and ends outside it', async () => {
    const { dialog, onOpenChange, viewport } = await openAlertDialog();

    await act(async () => press(dialog, viewport));

    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
