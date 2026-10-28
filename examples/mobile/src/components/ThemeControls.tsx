import { Card, cn, Text } from '@pickle-ui/react-native';
import { Pressable, View } from 'react-native';
import { ScopedVariables, Uniwind, useUniwind } from 'uniwind';

import { type Brand, BRANDS } from '../brands';

const SCHEMES = ['light', 'dark', 'system'] as const;

type SwatchProps = {
  label: string;
  onPress: () => void;
  selected: boolean;
};

type ThemeControlsProps = {
  brand: Brand | null;
  onBrandChange: (brand: Brand | null) => void;
};

export function ThemeControls({ brand, onBrandChange }: ThemeControlsProps) {
  const { hasAdaptiveThemes, theme } = useUniwind();
  const scheme = hasAdaptiveThemes ? 'system' : theme;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Appearance</Card.Title>
        <Card.Description>
          Follow the system color scheme or force one, and pick a brand.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <View
          accessibilityLabel="Color scheme"
          accessibilityRole="radiogroup"
          className="bg-muted flex-row rounded-lg p-1"
        >
          {SCHEMES.map((value) => (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: scheme === value }}
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
          {/* This card sits outside the brand scope, so `bg-primary` is global.css's green. */}
          <Swatch
            label="Pickle"
            onPress={() => onBrandChange(null)}
            selected={brand === null}
          />
          {/* Each swatch reads `bg-primary` through its brand's tokens:
              `createTheme` writes oklch(), which Uniwind resolves but a raw
              `style` color doesn't. */}
          {BRANDS.map((item) => (
            <ScopedVariables key={item.label} variables={item.theme[theme]}>
              <Swatch
                label={item.label}
                onPress={() => onBrandChange(item)}
                selected={brand === item}
              />
            </ScopedVariables>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

function Swatch({ label, onPress, selected }: SwatchProps) {
  return (
    <Pressable
      accessibilityLabel={`${label} brand color`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="items-center gap-1"
      onPress={onPress}
    >
      <View
        className={cn(
          'bg-primary size-9 rounded-full border-2',
          selected ? 'border-foreground' : 'border-transparent',
        )}
      />
      <Text tone={selected ? undefined : 'muted'} variant="small">
        {label}
      </Text>
    </Pressable>
  );
}
