import * as React from 'react';

import { useAsRef } from '@/hooks/use-as-ref';

/**
 * Calls `handler` when a click starts and ends outside the element in `ref`.
 * A press that starts inside and ends outside (e.g. a text selection drag) is
 * not an outside click.
 */
function useOnClickOutside<T extends Element>(
  ref: React.RefObject<null | T>,
  handler: (event: MouseEvent) => void,
  enabled = true,
) {
  const handlerRef = useAsRef(handler);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    let pressStartedOutside = false;

    const isOutside = (target: EventTarget | null) =>
      ref.current !== null &&
      target instanceof Node &&
      !ref.current.contains(target);

    const onPointerDown = (event: PointerEvent) => {
      pressStartedOutside = isOutside(event.target);
    };

    const onClick = (event: MouseEvent) => {
      if (pressStartedOutside && isOutside(event.target)) {
        handlerRef.current(event);
      }
      pressStartedOutside = false;
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('click', onClick, true);
    };
  }, [enabled, handlerRef, ref]);
}

export { useOnClickOutside };
