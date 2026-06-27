import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

type ProgressIndicatorProps = React.ComponentProps<
  typeof ProgressPrimitive.Indicator
> & {
  indicatorClassName?: string;
};

type ProgressLabelProps = React.ComponentProps<typeof ProgressPrimitive.Label>;
type ProgressRootProps = React.ComponentProps<typeof ProgressPrimitive.Root>;
type ProgressTrackProps = React.ComponentProps<typeof ProgressPrimitive.Track>;

type ProgressValueProps = React.ComponentProps<typeof ProgressPrimitive.Value>;

function ProgressIndicator({
  className,
  indicatorClassName,
  ...props
}: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      className={cn(
        'bg-primary h-full rounded-full transition-[width] duration-300',
        className,
        indicatorClassName,
      )}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <ProgressPrimitive.Label
      className={cn('text-sm leading-none font-medium', className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressRoot({ children, className, ...props }: ProgressRootProps) {
  return (
    <ProgressPrimitive.Root
      className={cn('grid w-full gap-2', className)}
      data-slot="progress"
      {...props}
    >
      {children ?? (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ children, className, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        'bg-muted h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      data-slot="progress-track"
      {...props}
    >
      {children ?? <ProgressIndicator />}
    </ProgressPrimitive.Track>
  );
}

function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        'text-muted-foreground text-right text-sm tabular-nums',
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

const Progress = Object.assign(ProgressRoot, {
  Indicator: ProgressIndicator,
  Label: ProgressLabel,
  Track: ProgressTrack,
  Value: ProgressValue,
});

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
};
export type {
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressRootProps,
  ProgressTrackProps,
  ProgressValueProps,
};
