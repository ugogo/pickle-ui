'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { IconCheck, IconSelector, IconX } from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input, type InputProps } from './Input';

type ComboboxChipProps = React.ComponentProps<typeof ComboboxPrimitive.Chip> & {
  removeLabel?: string;
};
type ComboboxChipsInputProps = React.ComponentProps<
  typeof ComboboxPrimitive.Input
>;
type ComboboxChipsProps = React.ComponentProps<typeof ComboboxPrimitive.Chips>;
type ComboboxClearProps = React.ComponentProps<typeof ComboboxPrimitive.Clear>;
type ComboboxCollectionProps = React.ComponentProps<
  typeof ComboboxPrimitive.Collection
>;
type ComboboxContentProps = Pick<
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>,
  'align' | 'anchor' | 'side' | 'sideOffset'
> &
  React.ComponentProps<typeof ComboboxPrimitive.Popup>;
type ComboboxEmptyProps = React.ComponentProps<typeof ComboboxPrimitive.Empty>;
type ComboboxGroupLabelProps = React.ComponentProps<
  typeof ComboboxPrimitive.GroupLabel
>;
type ComboboxGroupProps = React.ComponentProps<typeof ComboboxPrimitive.Group>;
type ComboboxInputProps = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Input>,
  'size'
> &
  Pick<InputProps, 'size'> & {
    showClear?: boolean;
    showTrigger?: boolean;
  };
type ComboboxItemProps = React.ComponentProps<typeof ComboboxPrimitive.Item>;
type ComboboxListProps = React.ComponentProps<typeof ComboboxPrimitive.List>;
type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple>;
type ComboboxSeparatorProps = React.ComponentProps<
  typeof ComboboxPrimitive.Separator
>;
type ComboboxStatusProps = React.ComponentProps<
  typeof ComboboxPrimitive.Status
>;
type ComboboxTriggerProps = React.ComponentProps<
  typeof ComboboxPrimitive.Trigger
>;
type ComboboxValueProps = React.ComponentProps<typeof ComboboxPrimitive.Value>;

const comboboxIconButtonClassName =
  "text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex size-6 shrink-0 cursor-default items-center justify-center rounded-md outline-none focus-visible:ring-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4";

function ComboboxChip({
  children,
  className,
  removeLabel = 'Remove',
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        'bg-accent text-accent-foreground data-highlighted:ring-ring/50 flex h-6 items-center gap-0.5 rounded-md ps-2 text-xs font-medium outline-none data-highlighted:ring-2',
        className,
      )}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ChipRemove
        aria-label={removeLabel}
        className="text-muted-foreground hover:text-foreground inline-flex size-5 cursor-default items-center justify-center rounded-sm [&_svg]:size-3.5"
        data-slot="combobox-chip-remove"
      >
        <IconX />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      className={cn(
        'border-input bg-background text-foreground ring-ring/24 has-focus-visible:border-ring has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 relative flex min-h-8 w-full flex-wrap items-center gap-1 rounded-lg border p-[calc(--spacing(1)-1px)] text-base shadow-xs/5 transition-shadow not-dark:bg-clip-padding has-focus-visible:ring-[3px] has-disabled:opacity-64 sm:text-sm',
        className,
      )}
      data-slot="combobox-chips"
      // Anchor the popup to the whole chips box rather than the inner input.
      render={<ComboboxPrimitive.InputGroup />}
      {...props}
    />
  );
}

function ComboboxChipsInput({ className, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      className={cn(
        'placeholder:text-muted-foreground/72 h-6 min-w-12 flex-1 bg-transparent px-1.5 outline-none',
        className,
      )}
      data-slot="combobox-chips-input"
      {...props}
    />
  );
}

function ComboboxClear({ children, className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      aria-label="Clear"
      className={cn(comboboxIconButtonClassName, className)}
      data-slot="combobox-clear"
      {...props}
    >
      {children ?? <IconX />}
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxCollection(props: ComboboxCollectionProps) {
  return <ComboboxPrimitive.Collection {...props} />;
}

function ComboboxContent({
  align = 'start',
  anchor,
  children,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        anchor={anchor}
        className="z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            'border-border bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative flex max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) flex-col overflow-hidden rounded-md border shadow-lg duration-100',
            className,
          )}
          data-slot="combobox-content"
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        'text-muted-foreground text-center text-sm not-empty:py-6 empty:hidden',
        className,
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      className={cn('scroll-my-1', className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

function ComboboxInput({
  className,
  disabled,
  showClear = false,
  showTrigger = true,
  size = 'md',
  ...props
}: ComboboxInputProps) {
  const hasActions = showClear || showTrigger;

  return (
    <ComboboxPrimitive.InputGroup
      className={cn('relative w-full', className)}
      data-slot="combobox-input-group"
    >
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        disabled={disabled}
        render={
          <Input
            className={cn(
              showClear && showTrigger && '*:data-[slot=input]:pe-14',
              hasActions &&
                !(showClear && showTrigger) &&
                '*:data-[slot=input]:pe-8',
            )}
            nativeInput
            size={size}
          />
        }
        {...props}
      />
      {hasActions ? (
        <div
          className="absolute inset-y-0 end-1 flex items-center gap-0.5"
          data-slot="combobox-actions"
        >
          {showClear ? <ComboboxClear disabled={disabled} /> : null}
          {showTrigger ? <ComboboxTrigger disabled={disabled} /> : null}
        </div>
      ) : null}
    </ComboboxPrimitive.InputGroup>
  );
}

function ComboboxItem({ children, className, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <ComboboxPrimitive.ItemIndicator>
          <IconCheck className="pointer-events-none" />
        </ComboboxPrimitive.ItemIndicator>
      </span>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        'max-h-[min(var(--available-height),23rem)] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:hidden',
        className,
      )}
      data-slot="combobox-list"
      {...props}
    />
  );
}

function ComboboxRoot<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>,
) {
  return <ComboboxPrimitive.Root {...props} />;
}

function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      className={cn(
        'bg-border/50 pointer-events-none -mx-1 my-1 h-px',
        className,
      )}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return (
    <ComboboxPrimitive.Status
      className={cn(
        'text-muted-foreground px-3 py-2 text-sm empty:hidden',
        className,
      )}
      data-slot="combobox-status"
      {...props}
    />
  );
}

function ComboboxTrigger({
  children,
  className,
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      aria-label="Open popup"
      className={cn(comboboxIconButtonClassName, className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children ?? <IconSelector />}
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value {...props} />;
}

const Combobox = Object.assign(ComboboxRoot, {
  Chip: ComboboxChip,
  Chips: ComboboxChips,
  ChipsInput: ComboboxChipsInput,
  Clear: ComboboxClear,
  Collection: ComboboxCollection,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
  Input: ComboboxInput,
  Item: ComboboxItem,
  List: ComboboxList,
  Separator: ComboboxSeparator,
  Status: ComboboxStatus,
  Trigger: ComboboxTrigger,
  Value: ComboboxValue,
});

export { Combobox };
export type {
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxListProps,
  ComboboxProps,
  ComboboxSeparatorProps,
  ComboboxStatusProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
};
