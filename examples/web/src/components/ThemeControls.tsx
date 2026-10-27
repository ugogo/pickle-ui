import { Button } from '@pickle-ui/react/button';
import { ColorPicker } from '@pickle-ui/react/color-picker';
import { Menu } from '@pickle-ui/react/menu';
import { createTheme, themeToCss } from '@pickle-ui/react/theme';
import { Tooltip } from '@pickle-ui/react/tooltip';
import {
  IconDeviceDesktop,
  IconMoon,
  IconRefresh,
  IconSun,
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';

type Scheme = 'dark' | 'light' | 'system';

// Also read by the inline script in index.html.
const STORAGE_KEY = 'pickle-example-scheme';

const SCHEME_ICONS = {
  dark: IconMoon,
  light: IconSun,
  system: IconDeviceDesktop,
};

export function ThemeControls() {
  const [scheme, setScheme] = useState<Scheme>(readScheme);
  const [brand, setBrand] = useState<null | string>(null);
  const [pickerValue, setPickerValue] = useState(readPrimary);

  // Pickle's dark values apply below any element with the `dark` class. In
  // `system` mode, mirror the media query and follow its changes.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () =>
      document.documentElement.classList.toggle(
        'dark',
        scheme === 'dark' || (scheme === 'system' && media.matches),
      );
    sync();
    if (scheme !== 'system') return;
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [scheme]);

  // Customization 1b: derive the brand tokens for both schemes from one color.
  // `themeToCss` writes `:root` and `.dark` rules, so portals (dialogs, toasts)
  // pick them up too. Until a color is picked, app.css's overrides apply.
  const css = useMemo(
    () => (brand ? themeToCss(createTheme({ primary: brand })) : null),
    [brand],
  );

  const SchemeIcon = SCHEME_ICONS[scheme];

  return (
    <div className="flex items-center gap-2">
      {css && <style>{css}</style>}

      <ColorPicker
        onOpenChange={(open) => {
          // Without a picked brand, start from the color on screen (app.css).
          if (open && !brand) setPickerValue(readPrimary());
        }}
        onValueChange={(value) => {
          setPickerValue(value);
          setBrand(value);
        }}
        value={pickerValue}
      >
        <ColorPicker.Trigger className="gap-2" variant="outline">
          <span className="bg-primary size-4 rounded-full" />
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

      <Menu>
        <Menu.Trigger
          render={
            <Button aria-label="Color scheme" size="icon" variant="outline" />
          }
        >
          <SchemeIcon />
        </Menu.Trigger>
        <Menu.Content align="end">
          <Menu.RadioGroup
            onValueChange={(value) => {
              setScheme(value as Scheme);
              saveScheme(value as Scheme);
            }}
            value={scheme}
          >
            <Menu.RadioItem value="light">Light</Menu.RadioItem>
            <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
            <Menu.RadioItem value="system">System</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu>
    </div>
  );
}

/** The `--primary` currently applied to the page, as any CSS color string. */
function readPrimary() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim();
}

function readScheme(): Scheme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'dark' || value === 'light') return value;
  } catch {
    // Storage can be blocked (private mode); fall back to the system.
  }
  return 'system';
}

function saveScheme(scheme: Scheme) {
  try {
    if (scheme === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    // Not persisted; the choice still applies until reload.
  }
}
