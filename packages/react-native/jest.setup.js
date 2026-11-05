import { Animated, Easing } from 'react-native';

// React Native loads Animated and Easing lazily, on first access. Load them
// once per test file here, so their one-time transform (slow on a cold CI
// cache) isn't charged to the timeout of whichever test first renders a
// spinner.
void Animated.Value;
void Animated.View;
void Easing.linear;

/* global jest */
// True Sheet presents a native sheet; its mock renders the sheet's children.
jest.mock('@lodev09/react-native-true-sheet', () =>
  jest.requireActual('@lodev09/react-native-true-sheet/mock'),
);
