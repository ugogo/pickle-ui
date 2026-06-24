import * as React from 'react';

import { cn } from '@/lib/utils';

type SidebarContentProps = React.ComponentProps<'div'>;
type SidebarFooterProps = React.ComponentProps<'div'>;
type SidebarGroupLabelProps = React.ComponentProps<'div'>;
type SidebarGroupProps = React.ComponentProps<'div'>;
type SidebarHeaderProps = React.ComponentProps<'div'>;
type SidebarMenuItemProps = React.ComponentProps<'div'>;
type SidebarMenuProps = React.ComponentProps<'div'>;
type SidebarProps = React.ComponentProps<'aside'>;

function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn('min-h-0 flex-1 overflow-auto px-3 py-4', className)}
      data-slot="sidebar-content"
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn('border-sidebar-border border-t p-4', className)}
      data-slot="sidebar-footer"
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      data-slot="sidebar-group"
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div
      className={cn(
        'text-sidebar-foreground/70 px-2 py-1 text-xs font-medium tracking-wide uppercase',
        className,
      )}
      data-slot="sidebar-group-label"
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn('border-sidebar-border border-b px-5 py-4', className)}
      data-slot="sidebar-header"
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <div
      className={cn('w-full', className)}
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

function SidebarRoot({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        'border-sidebar-border bg-sidebar text-sidebar-foreground flex w-64 shrink-0 flex-col border-r',
        className,
      )}
      data-slot="sidebar"
      {...props}
    />
  );
}

const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
});

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
};
export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarProps,
};
