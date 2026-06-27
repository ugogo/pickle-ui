import * as React from 'react';

import { useComposedRefs } from '@/lib/compose-refs';
import { cn } from '@/lib/utils';

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
};

function Slot({ children, className, ref, style, ...props }: SlotProps) {
  const child = React.isValidElement(children) ? children : undefined;
  const childProps = (child?.props ?? {}) as {
    className?: string;
    ref?: React.Ref<HTMLElement>;
    style?: React.CSSProperties;
  };
  const composedRef = useComposedRefs(ref, childProps.ref);

  if (!child) {
    return null;
  }

  return React.cloneElement(
    child as React.ReactElement<Record<string, unknown>>,
    {
      ...props,
      ...(child.props as React.HTMLAttributes<HTMLElement>),
      className: cn(className, childProps.className),
      ref: composedRef,
      style: {
        ...style,
        ...childProps.style,
      },
    },
  );
}

export { Slot };
export type { SlotProps };
