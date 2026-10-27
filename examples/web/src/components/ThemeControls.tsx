import { Button } from '@pickle-ui/react/button';
import { ColorPicker } from '@pickle-ui/react/color-picker';
import { createTheme, themeToCss } from '@pickle-ui/react/theme';
import { Tooltip } from '@pickle-ui/react/tooltip';
import { IconMoon, IconRefresh, IconSun } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';

export function ThemeControls() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const [brand, setBrand] = useState<null | string>(null);

  // Pickle's dark values apply below any element with the `dark` class.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Customization 1b: derive the brand tokens for both schemes from one color.
  // `themeToCss` writes `:root` and `.dark` rules, so portals (dialogs, toasts)
  // pick them up too. Until a color is picked, app.css's overrides apply.
  const css = useMemo(
    () => (brand ? themeToCss(createTheme({ primary: brand })) : null),
    [brand],
  );

  return (
    <div className="flex items-center gap-2">
      {css && <style>{css}</style>}

      <ColorPicker defaultValue="#4d9a3a" onValueChange={setBrand}>
        <ColorPicker.Trigger className="gap-2" variant="outline">
          <ColorPicker.Swatch className="size-4" />
          Brand
        </ColorPicker.Trigger>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <ColorPicker.HueSlider />
          <ColorPicker.Input />
        </ColorPicker.Content>
      </ColorPicker>

      {brand && (
        <Tooltip>
          <Tooltip.Trigger
            render={
              <Button
                aria-label="Reset brand color"
                onClick={() => setBrand(null)}
                size="icon"
                variant="ghost"
              />
            }
          >
            <IconRefresh />
          </Tooltip.Trigger>
          <Tooltip.Content>Back to the app.css tokens</Tooltip.Content>
        </Tooltip>
      )}

      <Button
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setDark((value) => !value)}
        size="icon"
        variant="outline"
      >
        {dark ? <IconSun /> : <IconMoon />}
      </Button>
    </div>
  );
}
