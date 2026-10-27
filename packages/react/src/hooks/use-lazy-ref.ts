import * as React from 'react';

function useLazyRef<T>(fn: () => T) {
  const ref = React.useRef<null | T>(null);

  if (ref.current === null) {
    ref.current = fn();
  }

  return ref as React.RefObject<T>;
}

export { useLazyRef };
