'use client';

import * as React from 'react';

/* eslint-disable react-hooks/refs -- this component intentionally reads prevValueRef.current during render to track the previous value across renders; the ref holds derived bookkeeping state, not render-affecting data. */

type InputValue = string | string[];

interface VisuallyHiddenInputProps<T = InputValue> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onReset' | 'value'
> {
  bubbles?: boolean;
  checked?: boolean;
  control: HTMLElement | null;
  value?: T;
}

const noSize: { height?: number; width?: number } = {};

// The snapshot is a string so React can compare it by value; an object would be
// a new snapshot on every read and re-render forever.
function useElementSize(element: HTMLElement | null) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!element) return () => {};

      const resizeObserver = new ResizeObserver(onChange);
      resizeObserver.observe(element, { box: 'border-box' });

      return () => {
        resizeObserver.disconnect();
      };
    },
    [element],
  );
  const getSnapshot = () =>
    element ? `${element.offsetWidth}x${element.offsetHeight}` : '';
  const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, () => '');

  return React.useMemo(() => {
    if (!snapshot) return noSize;

    const [width, height] = snapshot.split('x').map(Number);
    return { height, width };
  }, [snapshot]);
}

function VisuallyHiddenInput<T = InputValue>(
  props: VisuallyHiddenInputProps<T>,
) {
  const {
    bubbles = true,
    checked,
    control,
    style,
    type = 'hidden',
    value,
    ...inputProps
    // react-doctor-disable-next-line react-doctor/no-event-handler -- this hidden input intentionally mirrors value/checked into the native control and dispatches a native input/click event from an effect; the side effect is driven by prop changes, not a user event, so it cannot move into an event handler
  } = props;

  const isCheckInput = React.useMemo(
    () => type === 'checkbox' || type === 'radio' || type === 'switch',
    [type],
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  const prevValueRef = React.useRef<{
    previous: boolean | T | undefined;
    value: boolean | T | undefined;
  }>({
    previous: isCheckInput ? checked : value,
    value: isCheckInput ? checked : value,
  });

  const prevValue = React.useMemo(() => {
    const currentValue = isCheckInput ? checked : value;
    if (prevValueRef.current.value !== currentValue) {
      prevValueRef.current.previous = prevValueRef.current.value;
      prevValueRef.current.value = currentValue;
    }
    return prevValueRef.current.previous;
  }, [isCheckInput, value, checked]);

  const controlSize = useElementSize(control);

  React.useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const inputProto = window.HTMLInputElement.prototype;
    const propertyKey = isCheckInput ? 'checked' : 'value';
    const eventType = isCheckInput ? 'click' : 'input';
    const currentValue = isCheckInput ? checked : value;

    const serializedCurrentValue = isCheckInput
      ? checked
      : typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : value;

    const descriptor = Object.getOwnPropertyDescriptor(inputProto, propertyKey);

    const setter = descriptor?.set;

    if (prevValue !== currentValue && setter) {
      const event = new Event(eventType, { bubbles });
      setter.call(input, serializedCurrentValue);
      input.dispatchEvent(event);
    }
  }, [prevValue, value, checked, bubbles, isCheckInput]);

  const composedStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      ...style,
      ...(controlSize.width !== undefined && controlSize.height !== undefined
        ? controlSize
        : {}),
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    };
  }, [style, controlSize]);

  return (
    <input
      type={type}
      {...inputProps}
      aria-hidden={isCheckInput}
      defaultChecked={isCheckInput ? checked : undefined}
      ref={inputRef}
      style={composedStyle}
      tabIndex={-1}
    />
  );
}

export { VisuallyHiddenInput };
