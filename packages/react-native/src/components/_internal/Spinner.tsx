import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';

import { cn } from '../../lib/cn';

/**
 * The web `Spinner`'s look on native: a three-quarter ring turning once a
 * second. Color it with a `border-*` class. Decorative: the control showing
 * it reports the busy state.
 */
export function Spinner({ className }: { className?: string }) {
  const [turn] = useState(() => new Animated.Value(0));

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
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ transform: [{ rotate }] }}
    >
      <View
        className={cn(
          'border-foreground size-3 rounded-full border-[1.5px] opacity-80',
          className,
          // After the color, which would otherwise override the open side.
          'border-t-transparent',
        )}
      />
    </Animated.View>
  );
}
