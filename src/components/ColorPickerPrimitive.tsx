'use client';

import { useDirection } from '@base-ui/react/direction-provider';
import { IconColorPicker } from '@tabler/icons-react';
import * as React from 'react';

import { Button } from '@/components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/form/Select';
import { Input } from '@/components/Input';
import { InputGroup } from '@/components/InputGroup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Slider } from '@/components/Slider';
import { useAsRef } from '@/hooks/use-as-ref';
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect';
import { useLazyRef } from '@/hooks/use-lazy-ref';
import {
  type ColorFormat,
  colorFormats,
  colorToString,
  type ColorValue,
  hexToRgb,
  hslToRgb,
  type HSVColorValue,
  hsvToRgb,
  isColorEqual,
  isHsvEqual,
  parseColorString,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/color';
import { useComposedRefs } from '@/lib/compose-refs';
import { cn } from '@/lib/utils';

import { VisuallyHiddenInput } from './_internal/VisuallyHiddenInput';

const ROOT_NAME = 'ColorPicker';
const ROOT_IMPL_NAME = 'ColorPickerImpl';
const TRIGGER_NAME = 'ColorPickerTrigger';
const CONTENT_NAME = 'ColorPickerContent';
const AREA_NAME = 'ColorPickerArea';
const HUE_SLIDER_NAME = 'ColorPickerHueSlider';
const ALPHA_SLIDER_NAME = 'ColorPickerAlphaSlider';
const SWATCH_NAME = 'ColorPickerSwatch';
const EYE_DROPPER_NAME = 'ColorPickerEyeDropper';
const FORMAT_SELECT_NAME = 'ColorPickerFormatSelect';
const INPUT_NAME = 'ColorPickerInput';

type AreaElement = React.ComponentRef<typeof ColorPickerArea>;

interface DivProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

/**
 * @see https://gist.github.com/bkrmendy/f4582173f50fab209ddfef1377ab31e3
 */
interface EyeDropper {
  open: (options?: { signal?: AbortSignal }) => Promise<{ sRGBHex: string }>;
}

type InputElement = React.ComponentRef<typeof ColorPickerInput>;
type RootElement = React.ComponentRef<typeof ColorPicker>;
type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
};

function getSliderValue(value: number | readonly number[]) {
  return Array.isArray(value) ? (value[0] ?? 0) : value;
}

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

declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropper;
    };
  }
}

type Direction = 'ltr' | 'rtl';

interface Store {
  getState: () => StoreState;
  notify: () => void;
  setFormat: (value: ColorFormat) => void;
  setOpen: (value: boolean) => void;
  setValue: (
    color: ColorValue,
    hsv: HSVColorValue,
    options?: { emit?: boolean },
  ) => void;
  subscribe: (cb: () => void) => () => void;
}

interface StoreState {
  color: ColorValue;
  format: ColorFormat;
  hsv: HSVColorValue;
  open: boolean;
}

const StoreContext = React.createContext<null | Store>(null);

interface ColorPickerContextValue {
  dir: Direction;
  disabled?: boolean;
  inline?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

function useStore<U>(selector: (state: StoreState) => U): U {
  const store = useStoreContext('useStore');

  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector],
  );

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

function useStoreContext(consumerName: string) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(
  null,
);

type ColorPickerContentProps = Omit<
  React.ComponentProps<typeof PopoverContent>,
  'className' | 'style'
> & {
  className?: string;
  style?: React.CSSProperties;
};

interface ColorPickerFormatSelectProps
  extends
    Omit<React.ComponentProps<typeof Select>, 'onValueChange' | 'value'>,
    Pick<React.ComponentProps<typeof SelectTrigger>, 'className' | 'size'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- a named props interface that is intentionally an alias of the Omit below, kept as an interface for naming and future extension
interface ColorPickerImplProps extends Omit<
  ColorPickerProps,
  | 'defaultFormat'
  | 'defaultValue'
  | 'format'
  | 'onFormatChange'
  | 'onOpenChange'
  | 'onValueChange'
> {}

interface ColorPickerInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  'color' | 'onChange' | 'value'
> {
  withoutAlpha?: boolean;
}

interface ColorPickerProps
  extends
    Omit<DivProps, 'onValueChange'>,
    Pick<
      React.ComponentProps<typeof Popover>,
      'defaultOpen' | 'modal' | 'open'
    > {
  asChild?: boolean;
  defaultFormat?: ColorFormat;
  defaultValue?: string;
  dir?: Direction;
  disabled?: boolean;
  format?: ColorFormat;
  inline?: boolean;
  name?: string;
  onFormatChange?: (format: ColorFormat) => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
}

type ColorPickerTriggerProps = React.ComponentProps<typeof Button> & {
  asChild?: boolean;
};

interface FormatInputProps extends ColorPickerInputProps {
  color: ColorValue;
  context: ColorPickerContextValue;
  onColorChange: (color: ColorValue) => void;
}

interface HsbInputProps extends Omit<FormatInputProps, 'color'> {
  hsv: HSVColorValue;
}

function ColorPicker(props: ColorPickerProps) {
  const {
    defaultFormat = 'hex',
    defaultOpen,
    defaultValue = '#000000',
    disabled,
    format: formatProp,
    inline,
    name,
    onFormatChange,
    onOpenChange,
    onValueChange,
    open: openProp,
    readOnly,
    required,
    value: valueProp,
    ...rootProps
  } = props;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => {
    const colorString = valueProp ?? defaultValue;
    const color = parseColorString(colorString) ?? hexToRgb(colorString);

    return {
      color,
      format: formatProp ?? defaultFormat,
      hsv: rgbToHsv(color),
      open: openProp ?? defaultOpen ?? false,
    };
  });

  const propsRef = useAsRef({
    onFormatChange,
    onOpenChange,
    onValueChange,
  });

  const store = React.useMemo<Store>(() => {
    return {
      getState: () => stateRef.current,
      notify: () => {
        for (const cb of listenersRef.current) {
          cb();
        }
      },
      setFormat: (value: ColorFormat) => {
        if (Object.is(stateRef.current.format, value)) return;

        stateRef.current.format = value;

        if (propsRef.current.onFormatChange) {
          propsRef.current.onFormatChange(value);
        }

        store.notify();
      },
      setOpen: (value: boolean) => {
        if (Object.is(stateRef.current.open, value)) return;

        stateRef.current.open = value;

        if (propsRef.current.onOpenChange) {
          propsRef.current.onOpenChange(value);
        }

        store.notify();
      },
      setValue: (color: ColorValue, hsv: HSVColorValue, options) => {
        const prevState = { ...stateRef.current };
        const colorChanged = !isColorEqual(prevState.color, color);
        const hsvChanged = !isHsvEqual(prevState.hsv, hsv);

        if (!colorChanged && !hsvChanged) return;

        stateRef.current.color = color;
        stateRef.current.hsv = hsv;

        if (
          options?.emit !== false &&
          colorChanged &&
          propsRef.current.onValueChange
        ) {
          const colorString = colorToString(color, prevState.format);
          propsRef.current.onValueChange(colorString);
        }

        store.notify();
      },
      subscribe: (cb) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
      },
    };
  }, [listenersRef, stateRef, propsRef]);

  return (
    <StoreContext.Provider value={store}>
      <ColorPickerImpl
        {...rootProps}
        defaultOpen={defaultOpen}
        disabled={disabled}
        inline={inline}
        name={name}
        open={openProp}
        readOnly={readOnly}
        required={required}
        value={valueProp}
      />
    </StoreContext.Provider>
  );
}

function ColorPickerAlphaSlider(props: React.ComponentProps<typeof Slider>) {
  const { className, ...sliderProps } = props;

  const context = useColorPickerContext(ALPHA_SLIDER_NAME);
  const store = useStoreContext(ALPHA_SLIDER_NAME);

  const color = useStore((state) => state.color);
  const hsv = useStore((state) => state.hsv);

  const onValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      const alpha = getSliderValue(value) / 100;
      const newColor = { ...color, a: alpha };
      const newHsv = { ...hsv, a: alpha };
      store.setValue(newColor, newHsv);
    },
    [color, hsv, store],
  );

  const gradientColor = `rgb(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0})`;

  return (
    <Slider
      data-slot="color-picker-alpha-slider"
      {...sliderProps}
      className={className}
      disabled={context.disabled}
      indicator={false}
      max={100}
      onValueChange={onValueChange}
      step={1}
      trackStyle={{
        backgroundImage: `linear-gradient(to right, transparent, ${gradientColor}), linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
        backgroundPosition: '0 0, 0 0, 0 4px, 4px -4px, -4px 0px',
        backgroundSize: 'auto, 8px 8px, 8px 8px, 8px 8px, 8px 8px',
      }}
      value={[Math.round((color?.a ?? 1) * 100)]}
    />
  );
}

function ColorPickerArea(props: DivProps) {
  const {
    asChild,
    className,
    onPointerDown: onPointerDownProp,
    onPointerMove: onPointerMoveProp,
    onPointerUp: onPointerUpProp,
    ref,
    ...areaProps
  } = props;

  const propsRef = useAsRef({
    onPointerDown: onPointerDownProp,
    onPointerMove: onPointerMoveProp,
    onPointerUp: onPointerUpProp,
  });

  const context = useColorPickerContext(AREA_NAME);
  const store = useStoreContext(AREA_NAME);

  const hsv = useStore((state) => state.hsv);

  const isDraggingRef = React.useRef(false);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(ref, areaRef);

  const updateColorFromPosition = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!areaRef.current) return;

      const rect = areaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(
        0,
        Math.min(1, 1 - (clientY - rect.top) / rect.height),
      );

      const newHsv: HSVColorValue = {
        a: hsv?.a ?? 1,
        h: hsv?.h ?? 0,
        s: Math.round(x * 100),
        v: Math.round(y * 100),
      };

      store.setValue(hsvToRgb(newHsv), newHsv);
    },
    [hsv, store],
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      if (context.disabled) return;
      propsRef.current.onPointerDown?.(event);
      if (event.defaultPrevented) return;

      isDraggingRef.current = true;
      areaRef.current?.setPointerCapture(event.pointerId);
      updateColorFromPosition(event.clientX, event.clientY);
    },
    [context.disabled, updateColorFromPosition, propsRef],
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      propsRef.current.onPointerMove?.(event);
      if (event.defaultPrevented) return;

      if (isDraggingRef.current) {
        updateColorFromPosition(event.clientX, event.clientY);
      }
    },
    [updateColorFromPosition, propsRef],
  );

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent<AreaElement>) => {
      propsRef.current.onPointerUp?.(event);
      if (event.defaultPrevented) return;

      isDraggingRef.current = false;
      areaRef.current?.releasePointerCapture(event.pointerId);
    },
    [propsRef],
  );

  const hue = hsv?.h ?? 0;
  const backgroundHue = hsvToRgb({ a: 1, h: hue, s: 100, v: 100 });

  const AreaPrimitive = asChild ? Slot : 'div';

  return (
    <AreaPrimitive
      data-slot="color-picker-area"
      {...areaProps}
      className={cn(
        'relative h-40 w-full cursor-crosshair touch-none rounded-sm border',
        context.disabled && 'pointer-events-none opacity-50',
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={composedRef}
    >
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #fff, transparent)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, #000)',
          }}
        />
      </div>
      <div
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{
          left: `${hsv?.s ?? 0}%`,
          top: `${100 - (hsv?.v ?? 0)}%`,
        }}
      />
    </AreaPrimitive>
  );
}

function ColorPickerContent(props: ColorPickerContentProps) {
  const {
    align,
    asChild,
    children,
    className,
    side,
    sideOffset,
    ...popoverContentProps
  } = props;

  const context = useColorPickerContext(CONTENT_NAME);

  if (context.inline) {
    const ContentPrimitive = asChild ? Slot : 'div';

    return (
      <ContentPrimitive
        data-slot="color-picker-content"
        {...popoverContentProps}
        className={cn('flex w-[340px] flex-col gap-4 p-4', className)}
      >
        {children}
      </ContentPrimitive>
    );
  }

  return (
    <PopoverContent
      align={align}
      asChild={asChild}
      data-slot="color-picker-content"
      side={side}
      sideOffset={sideOffset}
      {...popoverContentProps}
      className={cn('flex w-[340px] flex-col gap-4 p-4', className)}
    >
      {children}
    </PopoverContent>
  );
}

function ColorPickerEyeDropper(props: React.ComponentProps<typeof Button>) {
  const { children, disabled, size: sizeProp, ...buttonProps } = props;

  const context = useColorPickerContext(EYE_DROPPER_NAME);
  const store = useStoreContext(EYE_DROPPER_NAME);

  const color = useStore((state) => state.color);
  const hsv = useStore((state) => state.hsv);

  const isDisabled = disabled || context.disabled;

  const onEyeDropper = React.useCallback(async () => {
    if (!window.EyeDropper) return;

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      if (result.sRGBHex) {
        const currentAlpha = color?.a ?? 1;
        const newColor = hexToRgb(result.sRGBHex, currentAlpha);
        const newHsv = rgbToHsv(newColor, hsv?.h ?? 0);
        store.setValue(newColor, newHsv);
      }
    } catch (error) {
      console.warn('EyeDropper error:', error);
    }
  }, [color, hsv, store]);

  const hasEyeDropper = typeof window !== 'undefined' && !!window.EyeDropper;

  if (!hasEyeDropper) return null;

  return (
    <Button
      data-slot="color-picker-eye-dropper"
      {...buttonProps}
      disabled={isDisabled}
      onClick={onEyeDropper}
      size={sizeProp}
      variant="outline"
    >
      {children ?? <IconColorPicker />}
    </Button>
  );
}

function ColorPickerFormatSelect(props: ColorPickerFormatSelectProps) {
  const { className, disabled, size, ...selectProps } = props;

  const context = useColorPickerContext(FORMAT_SELECT_NAME);
  const store = useStoreContext(FORMAT_SELECT_NAME);
  const isDisabled = disabled || context.disabled;

  const format = useStore((state) => state.format);

  const onFormatChange = React.useCallback(
    (value: ColorFormat) => {
      store.setFormat(value);
    },
    [store],
  );

  return (
    <Select
      data-slot="color-picker-format-select"
      {...selectProps}
      disabled={isDisabled}
      onValueChange={(value) => onFormatChange(value as ColorFormat)}
      value={format}
    >
      <SelectTrigger
        className={cn(className)}
        data-slot="color-picker-format-select-trigger"
        size={size ?? 'sm'}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {colorFormats.map((format) => (
          <SelectItem
            key={format}
            label={format.toUpperCase()}
            value={format}
          />
        ))}
      </SelectContent>
    </Select>
  );
}

function ColorPickerHueSlider(props: React.ComponentProps<typeof Slider>) {
  const { className, ...sliderProps } = props;

  const context = useColorPickerContext(HUE_SLIDER_NAME);
  const store = useStoreContext(HUE_SLIDER_NAME);

  const hsv = useStore((state) => state.hsv);

  const onValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      const newHsv: HSVColorValue = {
        a: hsv?.a ?? 1,
        h: getSliderValue(value),
        s: hsv?.s ?? 0,
        v: hsv?.v ?? 0,
      };
      store.setValue(hsvToRgb(newHsv), newHsv);
    },
    [hsv, store],
  );

  return (
    <Slider
      data-slot="color-picker-hue-slider"
      {...sliderProps}
      className={className}
      disabled={context.disabled}
      indicator={false}
      max={360}
      onValueChange={onValueChange}
      step={1}
      trackStyle={{
        background:
          'linear-gradient(to right,#ff0000 0%,#ffff00 16.66%,#00ff00 33.33%,#00ffff 50%,#0000ff 66.66%,#ff00ff 83.33%,#ff0000 100%)',
      }}
      value={[hsv?.h ?? 0]}
    />
  );
}

function ColorPickerImpl(props: ColorPickerImplProps) {
  const {
    asChild,
    defaultOpen,
    dir: dirProp,
    disabled,
    inline,
    modal,
    name,
    open: openProp,
    readOnly,
    ref,
    required,
    value: valueProp,
    ...rootProps
  } = props;

  const store = useStoreContext(ROOT_IMPL_NAME);

  const contextDir = useDirection();
  const dir = dirProp ?? contextDir;

  const [formTrigger, setFormTrigger] = React.useState<null | RootElement>(
    null,
  );
  const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));
  const isFormControl = formTrigger ? !!formTrigger.closest('form') : true;

  useIsomorphicLayoutEffect(() => {
    if (valueProp !== undefined) {
      const currentState = store.getState();
      const color =
        parseColorString(valueProp) ??
        hexToRgb(valueProp, currentState.color.a);
      const hsv = rgbToHsv(color, currentState.hsv.h);
      store.setValue(color, hsv, { emit: false });
    }
  }, [valueProp]);

  useIsomorphicLayoutEffect(() => {
    if (openProp !== undefined) {
      store.setOpen(openProp);
    }
  }, [openProp]);

  const contextValue = React.useMemo<ColorPickerContextValue>(
    () => ({
      dir,
      disabled,
      inline,
      readOnly,
      required,
    }),
    [dir, disabled, inline, readOnly, required],
  );

  const value = useStore((state) => rgbToHex(state.color));
  const open = useStore((state) => state.open);

  const RootPrimitive = asChild ? Slot : 'div';

  if (inline) {
    return (
      <ColorPickerContext.Provider value={contextValue}>
        <RootPrimitive {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            control={formTrigger}
            disabled={disabled}
            name={name}
            readOnly={readOnly}
            required={required}
            type="hidden"
            value={value}
          />
        )}
      </ColorPickerContext.Provider>
    );
  }

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <Popover
        defaultOpen={defaultOpen}
        modal={modal}
        onOpenChange={store.setOpen}
        open={open}
      >
        <RootPrimitive {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            control={formTrigger}
            disabled={disabled}
            name={name}
            readOnly={readOnly}
            required={required}
            type="hidden"
            value={value}
          />
        )}
      </Popover>
    </ColorPickerContext.Provider>
  );
}

function ColorPickerInput(props: ColorPickerInputProps) {
  const store = useStoreContext(INPUT_NAME);
  const context = useColorPickerContext(INPUT_NAME);

  const color = useStore((state) => state.color);
  const format = useStore((state) => state.format);
  const hsv = useStore((state) => state.hsv);

  const onColorChange = React.useCallback(
    (newColor: ColorValue) => {
      const newHsv = rgbToHsv(newColor, hsv?.h ?? 0);
      store.setValue(newColor, newHsv);
    },
    [hsv, store],
  );

  if (format === 'hex') {
    return (
      <HexInput
        color={color}
        context={context}
        onColorChange={onColorChange}
        {...props}
      />
    );
  }

  if (format === 'rgb') {
    return (
      <RgbInput
        color={color}
        context={context}
        onColorChange={onColorChange}
        {...props}
      />
    );
  }

  if (format === 'hsl') {
    return (
      <HslInput
        color={color}
        context={context}
        onColorChange={onColorChange}
        {...props}
      />
    );
  }

  if (format === 'hsb') {
    return (
      <HsbInput
        context={context}
        hsv={hsv}
        onColorChange={onColorChange}
        {...props}
      />
    );
  }
}

function ColorPickerSwatch(props: DivProps) {
  const { asChild, className, ...swatchProps } = props;

  const context = useColorPickerContext(SWATCH_NAME);

  const color = useStore((state) => state.color);
  const format = useStore((state) => state.format);

  const backgroundStyle = React.useMemo(() => {
    if (!color) {
      return {
        background:
          'linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat',
      };
    }

    const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

    if (color.a < 1) {
      return {
        background: `linear-gradient(${colorString}, ${colorString}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 8px 8px`,
      };
    }

    return {
      backgroundColor: colorString,
    };
  }, [color]);

  const ariaLabel = !color
    ? 'No color selected'
    : `Current color: ${colorToString(color, format)}`;

  const SwatchPrimitive = asChild ? Slot : 'div';

  return (
    <SwatchPrimitive
      aria-label={ariaLabel}
      data-slot="color-picker-swatch"
      role="img"
      {...swatchProps}
      className={cn(
        'box-border size-8 shrink-0 rounded-sm border shadow-sm',
        context.disabled && 'opacity-50',
        className,
      )}
      style={{
        ...backgroundStyle,
        forcedColorAdjust: 'none',
      }}
    />
  );
}

function ColorPickerTrigger(props: ColorPickerTriggerProps) {
  const { asChild, disabled, ...triggerProps } = props;

  const context = useColorPickerContext(TRIGGER_NAME);

  const isDisabled = disabled || context.disabled;

  const TriggerPrimitive = asChild ? Slot : Button;

  return (
    <PopoverTrigger asChild disabled={isDisabled}>
      <TriggerPrimitive
        data-slot="color-picker-trigger"
        {...(triggerProps as React.ComponentProps<typeof Button>)}
      />
    </PopoverTrigger>
  );
}

function HexInput(props: FormatInputProps) {
  const {
    className,
    color,
    context,
    onColorChange,
    withoutAlpha,
    ...inputProps
  } = props;

  const hexValue = rgbToHex(color);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onHexChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = event.target.value;
      const parsedColor = parseColorString(value);
      if (parsedColor) {
        onColorChange({ ...parsedColor, a: color?.a ?? 1 });
      }
    },
    [color, onColorChange],
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        onColorChange({ ...color, a: value / 100 });
      }
    },
    [color, onColorChange],
  );

  if (withoutAlpha) {
    return (
      <Input
        aria-label="Hex color value"
        {...inputProps}
        className={cn('font-mono', className)}
        disabled={context.disabled}
        onChange={onHexChange}
        placeholder="#000000"
        value={hexValue}
      />
    );
  }

  return (
    <InputGroup className={className}>
      <Input
        aria-label="Hex color value"
        {...inputProps}
        className="flex-1 font-mono"
        disabled={context.disabled}
        onChange={onHexChange}
        placeholder="#000000"
        value={hexValue}
      />
      <Input
        aria-label="Alpha transparency percentage"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onAlphaChange}
        pattern="[0-9]*"
        placeholder="100"
        value={alphaValue}
      />
    </InputGroup>
  );
}

function HsbInput(props: HsbInputProps) {
  const {
    className,
    context,
    hsv,
    onColorChange,
    withoutAlpha,
    ...inputProps
  } = props;

  const alphaValue = Math.round((hsv?.a ?? 1) * 100);

  const onHsvChannelChange = React.useCallback(
    (channel: 'h' | 's' | 'v', max: number) =>
      (event: React.ChangeEvent<InputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= max) {
          const newHsv = { ...hsv, [channel]: value };
          const newColor = hsvToRgb(newHsv);
          onColorChange(newColor);
        }
      },
    [hsv, onColorChange],
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        const currentColor = hsvToRgb(hsv);
        onColorChange({ ...currentColor, a: value / 100 });
      }
    },
    [hsv, onColorChange],
  );

  return (
    <InputGroup className={className}>
      <Input
        aria-label="Hue degree (0-360)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="360"
        min="0"
        onChange={onHsvChannelChange('h', 360)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.h ?? 0}
      />
      <Input
        aria-label="Saturation percentage (0-100)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHsvChannelChange('s', 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.s ?? 0}
      />
      <Input
        aria-label="Brightness percentage (0-100)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHsvChannelChange('v', 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.v ?? 0}
      />
      {!withoutAlpha && (
        <Input
          aria-label="Alpha transparency percentage"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onAlphaChange}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </InputGroup>
  );
}

function HslInput(props: FormatInputProps) {
  const {
    className,
    color,
    context,
    onColorChange,
    withoutAlpha,
    ...inputProps
  } = props;

  const hsl = React.useMemo(() => rgbToHsl(color), [color]);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onHslChannelChange = React.useCallback(
    (channel: 'h' | 'l' | 's', max: number) =>
      (event: React.ChangeEvent<InputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= max) {
          const newHsl = { ...hsl, [channel]: value };
          const newColor = hslToRgb(newHsl, color?.a ?? 1);
          onColorChange(newColor);
        }
      },
    [hsl, color, onColorChange],
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        onColorChange({ ...color, a: value / 100 });
      }
    },
    [color, onColorChange],
  );

  return (
    <InputGroup className={className}>
      <Input
        aria-label="Hue degree (0-360)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="360"
        min="0"
        onChange={onHslChannelChange('h', 360)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.h}
      />
      <Input
        aria-label="Saturation percentage (0-100)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHslChannelChange('s', 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.s}
      />
      <Input
        aria-label="Lightness percentage (0-100)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHslChannelChange('l', 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.l}
      />
      {!withoutAlpha && (
        <Input
          aria-label="Alpha transparency percentage"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onAlphaChange}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </InputGroup>
  );
}

function RgbInput(props: FormatInputProps) {
  const {
    className,
    color,
    context,
    onColorChange,
    withoutAlpha,
    ...inputProps
  } = props;

  const rValue = Math.round(color?.r ?? 0);
  const gValue = Math.round(color?.g ?? 0);
  const bValue = Math.round(color?.b ?? 0);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onChannelChange = React.useCallback(
    (channel: 'a' | 'b' | 'g' | 'r', max: number, isAlpha = false) =>
      (event: React.ChangeEvent<InputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= max) {
          const newValue = isAlpha ? value / 100 : value;
          onColorChange({ ...color, [channel]: newValue });
        }
      },
    [color, onColorChange],
  );

  return (
    <InputGroup className={className}>
      <Input
        aria-label="Red color component (0-255)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange('r', 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={rValue}
      />
      <Input
        aria-label="Green color component (0-255)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange('g', 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={gValue}
      />
      <Input
        aria-label="Blue color component (0-255)"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange('b', 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={bValue}
      />
      {!withoutAlpha && (
        <Input
          aria-label="Alpha transparency percentage"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onChannelChange('a', 100, true)}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </InputGroup>
  );
}

function useColorPickerContext(consumerName: string) {
  const context = React.useContext(ColorPickerContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

export {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  type ColorPickerProps,
  ColorPickerSwatch,
  ColorPickerTrigger,
};
