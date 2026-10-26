import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Toast } from './Toast';

function Trigger() {
  const toast = Toast.useToast();

  return (
    <button
      onClick={() =>
        toast.add({
          actionProps: { children: 'Undo' },
          description: 'From the hook',
          title: 'Hook toast',
          type: 'info',
        })
      }
      type="button"
    >
      Notify
    </button>
  );
}

describe('Toast', () => {
  afterEach(() => {
    act(() => Toast.manager.close());
  });

  it('shows toasts added through the global manager and closes them', async () => {
    render(<Toast.Provider />);

    act(() => {
      Toast.manager.add({
        description: 'Your changes are live.',
        title: 'Saved',
        type: 'success',
      });
    });

    const title = await screen.findByText('Saved');

    expect(title).toHaveAttribute('data-slot', 'toast-title');
    expect(title).toHaveClass('text-sm');
    expect(title).not.toHaveClass('text-body');
    expect(screen.getByText('Your changes are live.')).toHaveClass('text-sm');
    expect(title.closest('[data-slot="toast"]')).toHaveAttribute(
      'data-type',
      'success',
    );

    // Base UI hides the close button from assistive tech until the stack is
    // expanded or focused, so look it up by its label.
    fireEvent.click(screen.getByLabelText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    });
  });

  it('adds toasts with an action through Toast.useToast', async () => {
    render(
      <Toast.Provider position="top-center">
        <Trigger />
      </Toast.Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));

    expect(await screen.findByText('Hook toast')).toBeInTheDocument();
    expect(screen.getByText('Undo')).toHaveAttribute(
      'data-slot',
      'toast-action',
    );
    expect(
      document.querySelector('[data-slot="toast-viewport"]'),
    ).toHaveAttribute('data-position', 'top-center');
  });

  it('names the close button with closeLabel', async () => {
    render(<Toast.Provider closeLabel="Fermer" />);

    act(() => {
      Toast.manager.add({ title: 'Enregistré' });
    });

    await screen.findByText('Enregistré');
    expect(screen.getByLabelText('Fermer')).toBeInTheDocument();
  });
});
