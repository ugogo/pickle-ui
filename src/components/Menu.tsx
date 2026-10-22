import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import {
  IconCheck,
  IconChevronRight,
  IconCircleFilled,
} from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Text, type TextProps } from './Text';

type MenuCheckboxItemProps = React.ComponentProps<
  typeof MenuPrimitive.CheckboxItem
>;
type MenuContentProps = Pick<
  React.ComponentProps<typeof MenuPrimitive.Positioner>,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
> &
  React.ComponentProps<typeof MenuPrimitive.Popup>;
type MenuGroupLabelProps = React.ComponentProps<
  typeof MenuPrimitive.GroupLabel
>;
type MenuGroupProps = React.ComponentProps<typeof MenuPrimitive.Group>;
type MenuItemProps = React.ComponentProps<typeof MenuPrimitive.Item> &
  VariantProps<typeof menuItemVariants>;
type MenuProps = React.ComponentProps<typeof MenuPrimitive.Root>;
type MenuRadioGroupProps = React.ComponentProps<
  typeof MenuPrimitive.RadioGroup
>;
type MenuRadioItemProps = React.ComponentProps<typeof MenuPrimitive.RadioItem>;
type MenuSeparatorProps = React.ComponentProps<typeof MenuPrimitive.Separator>;
type MenuShortcutProps = Omit<TextProps, 'as'>;
type MenuSubContentProps = MenuContentProps;
type MenuSubProps = React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>;
type MenuSubTriggerProps = React.ComponentProps<
  typeof MenuPrimitive.SubmenuTrigger
>;
type MenuTriggerProps = React.ComponentProps<typeof MenuPrimitive.Trigger>;

const menuPopupClassName =
  'border-border bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-lg duration-100 outline-none';

const menuItemBaseClassName =
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const menuItemVariants = cva(menuItemBaseClassName, {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: "[&_svg:not([class*='text-'])]:text-muted-foreground",
      destructive:
        'text-destructive data-highlighted:bg-destructive/10 data-highlighted:text-destructive dark:data-highlighted:bg-destructive/20 [&_svg]:text-destructive',
    },
  },
});

function MenuCheckboxItem({
  children,
  className,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      className={cn(menuItemBaseClassName, 'pr-8', className)}
      data-slot="menu-checkbox-item"
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"
        data-slot="menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <IconCheck />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function MenuContent({
  align = 'start',
  alignOffset = 0,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: MenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(menuPopupClassName, className)}
          data-slot="menu-content"
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function MenuGroup({ ...props }: MenuGroupProps) {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
}

function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      data-slot="menu-group-label"
      {...props}
    />
  );
}

function MenuItem({ className, variant, ...props }: MenuItemProps) {
  return (
    <MenuPrimitive.Item
      className={cn(menuItemVariants({ variant }), className)}
      data-slot="menu-item"
      data-variant={variant ?? 'default'}
      {...props}
    />
  );
}

function MenuRadioGroup({ ...props }: MenuRadioGroupProps) {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

function MenuRadioItem({ children, className, ...props }: MenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(menuItemBaseClassName, 'pr-8', className)}
      data-slot="menu-radio-item"
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"
        data-slot="menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <IconCircleFilled className="size-2" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function MenuRoot({ ...props }: MenuProps) {
  return <MenuPrimitive.Root {...props} />;
}

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      className={cn('bg-border/50 -mx-1 my-1 h-px', className)}
      data-slot="menu-separator"
      {...props}
    />
  );
}

function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <Text
      as="span"
      className={cn('ml-auto text-xs tracking-widest', className)}
      data-slot="menu-shortcut"
      tone="muted"
      {...props}
    />
  );
}

function MenuSub({ ...props }: MenuSubProps) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

function MenuSubContent({
  align = 'start',
  alignOffset = -5,
  className,
  side = 'right',
  sideOffset = 0,
  ...props
}: MenuSubContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(menuPopupClassName, className)}
          data-slot="menu-sub-content"
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function MenuSubTrigger({
  children,
  className,
  ...props
}: MenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(
        menuItemBaseClassName,
        "data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
        className,
      )}
      data-slot="menu-sub-trigger"
      {...props}
    >
      {children}
      <IconChevronRight className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function MenuTrigger({ ...props }: MenuTriggerProps) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

const Menu = Object.assign(MenuRoot, {
  CheckboxItem: MenuCheckboxItem,
  Content: MenuContent,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Item: MenuItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  Trigger: MenuTrigger,
});

export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
};
export type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemProps,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSubContentProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
};
