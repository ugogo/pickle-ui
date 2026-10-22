'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { IconCheck, IconPlus, IconSelector, IconX } from '@tabler/icons-react';
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
type ComboboxCreateGroup = {
  [CREATE_ITEM]: true;
  items: [ComboboxCreateItem];
  value: string;
};
type ComboboxCreateItem = {
  [CREATE_ITEM]: true;
  label: string;
  value: string;
};
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
> = ComboboxPrimitive.Root.Props<Value, Multiple> & {
  /**
   * Content of the option offered when the typed text matches no item.
   * @default (inputValue) => `Create "${inputValue}"`
   */
  createLabel?: (inputValue: string) => React.ReactNode;
  /**
   * Called when the user picks the create option. Return the new item to
   * select it; add it to `items` so it stays in the list. Requires `items`.
   */
  onCreate?: (inputValue: string) => undefined | Value;
};
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

const CREATE_ITEM = Symbol('pickle-ui.combobox.create');
// Stable fallback so an unset multiple value keeps the same identity.
const EMPTY_VALUE: never[] = [];

const ComboboxCreateLabelContext =
  React.createContext<(inputValue: string) => React.ReactNode>(
    defaultCreateLabel,
  );

const comboboxItemClassName =
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

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

function ComboboxCreatableRoot<
  Value,
  Multiple extends boolean | undefined = false,
>({
  createLabel = defaultCreateLabel,
  defaultValue,
  filter,
  inputValue: inputValueProp,
  isItemEqualToValue,
  items,
  itemToStringLabel,
  itemToStringValue,
  onCreate,
  onInputValueChange,
  onValueChange,
  value: valueProp,
  ...props
}: ComboboxProps<Value, Multiple> & {
  onCreate: (inputValue: string) => undefined | Value;
}) {
  type RootProps = ComboboxPrimitive.Root.Props<Value, Multiple>;

  const [uncontrolledInputValue, setUncontrolledInputValue] = React.useState(
    String(props.defaultInputValue ?? ''),
  );
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const query = String(inputValueProp ?? uncontrolledInputValue).trim();
  const value =
    valueProp !== undefined
      ? valueProp
      : (uncontrolledValue ?? (props.multiple ? EMPTY_VALUE : null));

  const itemsWithCreate = React.useMemo(() => {
    if (!items || !query || hasItemLabel(items, query, itemToStringLabel)) {
      return items;
    }

    const createItem: ComboboxCreateItem = {
      [CREATE_ITEM]: true,
      label: query,
      value: `${CREATE_ITEM.description}:${query}`,
    };

    if (isGroupedItems(items)) {
      const createGroup: ComboboxCreateGroup = {
        [CREATE_ITEM]: true,
        items: [createItem],
        value: CREATE_ITEM.description ?? '',
      };

      return [...items, createGroup];
    }

    return [...items, createItem];
  }, [items, itemToStringLabel, query]);

  const resolveCreated = (item: unknown): unknown[] => {
    if (!isCreateItem(item)) {
      return [item];
    }

    const created = onCreate(item.label);

    return created === undefined ? [] : [created];
  };

  const handleValueChange: RootProps['onValueChange'] = (
    nextValue,
    eventDetails,
  ) => {
    let resolvedValue: unknown = nextValue;

    if (Array.isArray(nextValue)) {
      resolvedValue = nextValue.flatMap(resolveCreated);
    } else if (isCreateItem(nextValue)) {
      const [created] = resolveCreated(nextValue);

      if (created === undefined) {
        return;
      }

      resolvedValue = created;
    }

    const typedValue = resolvedValue as Parameters<
      NonNullable<RootProps['onValueChange']>
    >[0];

    setUncontrolledValue(typedValue as RootProps['defaultValue']);
    onValueChange?.(typedValue, eventDetails);
  };

  return (
    <ComboboxCreateLabelContext.Provider value={createLabel}>
      <ComboboxPrimitive.Root
        {...props}
        filter={
          filter &&
          ((item, filterQuery, toLabel) =>
            isCreateItem(item) || filter(item, filterQuery, toLabel))
        }
        inputValue={inputValueProp}
        isItemEqualToValue={
          isItemEqualToValue &&
          ((item, selected) =>
            isCreateItem(item) || isCreateItem(selected)
              ? Object.is(item, selected)
              : isItemEqualToValue(item, selected))
        }
        items={itemsWithCreate}
        itemToStringLabel={
          itemToStringLabel &&
          ((item) =>
            isCreateItem(item) ? item.label : itemToStringLabel(item))
        }
        itemToStringValue={
          itemToStringValue &&
          ((item) =>
            isCreateItem(item) ? item.value : itemToStringValue(item))
        }
        onInputValueChange={(nextInputValue, eventDetails) => {
          setUncontrolledInputValue(nextInputValue);
          onInputValueChange?.(nextInputValue, eventDetails);
        }}
        onValueChange={handleValueChange}
        value={value as RootProps['value']}
      />
    </ComboboxCreateLabelContext.Provider>
  );
}

function ComboboxCreateOption({ item }: { item: ComboboxCreateItem }) {
  const createLabel = React.useContext(ComboboxCreateLabelContext);

  return (
    <ComboboxPrimitive.Item
      className={comboboxItemClassName}
      data-slot="combobox-create"
      value={item}
    >
      <IconPlus className="text-muted-foreground" />
      {createLabel(item.label)}
    </ComboboxPrimitive.Item>
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
      className={cn(comboboxItemClassName, className)}
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

function ComboboxList({ children, className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        'max-h-[min(var(--available-height),23rem)] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:hidden',
        className,
      )}
      data-slot="combobox-list"
      {...props}
    >
      {typeof children === 'function'
        ? (item: unknown, index: number) =>
            isCreateGroup(item) ? (
              <ComboboxPrimitive.Group items={item.items} key={item.value}>
                {index > 0 ? <ComboboxSeparator /> : null}
                <ComboboxPrimitive.Collection>
                  {(createItem: ComboboxCreateItem) => (
                    <ComboboxCreateOption
                      item={createItem}
                      key={createItem.value}
                    />
                  )}
                </ComboboxPrimitive.Collection>
              </ComboboxPrimitive.Group>
            ) : isCreateItem(item) ? (
              <ComboboxCreateOption item={item} key={item.value} />
            ) : (
              children(item, index)
            )
        : children}
    </ComboboxPrimitive.List>
  );
}

function ComboboxRoot<Value, Multiple extends boolean | undefined = false>({
  createLabel,
  onCreate,
  ...props
}: ComboboxProps<Value, Multiple>) {
  if (!onCreate) {
    return <ComboboxPrimitive.Root {...props} />;
  }

  return (
    <ComboboxCreatableRoot
      createLabel={createLabel}
      onCreate={onCreate}
      {...props}
    />
  );
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

function defaultCreateLabel(inputValue: string) {
  return `Create "${inputValue}"`;
}

// Mirrors Base UI's label resolution so the create option only appears when
// the typed text matches no existing item.
function getItemLabel(
  item: unknown,
  itemToStringLabel?: (item: never) => string,
): string {
  if (itemToStringLabel && item != null) {
    return itemToStringLabel(item as never) ?? '';
  }

  if (item && typeof item === 'object') {
    if ('label' in item && item.label != null) {
      return String(item.label);
    }

    if ('value' in item) {
      return String(item.value);
    }
  }

  return item == null ? '' : String(item);
}

function hasItemLabel(
  items: readonly unknown[],
  query: string,
  itemToStringLabel?: (item: never) => string,
) {
  const normalizedQuery = query.toLocaleLowerCase();
  const flatItems = isGroupedItems(items)
    ? items.flatMap((group) => group.items)
    : items;

  return flatItems.some(
    (item) =>
      getItemLabel(item, itemToStringLabel).trim().toLocaleLowerCase() ===
      normalizedQuery,
  );
}

function isCreateGroup(item: unknown): item is ComboboxCreateGroup {
  return isCreateMarked(item) && 'items' in item;
}

function isCreateItem(item: unknown): item is ComboboxCreateItem {
  return isCreateMarked(item) && !('items' in item);
}

function isCreateMarked(item: unknown): item is object {
  return typeof item === 'object' && item !== null && CREATE_ITEM in item;
}

function isGroupedItems(
  items: readonly unknown[],
): items is readonly { items: readonly unknown[] }[] {
  const [first] = items;

  return typeof first === 'object' && first !== null && 'items' in first;
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
