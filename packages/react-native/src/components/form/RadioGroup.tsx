import { createContext, use, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { cn } from '../../lib/cn';
import { useControllableState } from '../_internal/useControllableState';

// Same sizes as `RadioGroup` in @pickle-ui/react. `hitSlop` stretches the
// circle to a 44pt touch target, vertically only when a label widens it.
const controlClasses = { md: 'size-4', sm: 'size-3.5' } as const;
const indicatorClasses = { md: 'size-2', sm: 'size-1.5' } as const;
const controlHitSlop = { md: 14, sm: 15 } as const;
const fieldHitSlop = {
  md: { bottom: 14, top: 14 },
  sm: { bottom: 15, top: 15 },
} as const;

type RadioGroupContextValue = {
  disabled: boolean;
  onSelect: (value: string) => void;
  value: string | undefined;
};

const RadioGroupContext = createContext<null | RadioGroupContextValue>(null);

export type RadioGroupItemProps = Omit<
  React.ComponentProps<typeof Pressable>,
  'children' | 'disabled'
> & {
  /** Class overrides for the row around the circle and label, the dot and the label. */
  classNames?: { field?: string; indicator?: string; label?: string };
  disabled?: boolean;
  /** Marks the choice as invalid, like the web's `aria-invalid`. */
  invalid?: boolean;
  /** Text next to the circle; pressing it selects the item and names it. */
  label?: React.ReactNode;
  size?: 'md' | 'sm';
  value: string;
};

export type RadioGroupProps = React.ComponentProps<typeof View> & {
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
};

function RadioGroupItem({
  accessibilityState,
  className,
  classNames,
  disabled: disabledProp = false,
  invalid = false,
  label,
  size = 'md',
  value,
  ...props
}: RadioGroupItemProps) {
  const group = use(RadioGroupContext);
  if (!group) throw new Error('RadioGroup.Item must be inside a RadioGroup.');

  const checked = group.value === value;
  const disabled = group.disabled || disabledProp;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ ...accessibilityState, checked, disabled }}
      className={
        label
          ? cn('flex-row items-center gap-2', classNames?.field)
          : 'self-start'
      }
      disabled={disabled}
      hitSlop={label ? fieldHitSlop[size] : controlHitSlop[size]}
      onPress={() => group.onSelect(value)}
      {...props}
    >
      <View
        className={cn(
          'border-input bg-background items-center justify-center rounded-full border',
          controlClasses[size],
          checked && 'border-primary',
          invalid && 'border-destructive',
          disabled && 'opacity-50',
          className,
        )}
      >
        {checked ? (
          <View
            className={cn(
              'bg-primary rounded-full',
              indicatorClasses[size],
              classNames?.indicator,
            )}
          />
        ) : null}
      </View>
      {label ? (
        <Text
          className={cn(
            'text-sm leading-none font-medium',
            disabled ? 'text-muted-foreground' : 'text-foreground',
            classNames?.label,
          )}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

function RadioGroupRoot({
  className,
  defaultValue,
  disabled = false,
  onValueChange,
  value: valueProp,
  ...props
}: RadioGroupProps) {
  const [value, setValue] = useControllableState(
    valueProp,
    defaultValue,
    onValueChange as ((value: string | undefined) => void) | undefined,
  );

  const context = useMemo(
    () => ({
      disabled,
      onSelect: (next: string) => {
        if (next !== value) setValue(next);
      },
      value,
    }),
    [disabled, setValue, value],
  );

  return (
    <RadioGroupContext value={context}>
      <View
        accessibilityRole="radiogroup"
        className={cn('gap-2', className)}
        {...props}
      />
    </RadioGroupContext>
  );
}

const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});

export { RadioGroup, RadioGroupItem };
