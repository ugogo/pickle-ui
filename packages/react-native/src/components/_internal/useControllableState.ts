import { useCallback, useState } from 'react';

/**
 * State a component owns unless its parent controls it, like Base UI's
 * `checked` / `defaultChecked` / `onCheckedChange` trios: `value` wins when
 * defined, and every change is reported through `onChange`.
 */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const controlled = value !== undefined;

  const setValue = useCallback(
    (next: T) => {
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  return [controlled ? value : uncontrolled, setValue] as const;
}
