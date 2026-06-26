import * as React from 'react';

import { cn } from '@/lib/utils';

type SidebarContentProps = React.ComponentProps<'div'>;
type SidebarFooterProps = React.ComponentProps<'div'>;
type SidebarGroupLabelProps = React.ComponentProps<'div'>;
type SidebarGroupProps = React.ComponentProps<'div'>;
type SidebarHeaderProps = React.ComponentProps<'div'>;
type SidebarMenuItemProps = React.ComponentProps<'li'>;
type SidebarMenuLinkProps = React.ComponentProps<'a'>;
type SidebarMenuListProps = React.ComponentProps<'ul'>;
type SidebarMenuProps = React.ComponentProps<'nav'>;
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
    <nav
      className={cn('flex flex-col gap-1', className)}
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      className={cn('w-full', className)}
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

function SidebarMenuLink({
  children,
  className,
  ...props
}: SidebarMenuLinkProps) {
  return (
    <a
      className={cn(
        'focus-ring text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current=page]:bg-sidebar-primary aria-[current=page]:text-sidebar-primary-foreground flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-sm font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      data-slot="sidebar-menu-link"
      {...props}
    >
      {children}
    </a>
  );
}

function SidebarMenuList({ className, ...props }: SidebarMenuListProps) {
  return (
    <ul
      className={cn('flex list-none flex-col gap-1 p-0', className)}
      data-slot="sidebar-menu-list"
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
  MenuLink: SidebarMenuLink,
  MenuList: SidebarMenuList,
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
  SidebarMenuLink,
  SidebarMenuList,
};
export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarMenuItemProps,
  SidebarMenuLinkProps,
  SidebarMenuListProps,
  SidebarMenuProps,
  SidebarProps,
};
