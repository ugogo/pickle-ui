import { useState } from 'react';
import { TextInput } from 'react-native';

import { cn } from '../../lib/cn';
import { InputFrame } from '../_internal/InputFrame';

// Same heights as `Button` for the same size, so they line up side by side,
// and the web's paddings minus the 1pt border.
const heightClasses = { lg: 'h-9', md: 'h-8', sm: 'h-7' } as const;
const paddingClasses = {
  lg: 'px-[13px]',
  md: 'px-[11px]',
  sm: 'px-[9px]',
} as const;

export type InputProps = React.ComponentProps<typeof TextInput> & {
  /** Class overrides for the inner `TextInput`; `className` styles the control around it. */
  classNames?: { input?: string };
  /** Dims the field and stops editing, like the web's `disabled`. */
  disabled?: boolean;
  /** Marks the value as invalid, like the web's `aria-invalid`. */
  invalid?: boolean;
  size?: 'lg' | 'md' | 'sm';
  /** Renders the bare `TextInput`, without the border and background. */
  unstyled?: boolean;
};

/** A single-line text field, like `Input` in @pickle-ui/react. */
export function Input({
  className,
  classNames,
  disabled = false,
  editable = true,
  invalid = false,
  onBlur,
  onFocus,
  size = 'md',
  unstyled = false,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  // The web's 14px from `sm` up: the 16px it uses on phones only stops iOS
  // Safari zooming into a focused field, which native apps don't do.
  // `text-[14px]` sets the size without `text-sm`'s line height, which
  // pushes a single-line field's text off center on iOS.
  const input = (
    <TextInput
      accessibilityState={{ disabled }}
      className={cn(
        'text-foreground flex-1 font-sans text-[14px] outline-none',
        paddingClasses[size],
        unstyled ? cn(heightClasses[size], disabled && 'opacity-64') : 'h-full',
        unstyled ? className : classNames?.input,
      )}
      editable={editable && !disabled}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      placeholderTextColorClassName="accent-muted-foreground/72"
      {...props}
    />
  );

  if (unstyled) return input;

  return (
    <InputFrame
      className={cn(heightClasses[size], className)}
      disabled={disabled}
      focused={focused}
      invalid={invalid}
    >
      {input}
    </InputFrame>
  );
}
