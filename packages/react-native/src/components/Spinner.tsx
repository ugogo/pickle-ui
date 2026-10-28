import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { cn } from '../lib/cn';

export type SpinnerProps = Omit<
  React.ComponentProps<typeof View>,
  'children'
> & {
  /** Hides the spinner from screen readers, when visible text already says what is loading. */
  'aria-hidden'?: boolean;
};

/**
 * The web `Spinner`'s look on native: a three-quarter ring turning once a
 * second, drawn inside a `size-6` box like the web icon. Size it with
 * `size-*` and color it with `text-*`, as on the web. Announced as "Loading"
 * by default; `accessibilityLabel` replaces the name and `aria-hidden` makes
 * it decorative.
 */
export function Spinner({
  accessibilityLabel = 'Loading',
  'aria-hidden': ariaHidden = false,
  className,
  style,
  ...props
}: SpinnerProps) {
  const [turn] = useState(() => new Animated.Value(0));
  const box = cn('text-foreground size-6', className);
  // React Native has no `currentColor`: the ring reads the `text-*` color, and
  // its stroke follows the box like the icon's (2px at 24px).
  const { color, width } = useResolveClassNames(box);
  const strokeWidth = typeof width === 'number' ? width / 12 : 2;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(turn, {
        duration: 1000,
        easing: Easing.linear,
        toValue: 1,
        // react-native-web has no native driver and warns when asked for it.
        useNativeDriver: Platform.OS !== 'web',
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [turn]);

  const rotate = turn.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      accessibilityLabel={ariaHidden ? undefined : accessibilityLabel}
      accessibilityRole={ariaHidden ? undefined : 'progressbar'}
      accessible={!ariaHidden}
      aria-hidden={ariaHidden}
      className={cn('items-center justify-center', box)}
      style={[style, { transform: [{ rotate }] }]}
      {...props}
    >
      <View
        className="size-3/4 rounded-full"
        style={{
          borderColor: typeof color === 'string' ? color : undefined,
          borderTopColor: 'transparent',
          borderWidth: strokeWidth,
        }}
      />
    </Animated.View>
  );
}
