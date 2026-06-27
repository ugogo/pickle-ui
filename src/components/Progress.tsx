import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const progressTrackVariants = cva(
  'bg-muted w-full overflow-hidden rounded-full',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        lg: 'h-3',
        md: 'h-2',
        sm: 'h-1.5',
      },
    },
  },
);

type ProgressIndicatorProps = React.ComponentProps<
  typeof ProgressPrimitive.Indicator
> & {
  indicatorClassName?: string;
};

type ProgressLabelProps = React.ComponentProps<typeof ProgressPrimitive.Label>;
type ProgressRootProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  size?: NonNullable<VariantProps<typeof progressTrackVariants>['size']>;
};

type ProgressTrackProps = React.ComponentProps<typeof ProgressPrimitive.Track> &
  VariantProps<typeof progressTrackVariants>;

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

function ProgressRoot({
  children,
  className,
  size = 'md',
  ...props
}: ProgressRootProps) {
  return (
    <ProgressPrimitive.Root
      className={cn('grid w-full gap-2', className)}
      data-slot="progress"
      {...props}
    >
      {children ?? (
        <ProgressTrack size={size}>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({
  children,
  className,
  size = 'md',
  ...props
}: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      className={cn(progressTrackVariants({ size }), className)}
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
  progressTrackVariants,
  ProgressValue,
};
export type {
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressRootProps,
  ProgressTrackProps,
  ProgressValueProps,
};
