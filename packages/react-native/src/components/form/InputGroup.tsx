import {
  Children,
  createContext,
  isValidElement,
  type ReactNode,
  use,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, Text, type TextInput, View } from 'react-native';

import { cn } from '../../lib/cn';
import { InputFrame } from '../_internal/InputFrame';
import { Button, type ButtonProps } from '../Button';
import { Input, type InputProps } from './Input';
import { InputGroupStateContext } from './InputGroup.context';

type InputGroupAlign =
  | 'block-end'
  | 'block-start'
  | 'inline-end'
  | 'inline-start';

type TextInputInstance = React.ComponentRef<typeof TextInput>;

// The web's addon paddings minus the 1pt border. Addons holding a button sit
// closer to the edge, like the web's `has-[>button]` margins.
const addonClasses = {
  'block-end': 'w-full justify-start px-[11px] pb-[11px]',
  'block-start': 'w-full justify-start px-[11px] pt-[11px]',
  'inline-end': 'pe-[11px]',
  'inline-start': 'ps-[11px]',
} as const;
const buttonAddonClasses = {
  'block-end': '',
  'block-start': '',
  'inline-end': 'pe-[3px]',
  'inline-start': 'ps-[3px]',
} as const;

type InputGroupContextValue = {
  focusInput: () => void;
  hasInlineEnd: boolean;
  hasInlineStart: boolean;
  setFocused: (focused: boolean) => void;
  setInput: (input: null | TextInputInstance) => void;
};

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export type InputGroupAddonProps = React.ComponentProps<typeof Pressable> & {
  align?: InputGroupAlign;
  /** Text is wrapped in a label; other children, such as icons, render as they are. */
  children?: ReactNode;
};

export type InputGroupButtonProps = ButtonProps & { align?: InputGroupAlign };

export type InputGroupInputProps = Omit<InputProps, 'unstyled'>;

export type InputGroupProps = React.ComponentProps<typeof View>;

export type InputGroupTextProps = React.ComponentProps<typeof Text>;

/** Pressing an addon focuses the field, like clicking it on the web. */
function InputGroupAddon({
  align = 'inline-start',
  children,
  className,
  ...props
}: InputGroupAddonProps) {
  const group = useInputGroup('Addon');

  return (
    <Pressable
      accessible={false}
      className={cn(
        'flex-row items-center justify-center gap-2',
        addonClasses[align],
        className,
      )}
      onPress={group.focusInput}
      {...props}
    >
      {Children.map(children, (child) =>
        typeof child === 'string' || typeof child === 'number' ? (
          <Text className="text-foreground font-sans text-[14px]">{child}</Text>
        ) : (
          child
        ),
      )}
    </Pressable>
  );
}

function InputGroupButton({
  align = 'inline-end',
  className,
  size = 'icon-xs',
  variant = 'ghost',
  ...props
}: InputGroupButtonProps) {
  return (
    <InputGroupAddon align={align} className={buttonAddonClasses[align]}>
      <Button className={className} size={size} variant={variant} {...props} />
    </InputGroupAddon>
  );
}

function InputGroupInput({
  className,
  onBlur,
  onFocus,
  ref,
  ...props
}: InputGroupInputProps) {
  const group = useInputGroup('Input');
  const inputRef = useRef<null | TextInputInstance>(null);
  useImperativeHandle(ref, () => inputRef.current as TextInputInstance);

  return (
    <Input
      className={cn(
        group.hasInlineStart && 'ps-2',
        group.hasInlineEnd && 'pe-2',
        className,
      )}
      onBlur={(event) => {
        group.setFocused(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        group.setFocused(true);
        onFocus?.(event);
      }}
      ref={(node: null | TextInputInstance) => {
        inputRef.current = node;
        // The group focuses the input when an addon is pressed.
        group.setInput(node);
      }}
      unstyled
      {...props}
    />
  );
}

/** Places addons around the input and frames the group like an `Input`. */
function InputGroupRoot({ children, className, ...props }: InputGroupProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<null | TextInputInstance>(null);
  const state = use(InputGroupStateContext);
  const sorted = sortChildren(children);
  const { parts } = sorted;
  const disabled = sorted.disabled || Boolean(state?.disabled);
  const invalid = sorted.invalid || Boolean(state?.invalid);
  const hasInlineEnd = parts['inline-end'].length > 0;
  const hasInlineStart = parts['inline-start'].length > 0;
  const context = useMemo(
    () => ({
      focusInput: () => inputRef.current?.focus(),
      hasInlineEnd,
      hasInlineStart,
      setFocused,
      setInput: (input: null | TextInputInstance) => {
        inputRef.current = input;
      },
    }),
    [hasInlineEnd, hasInlineStart],
  );
  const hasBlock =
    parts['block-start'].length > 0 || parts['block-end'].length > 0;
  const row = [
    ...parts['inline-start'],
    ...parts.field,
    ...parts['inline-end'],
  ];

  return (
    <InputGroupContext value={context}>
      <InputFrame
        className={cn(hasBlock ? 'flex-col' : 'h-8 items-center', className)}
        disabled={disabled}
        focused={focused}
        invalid={invalid}
        role="group"
        {...props}
      >
        {hasBlock ? (
          <>
            {parts['block-start']}
            <View className="flex-row items-center">{row}</View>
            {parts['block-end']}
          </>
        ) : (
          row
        )}
      </InputFrame>
    </InputGroupContext>
  );
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <Text
      className={cn('text-muted-foreground font-sans text-[14px]', className)}
      numberOfLines={1}
      {...props}
    />
  );
}

/**
 * Splits the group's direct children by `align`, since React Native has no
 * CSS `order`, and reads `disabled` and `invalid` from its inputs.
 */
function sortChildren(children: ReactNode) {
  const parts: Record<'field' | InputGroupAlign, ReactNode[]> = {
    'block-end': [],
    'block-start': [],
    field: [],
    'inline-end': [],
    'inline-start': [],
  };
  let disabled = false;
  let invalid = false;

  for (const child of Children.toArray(children)) {
    if (
      isValidElement<{ align?: InputGroupAlign }>(child) &&
      (child.type === InputGroupAddon || child.type === InputGroupButton)
    ) {
      const fallback =
        child.type === InputGroupButton ? 'inline-end' : 'inline-start';
      parts[child.props.align ?? fallback].push(child);
    } else {
      if (
        isValidElement<InputGroupInputProps>(child) &&
        child.type === InputGroupInput
      ) {
        disabled ||= Boolean(child.props.disabled);
        invalid ||= Boolean(child.props.invalid);
      }
      parts.field.push(child);
    }
  }

  return { disabled, invalid, parts };
}

function useInputGroup(part: string) {
  const group = use(InputGroupContext);
  if (!group)
    throw new Error(`InputGroup.${part} must be inside an InputGroup.`);
  return group;
}

const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Input: InputGroupInput,
  Text: InputGroupText,
});

export { InputGroup };
