import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import * as React from 'react';

import { cn } from '@/lib/utils';

type ScrollAreaContentProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Content
>;
type ScrollAreaCornerProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Corner
>;
type ScrollAreaProps = Omit<ScrollAreaRootProps, 'children'> & {
  children?: React.ReactNode;
  contentClassName?: string;
  orientation?: 'both' | 'horizontal' | 'vertical';
  viewportClassName?: string;
};
type ScrollAreaRootProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
>;
type ScrollAreaScrollbarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Scrollbar
>;
type ScrollAreaThumbProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Thumb
>;
type ScrollAreaViewportProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Viewport
>;

function ScrollAreaContent({ className, ...props }: ScrollAreaContentProps) {
  return (
    <ScrollAreaPrimitive.Content
      className={cn('min-w-full', className)}
      data-slot="scroll-area-content"
      {...props}
    />
  );
}

function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return (
    <ScrollAreaPrimitive.Corner
      className={cn('absolute right-0 bottom-0 bg-transparent', className)}
      data-slot="scroll-area-corner"
      {...props}
    />
  );
}

function ScrollAreaFacade({
  children,
  contentClassName,
  orientation = 'vertical',
  viewportClassName,
  ...props
}: ScrollAreaProps) {
  const hasHorizontalScrollbar =
    orientation === 'horizontal' || orientation === 'both';
  const hasVerticalScrollbar =
    orientation === 'vertical' || orientation === 'both';

  return (
    <ScrollAreaRoot {...props}>
      <ScrollAreaViewport className={viewportClassName}>
        <ScrollAreaContent className={contentClassName}>
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      {hasVerticalScrollbar ? <ScrollAreaScrollbar /> : null}
      {hasHorizontalScrollbar ? (
        <ScrollAreaScrollbar orientation="horizontal" />
      ) : null}
      {orientation === 'both' ? <ScrollAreaCorner /> : null}
    </ScrollAreaRoot>
  );
}

function ScrollAreaRoot({ className, ...props }: ScrollAreaRootProps) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative', className)}
      data-slot="scroll-area"
      {...props}
    />
  );
}

function ScrollAreaScrollbar({
  children,
  className,
  orientation = 'vertical',
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        'pointer-events-none absolute flex touch-none p-0.5 opacity-0 transition-opacity duration-150 select-none data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100',
        orientation === 'vertical' && 'inset-y-0 right-0 w-2.5 justify-center',
        orientation === 'horizontal' && 'inset-x-0 bottom-0 h-2.5 items-center',
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      {children ?? <ScrollAreaThumb />}
    </ScrollAreaPrimitive.Scrollbar>
  );
}

function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <ScrollAreaPrimitive.Thumb
      className={cn(
        'bg-border relative rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-(--scroll-area-thumb-width) data-[orientation=vertical]:h-(--scroll-area-thumb-height) data-[orientation=vertical]:w-1.5',
        className,
      )}
      data-slot="scroll-area-thumb"
      {...props}
    />
  );
}

function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn('size-full rounded-[inherit] outline-none', className)}
      data-slot="scroll-area-viewport"
      {...props}
    />
  );
}

const ScrollArea = Object.assign(ScrollAreaFacade, {
  Content: ScrollAreaContent,
  Corner: ScrollAreaCorner,
  Root: ScrollAreaRoot,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Viewport: ScrollAreaViewport,
});

export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
export type {
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaProps,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
};
