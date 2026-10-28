import { View } from 'react-native';

import { cn } from '../../lib/cn';

export type InputFrameProps = React.ComponentProps<typeof View> & {
  disabled?: boolean;
  focused: boolean;
  invalid?: boolean;
};

/**
 * The border, background and focus ring the web's `Input`, `Textarea` and
 * `InputGroup` draw around their field. React Native has no `ring`, so a
 * 3pt outline sits outside the border while the field has focus.
 */
export function InputFrame({
  children,
  className,
  disabled,
  focused,
  invalid,
  ...props
}: InputFrameProps) {
  return (
    <View
      className={cn(
        'border-input bg-background dark:bg-input/32 w-full flex-row rounded-lg border shadow-xs shadow-black/5',
        invalid && 'border-destructive/36',
        focused && (invalid ? 'border-destructive/64' : 'border-ring'),
        (disabled || focused || invalid) && 'shadow-none',
        disabled && 'opacity-64',
        className,
      )}
      {...props}
    >
      {children}
      {focused ? (
        <View
          className={cn(
            'absolute -inset-1 rounded-[calc(var(--radius)+3px)] border-[3px]',
            invalid
              ? 'border-destructive/16 dark:border-destructive/24'
              : 'border-ring/24',
          )}
          pointerEvents="none"
        />
      ) : null}
    </View>
  );
}
