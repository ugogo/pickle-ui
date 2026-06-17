'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SelectContentProps = Pick<
  React.ComponentProps<typeof SelectPrimitive.Positioner>,
  'align' | 'side' | 'sideOffset'
> &
  React.ComponentProps<typeof SelectPrimitive.Popup> & {
    position?: 'item-aligned' | 'popper';
  };
type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;
type SelectItemData = {
  label: React.ReactNode;
  value: unknown;
};
type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item> & {
  label: React.ReactNode;
};
type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.GroupLabel>;
type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;
type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;
type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  size?: 'default' | 'sm';
};

type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

function collectSelectItems(
  children: React.ReactNode,
): SelectItemData[] | undefined {
  const items: SelectItemData[] = [];

  function walk(nodes: React.ReactNode) {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (child.type === SelectItem) {
        const { label, value } = child.props as SelectItemProps;

        if (label != null) {
          items.push({ label, value });
        }

        return;
      }

      const childProps = child.props as { children?: React.ReactNode };

      if (childProps.children != null) {
        walk(childProps.children);
      }
    });
  }

  walk(children);

  return items.length > 0 ? items : undefined;
}

function SelectContent({
  align = 'center',
  children,
  className,
  position = 'item-aligned',
  side = 'bottom',
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={position === 'item-aligned'}
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            'border-border bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-lg duration-100',
            position === 'popper' &&
              'min-w-(--anchor-width) data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className,
          )}
          data-align-trigger={position === 'item-aligned'}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List data-slot="select-list">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      className={cn('scroll-my-1 p-1', className)}
      data-slot="select-group"
      {...props}
    />
  );
}

function SelectItem({ className, label, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      data-slot="select-item"
      label={typeof label === 'string' ? label : undefined}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconCheck className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn('text-muted-foreground px-3 py-2.5 text-xs', className)}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectRoot({ children, items, ...props }: SelectProps) {
  const derivedItems = React.useMemo(
    () => collectSelectItems(children),
    [children],
  );

  return (
    <SelectPrimitive.Root items={items ?? derivedItems} {...props}>
      {children}
    </SelectPrimitive.Root>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <IconChevronDown />
    </SelectPrimitive.ScrollDownArrow>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <IconChevronUp />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        'bg-border/50 pointer-events-none -mx-1 my-1 h-px',
        className,
      )}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectTrigger({
  children,
  className,
  size = 'default',
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "border-input bg-background aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground focus-ring flex w-fit items-center justify-between gap-1.5 rounded-md border px-2.5 py-1 text-sm whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-8 data-[size=sm]:h-7 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-size={size}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <IconSelector className="text-muted-foreground pointer-events-none size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const Select = Object.assign(SelectRoot, {
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
  Value: SelectValue,
});

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
};
