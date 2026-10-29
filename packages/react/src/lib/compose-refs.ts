import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

// Radix UI's compose-refs (MIT): callback refs and ref objects merged into one
// callback ref, with React 19 ref cleanups.

function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === 'function') {
        hasCleanup = true;
      }
      return cleanup;
    });

    // Only return a cleanup when a ref returned one: React 18 logs an error
    // for a callback ref that returns a value.
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === 'function') {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    return ref(value);
  }

  if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo -- memoized by every ref: the spread `refs` is the dependency list
  return React.useCallback(composeRefs(...refs), refs); // react-doctor-disable-line react-doctor/exhaustive-deps -- memoized by every ref: the spread `refs` is the dependency list
}

export { composeRefs, useComposedRefs };
