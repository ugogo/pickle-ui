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

  const [controlSize, setControlSize] = React.useState<{
    height?: number;
    width?: number;
  }>({});

  // react-doctor-disable-next-line react-doctor/no-cascading-set-state -- this effect measures the control element and only calls setControlSize in mutually exclusive branches (or inside an async ResizeObserver callback), not as a synchronous render cascade
  React.useLayoutEffect(() => {
    if (!control) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset measured size synchronously when the control is removed so the hidden input does not retain a stale size
      setControlSize({});
      return;
    }

    setControlSize({
      height: control.offsetHeight,
      width: control.offsetWidth,
    });

    if (typeof window === 'undefined') return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;

      const entry = entries[0];
      if (!entry) return;

      let width: number;
      let height: number;

      if ('borderBoxSize' in entry) {
        const borderSizeEntry = entry.borderBoxSize;
        const borderSize = Array.isArray(borderSizeEntry)
          ? borderSizeEntry[0]
          : borderSizeEntry;
        width = borderSize.inlineSize;
        height = borderSize.blockSize;
      } else {
        width = control.offsetWidth;
        height = control.offsetHeight;
      }

      setControlSize({ height, width });
    });

    resizeObserver.observe(control, { box: 'border-box' });
    return () => {
      resizeObserver.disconnect();
    };
  }, [control]);

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
