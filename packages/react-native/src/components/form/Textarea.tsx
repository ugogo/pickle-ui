import { useState } from 'react';
import { TextInput } from 'react-native';

import { cn } from '../../lib/cn';
import { InputFrame } from '../_internal/InputFrame';

const sizeClasses = {
  lg: 'min-h-18 px-[11px]',
  md: 'min-h-17.5 px-[11px]',
  sm: 'min-h-16 px-[9px]',
} as const;

export type TextareaProps = Omit<
  React.ComponentProps<typeof TextInput>,
  'multiline'
> & {
  /** Class overrides for the inner `TextInput`; `className` styles the control around it. */
  classNames?: { textarea?: string };
  /** Dims the field and stops editing, like the web's `disabled`. */
  disabled?: boolean;
  /** Marks the value as invalid, like the web's `aria-invalid`. */
  invalid?: boolean;
  size?: 'lg' | 'md' | 'sm';
};

/**
 * A multi-line text field that grows with its content from three lines, like
 * `Textarea` in @pickle-ui/react. Set a `min-h-*` class on
 * `classNames.textarea` to change the minimum.
 */
export function Textarea({
  className,
  classNames,
  disabled = false,
  editable = true,
  invalid = false,
  onBlur,
  onFocus,
  size = 'md',
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <InputFrame
      className={className}
      disabled={disabled}
      focused={focused}
      invalid={invalid}
    >
      <TextInput
        accessibilityState={{ disabled }}
        className={cn(
          'text-foreground web:field-sizing-content web:resize-none flex-1 py-2 text-sm outline-none',
          sizeClasses[size],
          classNames?.textarea,
        )}
        editable={editable && !disabled}
        multiline
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        placeholderTextColorClassName="accent-muted-foreground/72"
        textAlignVertical="top"
        {...props}
      />
    </InputFrame>
  );
}
