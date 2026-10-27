import { Pressable, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

import { cn } from '../lib/cn';
import { Card } from './Card';
import { Text } from './Text';

const SCHEMES = ['light', 'dark', 'system'] as const;

// `null` keeps the values from global.css.
const BRANDS = [
  { dark: null, label: 'Pickle', light: null },
  { dark: '#60a5fa', label: 'Blue', light: '#2563eb' },
  { dark: '#f472b6', label: 'Pink', light: '#db2777' },
  { dark: '#fb923c', label: 'Orange', light: '#ea580c' },
] as const;

const DEFAULT_PRIMARY = {
  dark: 'oklch(0.78 0.17 135)',
  light: 'oklch(0.58 0.15 140)',
};

export function ThemeControls() {
  const { hasAdaptiveThemes, theme } = useUniwind();
  const scheme = hasAdaptiveThemes ? 'system' : theme;

  // Customization 1b: change tokens at runtime, per theme.
  const applyBrand = (brand: (typeof BRANDS)[number]) => {
    Uniwind.updateCSSVariables('light', {
      '--primary': brand.light ?? DEFAULT_PRIMARY.light,
      '--ring': brand.light ?? DEFAULT_PRIMARY.light,
    });
    Uniwind.updateCSSVariables('dark', {
      '--primary': brand.dark ?? DEFAULT_PRIMARY.dark,
      '--ring': brand.dark ?? DEFAULT_PRIMARY.dark,
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Appearance</Card.Title>
        <Card.Description>
          Uniwind themes: follow the system or force one.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <View className="bg-muted flex-row rounded-lg p-1">
          {SCHEMES.map((value) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: scheme === value }}
              className={cn(
                'h-8 flex-1 items-center justify-center rounded-md',
                scheme === value && 'bg-background',
              )}
              key={value}
              onPress={() => Uniwind.setTheme(value)}
            >
              <Text
                className="capitalize"
                tone={scheme === value ? undefined : 'muted'}
              >
                {value}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row gap-3">
          {BRANDS.map((brand) => (
            <Pressable
              accessibilityLabel={`${brand.label} brand color`}
              accessibilityRole="button"
              className="items-center gap-1"
              key={brand.label}
              onPress={() => applyBrand(brand)}
            >
              <View
                className={cn(
                  'border-border size-9 rounded-full border',
                  !brand.light && 'bg-primary',
                )}
                style={
                  brand.light
                    ? {
                        backgroundColor:
                          theme === 'dark' ? brand.dark : brand.light,
                      }
                    : undefined
                }
              />
              <Text tone="muted" variant="small">
                {brand.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}
