import * as React from 'react';

function useLazyRef<T>(fn: () => T) {
  // `useState` runs its initializer once, so `fn` is never called again and the
  // `{ current }` box stays stable; render itself never writes to a ref.
  const [ref] = React.useState(() => ({ current: fn() }));

  return ref as React.RefObject<T>;
}

export { useLazyRef };
