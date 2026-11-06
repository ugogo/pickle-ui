import { Animated, Easing } from 'react-native';

// React Native loads Animated and Easing lazily, on first access. Load them
// once per test file here, so their one-time transform (slow on a cold CI
// cache) isn't charged to the timeout of whichever test first renders a
// spinner.
void Animated.Value;
void Animated.View;
void Easing.linear;

// Expo UI's sheet is a native view. The mock shows its content while it's
// presented, and an accessibility escape stands in for a swipe down.
/* global jest */
jest.mock('@expo/ui', () => {
  const { createElement } = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');
  return {
    BottomSheet: jest.fn(({ children, isPresented, onDismiss }) =>
      isPresented
        ? createElement(
            View,
            { onAccessibilityEscape: onDismiss, testID: 'bottom-sheet' },
            children,
          )
        : null,
    ),
    Host: jest.fn(({ children }) => children),
    RNHostView: jest.fn(({ children }) => children),
  };
});
