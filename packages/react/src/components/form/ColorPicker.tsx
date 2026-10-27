import type { ComponentProps } from 'react';

import {
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  type ColorPickerProps,
  ColorPicker as ColorPickerRoot,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from './ColorPickerPrimitive';

type ColorPickerAlphaSliderProps = ComponentProps<
  typeof ColorPickerAlphaSlider
>;
type ColorPickerAreaProps = ComponentProps<typeof ColorPickerArea>;
type ColorPickerContentProps = ComponentProps<typeof ColorPickerContent>;
type ColorPickerEyeDropperProps = ComponentProps<typeof ColorPickerEyeDropper>;
type ColorPickerFormatSelectProps = ComponentProps<
  typeof ColorPickerFormatSelect
>;
type ColorPickerHueSliderProps = ComponentProps<typeof ColorPickerHueSlider>;
type ColorPickerInputProps = ComponentProps<typeof ColorPickerInput>;
type ColorPickerSwatchProps = ComponentProps<typeof ColorPickerSwatch>;
type ColorPickerTriggerProps = ComponentProps<typeof ColorPickerTrigger>;

const ColorPicker = Object.assign(ColorPickerRoot, {
  AlphaSlider: ColorPickerAlphaSlider,
  Area: ColorPickerArea,
  Content: ColorPickerContent,
  EyeDropper: ColorPickerEyeDropper,
  FormatSelect: ColorPickerFormatSelect,
  HueSlider: ColorPickerHueSlider,
  Input: ColorPickerInput,
  Swatch: ColorPickerSwatch,
  Trigger: ColorPickerTrigger,
});

export { ColorPicker };
export type {
  ColorPickerAlphaSliderProps,
  ColorPickerAreaProps,
  ColorPickerContentProps,
  ColorPickerEyeDropperProps,
  ColorPickerFormatSelectProps,
  ColorPickerHueSliderProps,
  ColorPickerInputProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
  ColorPickerTriggerProps,
};
