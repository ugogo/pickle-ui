import { cva, type VariantProps } from 'class-variance-authority';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  type PanResponderCallbacks,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  type EdgeInsets,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

import { cn } from '../lib/cn';
import { useControllableState } from './_internal/useControllableState';
import { Button, type ButtonProps } from './Button';
import { Text, type TextProps } from './Text';

// The iOS sheet curve the web Drawer uses.
const EASING = Easing.bezier(0.32, 0.72, 0, 1);
const OPEN_DURATION = 450;
const CLOSE_DURATION = 300;
// Room left above the sheet at its tallest, below the status bar.
const TOP_GAP = 48;
// A release past this share of the sheet's height, or faster than this
// velocity (pt/ms), closes it, as on the web.
const DISMISS_RATIO = 0.5;
const DISMISS_VELOCITY = 0.5;
const NO_INSETS: EdgeInsets = { bottom: 0, left: 0, right: 0, top: 0 };
// The `inset` sheet's distance from the screen's sides and bottom.
const INSET = 8;

// Same variants as the web Drawer: `inset` floats, `attached` and `straight`
// sit on the bottom edge. The inset sheet clips the footer to its corners.
const sheetVariants = cva('border-border bg-popover', {
  defaultVariants: { variant: 'inset' },
  variants: {
    variant: {
      attached: 'rounded-t-2xl border-t',
      inset: 'overflow-hidden rounded-[32px] border',
      straight: 'border-t',
    },
  },
});

type DrawerVariant = NonNullable<VariantProps<typeof sheetVariants>['variant']>;
const USE_NATIVE_DRIVER = Platform.OS !== 'web';

type DrawerContentContextValue = {
  bottomInset: number;
  /** Counts a mounted `Drawer.Footer`, which pads itself past the home indicator. */
  registerFooter: () => () => void;
  /** The panel's vertical scroll offset; a drag only moves the sheet from the top. */
  scrollOffsetRef: React.RefObject<number>;
};

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);
const DrawerContentContext = createContext<DrawerContentContextValue>({
  bottomInset: 0,
  registerFooter: () => () => {},
  scrollOffsetRef: { current: 0 },
});

export type DrawerCloseProps = ButtonProps;

export type DrawerContentProps = React.ComponentProps<typeof View> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean;
  /**
   * `inset` floats the sheet away from the screen's sides and bottom,
   * `attached` docks it to the bottom edge with rounded top corners, and
   * `straight` docks it without rounding. Defaults to `inset`.
   */
  variant?: DrawerVariant;
};
export type DrawerDescriptionProps = Omit<TextProps, 'tone' | 'variant'>;
export type DrawerFooterProps = React.ComponentProps<typeof View>;
export type DrawerHeaderProps = React.ComponentProps<typeof View>;
export type DrawerPanelProps = React.ComponentProps<typeof ScrollView>;
export type DrawerProps = {
  children?: React.ReactNode;
  /** Whether the drawer is initially open. Defaults to `false`. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the drawer is open. Use with `onOpenChange` to control it. */
  open?: boolean;
};
export type DrawerTitleProps = Omit<TextProps, 'tone' | 'variant'>;
export type DrawerTriggerProps = ButtonProps;
/** The web's `IconX`, drawn with two bars: the package ships no icon set. */
function CloseIcon() {
  return (
    <View className="size-4 items-center justify-center opacity-80">
      <View className="bg-foreground absolute h-[1.5px] w-4 rotate-45 rounded-full" />
      <View className="bg-foreground absolute h-[1.5px] w-4 -rotate-45 rounded-full" />
    </View>
  );
}

function DrawerClose({ onPress, ...props }: DrawerCloseProps) {
  const { setOpen } = useDrawer();

  return (
    <Button
      onPress={(event) => {
        onPress?.(event);
        setOpen(false);
      }}
      {...props}
    />
  );
}

/**
 * The bottom sheet, in a modal over a dimmed backdrop. It slides up when the
 * drawer opens, follows the finger, and closes when dragged past half its
 * height or flung down. A drag inside `Drawer.Panel` scrolls it until it
 * reaches the top, then moves the sheet.
 */
function DrawerContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = true,
  style,
  variant = 'inset',
  ...props
}: DrawerContentProps) {
  const { open, setOpen } = useDrawer();
  const insets = use(SafeAreaInsetsContext) ?? NO_INSETS;
  const { height: windowHeight } = useWindowDimensions();
  const [height, setHeight] = useState(windowHeight);
  const [translateY] = useState(() => new Animated.Value(windowHeight));
  const scrollOffsetRef = useRef(0);
  const inset = variant === 'inset' ? INSET : 0;
  // How far the sheet travels to leave the screen.
  const offscreen = height + inset;
  // The inset sheet already clears part of the home indicator.
  const bottomInset = Math.max(insets.bottom - inset, 0);

  // Stays mounted while the closing animation runs. One state, so the open
  // change and the mount land in the same update.
  const [presence, setPresence] = useState({ mounted: open, open });
  if (presence.open !== open) {
    setPresence({ mounted: open || presence.mounted, open });
  }

  useEffect(() => {
    if (open) {
      Animated.timing(translateY, {
        duration: OPEN_DURATION,
        easing: EASING,
        toValue: 0,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
      return;
    }
    Animated.timing(translateY, {
      duration: CLOSE_DURATION,
      easing: EASING,
      toValue: offscreen,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start(({ finished }) => {
      if (finished) {
        setPresence((current) =>
          current.open ? current : { ...current, mounted: false },
        );
      }
    });
  }, [offscreen, open, translateY]);

  const [sheetResponder, handleResponder] = useMemo(() => {
    const settle = (velocity = 0) =>
      Animated.spring(translateY, {
        bounciness: 0,
        toValue: 0,
        useNativeDriver: USE_NATIVE_DRIVER,
        velocity,
      }).start();
    const isVertical = (dx: number, dy: number) =>
      Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx);
    const drag: PanResponderCallbacks = {
      onPanResponderMove: (_, { dy }) => {
        // Past the top, the sheet resists like a rubber band.
        translateY.setValue(dy >= 0 ? dy : -Math.sqrt(-dy));
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > height * DISMISS_RATIO || vy > DISMISS_VELOCITY) {
          setOpen(false);
        } else {
          settle(vy);
        }
      },
      onPanResponderTerminate: () => settle(),
      onPanResponderTerminationRequest: () => false,
    };

    return [
      PanResponder.create({
        ...drag,
        onMoveShouldSetPanResponder: (_, { dx, dy }) => isVertical(dx, dy),
        // Takes a downward drag from the panel once it is scrolled to the top.
        onMoveShouldSetPanResponderCapture: (_, { dx, dy }) =>
          dy > 0 && isVertical(dx, dy) && scrollOffsetRef.current <= 0,
      }),
      // The handle takes the touch as it starts, so a drag from it never
      // depends on the move negotiation above.
      PanResponder.create({
        ...drag,
        onStartShouldSetPanResponder: () => true,
      }),
    ];
  }, [height, setOpen, translateY]);

  const [footerCount, setFooterCount] = useState(0);
  const registerFooter = useCallback(() => {
    setFooterCount((count) => count + 1);
    return () => setFooterCount((count) => count - 1);
  }, []);
  const contentContext = useMemo(
    () => ({ bottomInset, registerFooter, scrollOffsetRef }),
    [bottomInset, registerFooter],
  );
  const close = () => setOpen(false);

  return (
    <Modal
      animationType="none"
      navigationBarTranslucent
      onRequestClose={close}
      statusBarTranslucent
      transparent
      visible={presence.mounted}
    >
      <View className="flex-1 justify-end">
        <Animated.View
          style={{
            bottom: 0,
            left: 0,
            opacity: translateY.interpolate({
              extrapolate: 'clamp',
              inputRange: [0, Math.max(offscreen, 1)],
              outputRange: [1, 0],
            }),
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <Pressable
            accessible={false}
            className="flex-1 bg-black/32"
            importantForAccessibility="no"
            onPress={close}
          />
        </Animated.View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Animated.View
            {...sheetResponder.panHandlers}
            style={{
              marginBottom: inset,
              marginHorizontal: inset,
              transform: [{ translateY }],
            }}
          >
            <View
              aria-modal
              className={cn(sheetVariants({ variant }), className)}
              onAccessibilityEscape={close}
              onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
              role="dialog"
              style={[
                { maxHeight: windowHeight - insets.top - TOP_GAP - inset },
                style,
              ]}
              {...props}
            >
              <View
                className="items-center py-3"
                {...handleResponder.panHandlers}
              >
                <View className="bg-input h-1 w-12 rounded-full" />
              </View>
              <DrawerContentContext value={contentContext}>
                {children}
              </DrawerContentContext>
              {footerCount > 0 ? null : (
                <View style={{ height: bottomInset }} />
              )}
              {showCloseButton ? (
                <Button
                  accessibilityLabel={closeLabel}
                  className="absolute end-3 top-3"
                  onPress={close}
                  size="icon-sm"
                  variant="ghost"
                >
                  <CloseIcon />
                </Button>
              ) : null}
              {/* Fills the gap below a docked sheet when a drag pulls it up. */}
              {variant === 'inset' ? null : (
                <View className="bg-popover absolute inset-x-0 top-full h-12" />
              )}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return <Text className={className} tone="muted" variant="body" {...props} />;
}

/** Pads itself past the home indicator, also when nested in a `Form`. */
function DrawerFooter({ className, style, ...props }: DrawerFooterProps) {
  const { bottomInset, registerFooter } = use(DrawerContentContext);
  useLayoutEffect(registerFooter, [registerFooter]);

  return (
    <View
      className={cn(
        'border-border bg-muted/72 flex-col-reverse gap-2 border-t px-6 pt-4',
        className,
      )}
      style={[{ paddingBottom: 16 + bottomInset }, style]}
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <View
      className={cn('gap-1.5 px-6 pe-12 pt-1 pb-4', className)}
      {...props}
    />
  );
}

/** The scrolling body between the header and the footer. */
function DrawerPanel({
  className,
  contentContainerClassName,
  onScroll,
  ...props
}: DrawerPanelProps) {
  const { scrollOffsetRef } = use(DrawerContentContext);
  // A reopened drawer mounts a new panel at the top.
  useEffect(() => {
    scrollOffsetRef.current = 0;
  }, [scrollOffsetRef]);

  return (
    <ScrollView
      // Pulled 4pt into the header's padding and padded back, so a field's 3pt
      // focus ring at the top isn't clipped by the scroll view.
      className={cn('-mt-1 shrink grow-0', className)}
      contentContainerClassName={cn(
        'px-6 pt-1 pb-6',
        contentContainerClassName,
      )}
      keyboardShouldPersistTaps="handled"
      onScroll={(event) => {
        scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
        onScroll?.(event);
      }}
      scrollEventThrottle={16}
      {...props}
    />
  );
}

function DrawerRoot({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
}: DrawerProps) {
  const [open, setOpen] = useControllableState(
    openProp,
    defaultOpen,
    onOpenChange,
  );
  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return <DrawerContext value={value}>{children}</DrawerContext>;
}

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <Text
      className={cn('font-heading leading-snug font-semibold', className)}
      variant="h4"
      {...props}
    />
  );
}

function DrawerTrigger({ onPress, ...props }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();

  return (
    <Button
      onPress={(event) => {
        onPress?.(event);
        setOpen(true);
      }}
      {...props}
    />
  );
}

function useDrawer() {
  const context = use(DrawerContext);
  if (!context) throw new Error('Drawer parts must be rendered in a <Drawer>.');
  return context;
}

const Drawer = Object.assign(DrawerRoot, {
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Panel: DrawerPanel,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
});

export { Drawer };
