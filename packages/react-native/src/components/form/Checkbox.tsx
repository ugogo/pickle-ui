import { Pressable, Text, View } from 'react-native';

import { cn } from '../../lib/cn';
import { useControllableState } from '../_internal/useControllableState';

// Same box sizes as `Checkbox` in @pickle-ui/react. `hitSlop` stretches the
// box to a 44pt touch target, vertically only when a label already widens it.
const boxClasses = { md: 'size-4.5', sm: 'size-3.5' } as const;
const boxHitSlop = { md: 13, sm: 15 } as const;
const fieldHitSlop = {
  md: { bottom: 13, top: 13 },
  sm: { bottom: 15, top: 15 },
} as const;

// The web draws Tabler's check and minus icons. Without SVG, the check is the
// bottom and right borders of a rotated box, and the minus a bar.
const checkClasses = {
  md: 'h-[9px] w-[5px] border-b-[1.5px] border-r-[1.5px]',
  sm: 'h-[7px] w-[4px] border-b-[1.25px] border-r-[1.25px]',
} as const;
const minusClasses = { md: 'h-[1.5px] w-2', sm: 'h-[1.25px] w-1.5' } as const;

export type CheckboxProps = Omit<
  React.ComponentProps<typeof Pressable>,
  'children' | 'disabled'
> & {
  checked?: boolean;
  /** Class overrides for the row around the box and label, the check and the label. */
  classNames?: { field?: string; indicator?: string; label?: string };
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Shows a minus instead of the check, for a partly selected group. */
  indeterminate?: boolean;
  /** Marks the value as invalid, like the web's `aria-invalid`. */
  invalid?: boolean;
  /** Text next to the box; pressing it toggles the checkbox and names it. */
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'md' | 'sm';
};

/**
 * A checkbox, like `Checkbox` in @pickle-ui/react. Give it a `label`, or an
 * `accessibilityLabel` when visible text elsewhere names it.
 */
export function Checkbox({
  accessibilityState,
  checked: checkedProp,
  className,
  classNames,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  invalid = false,
  label,
  onCheckedChange,
  size = 'md',
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useControllableState(
    checkedProp,
    defaultChecked,
    onCheckedChange,
  );
  return (
    // `role` and `aria-*` are React Native's current accessibility props;
    // `accessibilityState` keeps any extra state the caller passes.
    <Pressable
      accessibilityState={{
        ...accessibilityState,
        checked: indeterminate ? 'mixed' : checked,
        disabled,
      }}
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled}
      className={
        label
          ? cn('flex-row items-center gap-2', classNames?.field)
          : 'self-start'
      }
      disabled={disabled}
      hitSlop={label ? fieldHitSlop[size] : boxHitSlop[size]}
      onPress={() => setChecked(!checked)}
      role="checkbox"
      {...props}
    >
      <CheckboxBox
        checked={checked}
        className={className}
        disabled={disabled}
        indeterminate={indeterminate}
        indicatorClassName={classNames?.indicator}
        invalid={invalid}
        size={size}
      />
      {label ? (
        <Text
          className={cn(
            'text-foreground font-sans text-sm leading-none font-medium',
            disabled && 'opacity-50',
            classNames?.label,
          )}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

function CheckboxBox({
  checked,
  className,
  disabled,
  indeterminate,
  indicatorClassName,
  invalid,
  size,
}: {
  checked: boolean;
  className?: string;
  disabled: boolean;
  indeterminate: boolean;
  indicatorClassName?: string;
  invalid: boolean;
  size: 'md' | 'sm';
}) {
  const filled = checked && !indeterminate;

  return (
    <View
      className={cn(
        'items-center justify-center rounded-[4px] border shadow-xs shadow-black/5',
        boxClasses[size],
        // A checked box is filled in both themes, so the dark input
        // background must not apply to it.
        filled
          ? 'border-primary bg-primary'
          : cn(
              'border-input bg-background dark:bg-input/32',
              invalid && 'border-destructive/36',
            ),
        (checked || indeterminate || invalid || disabled) && 'shadow-none',
        disabled && 'opacity-64',
        className,
      )}
    >
      {indeterminate ? (
        <View
          className={cn(
            'bg-foreground rounded-full',
            minusClasses[size],
            indicatorClassName,
          )}
        />
      ) : checked ? (
        <View
          className={cn(
            'border-primary-foreground -mt-px rotate-45',
            checkClasses[size],
            indicatorClassName,
          )}
        />
      ) : null}
    </View>
  );
}
