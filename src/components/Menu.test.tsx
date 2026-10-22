import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from './Menu';

describe('Menu', () => {
  it('opens on trigger click and calls item handlers', async () => {
    const onRename = vi.fn();

    render(
      <Menu>
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={onRename}>Rename</Menu.Item>
          <Menu.Item variant="destructive">Delete</Menu.Item>
        </Menu.Content>
      </Menu>,
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(await screen.findByRole('menu')).toHaveAttribute(
      'data-slot',
      'menu-content',
    );
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
      'data-variant',
      'destructive',
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));

    expect(onRename).toHaveBeenCalledTimes(1);
  });

  it('renders checkbox, radio, group and shortcut parts', () => {
    render(
      <Menu defaultOpen>
        <Menu.Trigger>View</Menu.Trigger>
        <Menu.Content>
          <Menu.Group>
            <Menu.GroupLabel>Panels</Menu.GroupLabel>
            <Menu.CheckboxItem defaultChecked>Status bar</Menu.CheckboxItem>
          </Menu.Group>
          <Menu.Separator />
          <Menu.RadioGroup defaultValue="dark">
            <Menu.RadioItem value="light">Light</Menu.RadioItem>
            <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
          </Menu.RadioGroup>
          <Menu.Item>
            Settings
            <Menu.Shortcut>⌘,</Menu.Shortcut>
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    );

    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Status bar' }),
    ).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByText('Panels')).toHaveAttribute(
      'data-slot',
      'menu-group-label',
    );
    expect(screen.getByText('⌘,')).toHaveAttribute(
      'data-slot',
      'menu-shortcut',
    );
  });

  it('opens a submenu from its sub trigger', async () => {
    render(
      <Menu defaultOpen>
        <Menu.Trigger>Share</Menu.Trigger>
        <Menu.Content>
          <Menu.Sub>
            <Menu.SubTrigger>Invite users</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Email</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Content>
      </Menu>,
    );

    const subTrigger = screen.getByRole('menuitem', { name: 'Invite users' });

    expect(subTrigger).toHaveAttribute('data-slot', 'menu-sub-trigger');

    fireEvent.click(subTrigger);

    expect(
      await screen.findByRole('menuitem', { name: 'Email' }),
    ).toBeInTheDocument();
  });
});
