import type { CSSProperties, Ref } from 'react';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '@/lib/utils';

type SliderLabelProps = SliderPrimitive.Label.Props & {
  ref?: Ref<HTMLDivElement>;
};

type SliderMarksProps = {
  className?: string;
  labelInterval?: number;
  max?: number;
  min?: number;
  step?: number;
};

type SliderProps = SliderPrimitive.Root.Props & {
  getAriaLabel?: SliderPrimitive.Thumb.Props['getAriaLabel'];
  getAriaValueText?: SliderPrimitive.Thumb.Props['getAriaValueText'];
  /** Render the filled indicator. Set to `false` for sliders with a custom track (e.g. color pickers). Defaults to `true`. */
  indicator?: boolean;
  ref?: Ref<HTMLDivElement>;
  thumbClassName?: string;
  trackClassName?: string;
  trackStyle?: CSSProperties;
};

type SliderValueProps = SliderPrimitive.Value.Props & {
  ref?: Ref<HTMLOutputElement>;
};

function SliderLabel({ className, ref, ...props }: SliderLabelProps) {
  return (
    <SliderPrimitive.Label
      className={cn('text-sm font-medium', className)}
      data-slot="slider-label"
      ref={ref}
      {...props}
    />
  );
}

function SliderMarks({
  className,
  labelInterval = 1,
  max = 100,
  min = 0,
  step = 1,
}: SliderMarksProps) {
  const tickCount = Math.floor((max - min) / step) + 1;
  const ticks = Array.from(
    { length: tickCount },
    (_, index) => min + index * step,
  );

  return (
    <div
      aria-hidden
      className={cn(
        'text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs',
        className,
      )}
      role="presentation"
    >
      {ticks.map((tick, index) => {
        const showLabel = index % labelInterval === 0;

        return (
          <span
            className="flex w-0 flex-col items-center justify-center gap-2"
            key={tick}
          >
            <span
              className={cn(
                'bg-muted-foreground/70 h-1 w-px',
                !showLabel && 'h-0.5',
              )}
            />
            <span className={cn(!showLabel && 'opacity-0')}>{tick}</span>
          </span>
        );
      })}
    </div>
  );
}

function SliderRoot({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  defaultValue,
  getAriaLabel,
  getAriaValueText,
  indicator = true,
  max = 100,
  min = 0,
  ref,
  thumbClassName,
  trackClassName,
  trackStyle,
  value,
  ...props
}: SliderProps) {
  const resolved = value ?? defaultValue;
  const thumbCount = Array.isArray(resolved) ? resolved.length : 1;
  const getThumbAriaLabel =
    getAriaLabel ??
    (typeof ariaLabel === 'string'
      ? (index: number) =>
          thumbCount > 1
            ? `${ariaLabel} ${index === 0 ? 'minimum' : index === thumbCount - 1 ? 'maximum' : index + 1}`
            : ariaLabel
      : undefined);

  return (
    <SliderPrimitive.Root
      aria-labelledby={ariaLabelledBy}
      className={cn('data-[orientation=horizontal]:w-full', className)}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      ref={ref}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className="flex touch-none items-center select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=horizontal]:py-3 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-center data-[orientation=vertical]:px-3"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className={cn(
            'bg-input relative grow rounded-full select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
            trackClassName,
          )}
          data-slot="slider-track"
          style={trackStyle}
        >
          {indicator ? (
            <SliderPrimitive.Indicator
              className="bg-primary rounded-full select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
              data-slot="slider-indicator"
            />
          ) : null}
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderPrimitive.Thumb
              aria-describedby={ariaDescribedBy}
              aria-label={getThumbAriaLabel ? undefined : ariaLabel}
              aria-labelledby={ariaLabelledBy}
              className={cn(
                'border-primary bg-background ring-ring/50 relative block size-4.5 shrink-0 rounded-full border-2 shadow-sm transition-[color,box-shadow,scale] duration-150 ease-out outline-none select-none before:absolute before:-inset-3 before:content-[""] hover:ring-5 active:scale-[0.96] has-[input:focus-visible]:ring-5 data-disabled:pointer-events-none data-dragging:ring-5',
                thumbClassName,
              )}
              data-slot="slider-thumb"
              getAriaLabel={getThumbAriaLabel}
              getAriaValueText={getAriaValueText}
              index={index}
              key={String(index)}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function SliderValue({ className, ref, ...props }: SliderValueProps) {
  return (
    <SliderPrimitive.Value
      className={cn('text-foreground text-sm tabular-nums', className)}
      data-slot="slider-value"
      ref={ref}
      {...props}
    />
  );
}

const Slider = Object.assign(SliderRoot, {
  Label: SliderLabel,
  Marks: SliderMarks,
  Value: SliderValue,
});

export { Slider, SliderPrimitive };
export type {
  SliderLabelProps,
  SliderMarksProps,
  SliderProps,
  SliderValueProps,
};
