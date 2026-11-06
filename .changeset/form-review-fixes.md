---
'@pickle-ui/react': patch
---

Fix form controls: ColorPicker submits its initial value, its hex field can be typed in, HSB edits keep hue and saturation, `readOnly` and part-level `disabled` take effect, and the root gets `data-slot="color-picker"`. Form bindings report blur to React Hook Form, `Form.Select` and `Form.RadioGroup` clear on reset, and inputs in `Form.InputGroup` get `aria-invalid`. `Slider.Marks` rounds fractional ticks.
