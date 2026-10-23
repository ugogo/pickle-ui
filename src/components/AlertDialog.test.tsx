import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertDialog } from './AlertDialog';

function renderAlertDialog(props: { disablePointerDismissal?: boolean } = {}) {
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

  it('stays open on backdrop click by default', async () => {
    renderAlertDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');
    const viewport = dialog.parentElement!;
    fireEvent.pointerDown(viewport);
    fireEvent.click(viewport);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('closes on backdrop click when disablePointerDismissal is false', async () => {
    renderAlertDialog({ disablePointerDismissal: false });
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');
    const viewport = dialog.parentElement!;
    fireEvent.pointerDown(viewport);
    fireEvent.click(viewport);

    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(),
    );
  });

  it('stays open when a press starts inside the popup', async () => {
    renderAlertDialog({ disablePointerDismissal: false });
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');
    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog.parentElement!);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});
