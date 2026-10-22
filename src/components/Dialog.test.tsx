import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Dialog } from './Dialog';

function renderDialog(contentProps?: {
  closeLabel?: string;
  showCloseButton?: boolean;
}) {
  return render(
    <Dialog>
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Dialog.Content {...contentProps}>
        <Dialog.Header>
          <Dialog.Title>Profile</Dialog.Title>
          <Dialog.Description>Update your public details.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>,
  );
}

describe('Dialog', () => {
  it('opens from the trigger with an accessible name and description', async () => {
    renderDialog();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));

    const dialog = await screen.findByRole('dialog', { name: 'Profile' });

    expect(dialog).toHaveAccessibleDescription('Update your public details.');
    expect(dialog).toHaveAttribute('data-slot', 'dialog-content');
    expect(screen.getByRole('heading', { name: 'Profile' })).toHaveAttribute(
      'data-slot',
      'dialog-title',
    );
    expect(document.querySelector('[data-slot=dialog-backdrop]')).toBeTruthy();
  });

  it('closes from the built-in close button', async () => {
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));

    const dialog = await screen.findByRole('dialog', { name: 'Profile' });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('closes from Dialog.Close', async () => {
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));

    const dialog = await screen.findByRole('dialog', { name: 'Profile' });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('names the close button with closeLabel', async () => {
    renderDialog({ closeLabel: 'Fermer' });
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));

    const dialog = await screen.findByRole('dialog', { name: 'Profile' });

    expect(
      within(dialog).getByRole('button', { name: 'Fermer' }),
    ).toBeInTheDocument();
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderDialog({ showCloseButton: false });
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));

    const dialog = await screen.findByRole('dialog', { name: 'Profile' });

    expect(
      within(dialog).queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });
});
